import { type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'

export const useGameplay = (popits: PopitProps[]) => {
  const {
    useTimer,
    rand,
    addEventClick,
    addEventResize,
    intersect
  } = useWebcore()

  // let rounds = 0

  const activePpts: PopitProps[] = []

  const onRound = () => {
    activePpts.splice(0)
    const pptsLen = popits.length
    const count = rand(
      Math.round(pptsLen * 0.5),
      Math.round(pptsLen * 0.8)
    )

    const pptsBox = [...popits]
    while (count > 0 && !!pptsBox.length) {
      const i = rand(pptsBox.length - 1)
      const popit = pptsBox[i]
      popit.p = false
      activePpts.push(popit)

      pptsBox.splice(i, 1)
    }
  }

  const onPop = (popit: PopitProps) => {
    navigator.vibrate(70)
    popit.p = true
    const i = activePpts.indexOf(popit)
    activePpts.splice(i, 1)
    if (!activePpts.length) {
      // rounds--
      // if (rounds > 0) {
        onRound()
      // } else {

      // }
    }
  }

  addEventClick((x, y) => {
    for (const popit of activePpts) {
      if (intersect({ x, y }, popit)) {
        onPop(popit)
      }
    }
  })
  
  addEventResize(() => {
    useTimer(() => {
      onRound()
    })
  })
}
