import { type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'

export const useGameplay = (popits: PopitProps[]) => {
  const {
    useTimer,
    rand,
    addEventClick,
    addEventResize,
    intersect,
    playAudio
  } = useWebcore()

  // let rounds = 0

  let activePpts: PopitProps[] = []

  const onRound = () => {
    activePpts = []
    const size = popits.length
    let count = rand(
      Math.round(size * 0.3),
      Math.round(size * 0.6)
    )

    const pptsBox = [...popits]
    while (count > 0 && !!pptsBox.length) {
      const i = rand(pptsBox.length - 1)
      const popit = pptsBox[i]
      popit.p = false
      activePpts.push(popit)

      pptsBox.splice(i, 1)

      count--
    }
  }

  const onPop = (popit: PopitProps) => {
    playAudio('tap')
    window?.navigator?.vibrate?.(70)

    popit.p = true
    const i = activePpts.indexOf(popit)
    activePpts.splice(i, 1)
    if (activePpts.length <= 0) {
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
