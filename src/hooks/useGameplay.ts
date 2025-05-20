import { type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Timer } from '@/webcore/types'
import { useGradient } from './useGradient'

const TOMATE_COLOR = '#ff6347'

type GamePlayState = 'gameover' | 'game' | 'results'

type GamePlay = {
  state: GamePlayState
  score: number
}

export const useGameplay = (popits: PopitProps[], pausePopit: PopitProps, palette: string[]): GamePlay => {
  const {
    useTimer,
    rand,
    addEventClick,
    intersect,
    playAudio,
    setBackground
  } = useWebcore()

  const instance: GamePlay = { state: 'game', score: 0 }

  let rounds = 0
  let activePpts: PopitProps[] = []
  let repeatPpt: PopitProps = { x: 0, y: 0, r: 0 }
  let origPptCols: (string | undefined)[] = []
  let origPausePptCol: string | undefined

  let goTimer: Timer
  let fillTimer: Timer

  const ticFillTimer = () => {
    fillTimer = useTimer(() => {
      if (popits.length === activePpts.length) {
        fillTimer.stop()
        origPptCols = popits.map(p => p.c)
        origPausePptCol = pausePopit.c
        popits.forEach(p => {
          p.c = TOMATE_COLOR
        })
        pausePopit.c = TOMATE_COLOR
        setBackground(TOMATE_COLOR)
        const index = rand(popits.length - 1)
        repeatPpt = popits[index]
        repeatPpt.p = false
        instance.state = 'gameover'
        useTimer(() => {
          popits.forEach(p => {
            p.p = true
          })
          const index = rand(popits.length - 1)
          repeatPpt = popits[index]
          repeatPpt.p = false
        })
        return
      }

      const unactivePpts = popits.filter(p => activePpts.indexOf(p) === -1)
      const index = rand(unactivePpts.length - 1)
      const popit = unactivePpts[index]
      if (popit) {
        popit.p = false
        activePpts.push(unactivePpts[index])
      }

      ticFillTimer()
    })
  }

  const onRound = (lastPopit?: PopitProps) => {
    activePpts = []
    const size = popits.length
    let count = rand(
      Math.round(size * 0.3),
      Math.round(size * 0.6)
    )

    const pptsBox = [...popits]
    if (lastPopit) {
      const lastPptInd = pptsBox.indexOf(lastPopit)
      pptsBox.splice(lastPptInd, 1)
    }

    for (let i = count; i > 0; i--) {
      const index = rand(pptsBox.length - 1)
      const popit = pptsBox[index]
      popit.p = false
      activePpts.push(popit)

      pptsBox.splice(index, 1)
    }

    goTimer?.stop()
    fillTimer?.stop()
    if (rounds <= 0) {
      goTimer = useTimer(ticFillTimer, 3000)
    }

    rounds = rounds > 0 ? rounds : rand(3, 5)
  }

  const onPopClick = (popit: PopitProps) => {
    playAudio('tap')
    window?.navigator?.vibrate?.(50)

    instance.score++

    popit.p = true
    const i = activePpts.indexOf(popit)
    activePpts.splice(i, 1)
    if (activePpts.length <= 0) {
      rounds--
      if (rounds > 0) {
        onRound(popit)
      } else {
        instance.state = 'results'
      }
    }
  }

  const onGameClick = (x: number, y: number) => {
    for (const popit of activePpts) {
      if (intersect({ x, y }, popit)) {
        onPopClick(popit)
      }
    }
  }

  const onGameOverClick = (x: number, y: number) => {
    if (intersect({ x, y }, repeatPpt)) {
      instance.state = 'game'
      rounds = 0
      instance.score = 0
      repeatPpt.p = true
      useTimer(() => {
        useGradient(palette)
        pausePopit.c = origPausePptCol
        popits.forEach((p, i) => {
          p.c = origPptCols[i]
        })
        useTimer(() => {
          onRound(repeatPpt)
        }, 1000)
      })
    }
  }

  const onResiltsClick = () => {
    instance.state = 'game'
    instance.score = 0
    rounds = 0
    useTimer(() => {
      onRound()
    })
  }

  addEventClick((x, y) => {
    switch(instance.state) {
      case 'game':
        onGameClick(x, y)
        break
      case 'gameover':
        onGameOverClick(x, y)
        break
      default:
        onResiltsClick()
    }
  })
  
  useTimer(() => {
    onRound()
  })

  return instance
}
