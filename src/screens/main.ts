import { Play } from '@/shapes/play'
import { Popit, type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const {
    // loop,
    // rotate,
    // navigate,
    useMeasure,
    useTimer,
    // addEventClick,
    addEventResize,
    setBackground,
  } = useWebcore()

  setBackground('#00dcfe')

  let pptMainProps: PopitProps = { c: '#f86a9a', p: true }

  let popitMain: Render
  let popitPlay: Render
  let play: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    const r = Math.round(s * 0.2)

    pptMainProps = {
      ...pptMainProps,
      x: cx,
      y: cy,
      r,
    }
    popitMain = Popit(pptMainProps)

    const playX = cx + r + m
    const playY = cy + r + m
    const playR = Math.round(r * 0.4)
    const playC = '#bef181'

    popitPlay = Popit({
      c: playC,
      x: playX,
      y: playY,
      r: playR,
    })

    play = Play({
      x: playX,
      y: playY,
      r: playR,
      c: playC,
    })
  })

  useTimer(() => pptMainProps.p = false, 400)

  return () => {
    popitMain()
    popitPlay()
    play()
  }
}
