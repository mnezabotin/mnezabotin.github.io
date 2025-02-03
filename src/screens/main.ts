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
  } = useWebcore()

  let pptMainProps: PopitProps = { c: '#f86a9a', p: true }

  let popitMain: Render
  let popitPlay: Render

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

    popitPlay = Popit({
      c: '#bef181',
      x: cx + r + m,
      y: cy + r + m,
      r: Math.round(r * 0.4),
    })
  })

  useTimer(() => pptMainProps.p = false, 400)

  return () => {
    popitMain()
    popitPlay()
  }
}
