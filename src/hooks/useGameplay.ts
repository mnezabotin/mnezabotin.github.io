import { type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Timer } from '@/webcore/types'
import { useStorage } from './useStorage'

export const useGameplay = (popits: PopitProps[]) => {
  const {
    useTimer,
    rand,
    addEventClick,
    addEventMove,
    intersect,
    navigate
  } = useWebcore()

  const {
    addScore,
    getDifficultyTic,
  } = useStorage()

  let activePpts: PopitProps[] = []

  let goTimer: Timer
  let fillTimer: Timer

  let stop = false

  let rounds = 0
  let score = 0
  let addTic = 0

  const tickDelay = getDifficultyTic()

  const addActivePopit = () => {
    const unactivePpts = popits.filter(p => activePpts.indexOf(p) === -1)
    const index = rand(unactivePpts.length - 1)
    const popit = unactivePpts[index]
    if (popit) {
      popit.p = false
      activePpts.push(unactivePpts[index])
    }
  }

  const ticFillTimer = () => {
    addTic -= 20
    fillTimer = useTimer(() => {
      if (popits.length === activePpts.length) {
        stop = true
        fillTimer.stop()
        useTimer(() => {
          navigate('gameover')
        })
        return
      }

      addActivePopit()

      ticFillTimer()
    }, Math.max(addTic, 100))
  }

  const onRound = (lastPopit?: PopitProps) => {
    addTic = tickDelay
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
    goTimer = useTimer(ticFillTimer, activePpts.length * Math.min(tickDelay, 500))

    rounds = rounds > 0 ? rounds : rand(3, 5)
  }

  const onPopClick = (popit: PopitProps) => {
    score++

    popit.p = true
    const i = activePpts.indexOf(popit)
    activePpts.splice(i, 1)
    if (activePpts.length <= 0) {
      rounds--
      if (rounds > 0) {
        onRound(popit)
      } else {
        addScore(score)
        navigate('gamescore')
      }
    }
  }

  const onClickEvent = (x: number, y: number, isMove = false) => {
    if (stop) {
      return
    }

    for (const popit of activePpts) {
      if (intersect({ x, y }, popit)) {
        onPopClick(popit)
        return
      }
    }

    if (!isMove) {
      addActivePopit()
    }
  }

  addEventClick(onClickEvent)
  addEventMove((x, y) => onClickEvent(x, y, true))
  
  useTimer(() => {
    onRound()
  })
}
