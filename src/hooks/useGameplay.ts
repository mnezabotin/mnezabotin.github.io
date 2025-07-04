import { type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Timer } from '@/webcore/types'
import { useStorage } from './useStorage'

type Props = {
  popits: PopitProps[]
  pausePpt: PopitProps
  popEffect?: (p: PopitProps, withoutRad?: boolean, shake?: boolean) => void
  splashEffect?: (text: string) => void
}

export const useGameplay = ({
  popits,
  pausePpt,
  popEffect = () => {},
  splashEffect = () => {}
}: Props) => {
  const {
    useTimer,
    rand,
    addEventClick,
    addEventMove,
    intersect,
    navigate,
    addEventResize,
  } = useWebcore()

  const {
    getScore,
    addScore,
    getDifficultyTic,
  } = useStorage()

  let activePpts: PopitProps[] = []

  let goTimer: Timer
  let fillTimer: Timer | null

  let stop = false

  let rounds = 0
  let score = 0
  let addTic = 0

  let startRound: Date
  let roundPopits: number
  let missClick = false

  const scoreNow = getScore()

  const tickDelay = getDifficultyTic()

  const comboScore = () => {
    if (startRound && roundPopits && score && !missClick) {
      const now = new Date()
      const diff = now.getTime() - startRound.getTime()
      if (diff <= roundPopits * 350) {
        score = score * 2
      }
    }

    startRound = new Date()
    roundPopits = activePpts.length
    missClick = false
  }

  const addActivePopit = (ppt?: PopitProps) => {
    const unactivePpts = popits.filter(p => activePpts.indexOf(p) === -1 && p !== ppt)
    const index = rand(unactivePpts.length - 1)
    const popit = unactivePpts[index]
    if (popit) {
      popEffect(popit, false, true)
      popit.p = false
      activePpts.push(unactivePpts[index])
    }
  }

  const ticFillTimer = () => {
    fillTimer = useTimer(() => {
      addTic = Math.max(addTic - 10, 50)
      if (popits.length === activePpts.length) {
        stop = true
        fillTimer?.stop()
        useTimer(() => {
          navigate('gameover')
        })
        return
      }

      addActivePopit()

      ticFillTimer()
    }, addTic)
  }

  const onRound = (lastPopit?: PopitProps) => {
    activePpts = []
    const size = popits.length
    let count = rand(
      Math.round(size * 0.3),
      Math.round(size * 0.6)
    )

    for (const p of popits) {
      p.p = true
    }

    const pptsBox = [...popits]
    if (lastPopit) {
      const lastPptInd = pptsBox.indexOf(lastPopit)
      pptsBox.splice(lastPptInd, 1)
    }

    for (let i = count; i > 0; i--) {
      const index = rand(pptsBox.length - 1)
      const popit = pptsBox[index]
      popit.p = false
      popEffect(popit, false, true)
      activePpts.push(popit)

      pptsBox.splice(index, 1)
    }

    addTic = tickDelay
    goTimer?.stop()
    fillTimer?.stop()
    fillTimer = null
    if (!!scoreNow) {
      goTimer = useTimer(() => {
        splashEffect('SLOWLY')
        ticFillTimer()
      }, activePpts.length * tickDelay)
    }

    rounds = rounds > 0 ? rounds : rand(3, 5)
    comboScore()
  }

  const onPopClick = (popit: PopitProps) => {
    popEffect(popit)
    addTic = Math.min(addTic + 5, tickDelay)
    score++

    popit.p = true
    const i = activePpts.indexOf(popit)
    activePpts.splice(i, 1)
    if (activePpts.length <= 0) {
      rounds--
      if (rounds > 0) {
        useTimer(() => {
          splashEffect(rounds > 1 ? 'Round' : 'Last')
          onRound(popit)
        }, 100)
      } else {
        comboScore()
        goTimer?.stop()
        fillTimer?.stop()
        addScore(score)
        useTimer(() => {
          navigate('gamescore', {
            winScore: score
          })
        }, 100)
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

    if (intersect({ x, y }, pausePpt)) {
      return
    }

    if (!isMove) {
      for (const popit of popits) {
        if (intersect({ x, y }, popit)) {
          popEffect(popit, true)
          splashEffect('Popenalty')    
          missClick = true
          addActivePopit(popit)
          if (fillTimer === null) {
            goTimer?.stop()
            ticFillTimer()
          }
          return
        }
      }

      splashEffect('Popenalty')
      missClick = true
      addActivePopit()
    }
  }

  addEventClick(onClickEvent)
  addEventMove((x, y) => onClickEvent(x, y, true))

  addEventResize(() => {
    useTimer(() => {
      rounds = 0
      score = 0

      splashEffect('Pop it')
      onRound()
    })
  })
}
