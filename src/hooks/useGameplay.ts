import { type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'

type GamePlayState = 'gameover' | 'game' | 'results'

type GamePlay = {
  state: GamePlayState
  score: number
}

export const useGameplay = (popits: PopitProps[]): GamePlay => {
  const {
    useTimer,
    rand,
    addEventClick,
    addEventResize,
    intersect,
    playAudio
  } = useWebcore()

  const instance: GamePlay = { state: 'game', score: 0 }
  let rounds = 0

  let activePpts: PopitProps[] = []
  let repeatPpt: PopitProps = { x: 0, y: 0, r: 0 }

  const onRound = (lastPopit?: PopitProps) => {
    rounds = rounds > 0 ? rounds : rand(1, 1)
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
  }

  const onPopClick = (popit: PopitProps) => {
    playAudio('tap')
    window?.navigator?.vibrate?.(50)

    instance.score++
    rounds--

    popit.p = true
    const i = activePpts.indexOf(popit)
    activePpts.splice(i, 1)
    if (activePpts.length <= 0) {
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
      rounds = 0
      onRound(repeatPpt)
    }
  }

  const onResiltsClick = () => {
    instance.state = 'game'
    instance.score = 0
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
  
  addEventResize(() => {
    useTimer(() => {
      onRound()
    })
  })

  return instance
}
