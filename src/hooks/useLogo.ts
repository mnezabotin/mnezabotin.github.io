import { Popit, type Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export const useLogo = (): Render => {
  const { addEventResize, useMeasure, useTimer } = useWebcore()

  let pptProps: PopitProps = { c: '#f86a9a', p: true }
  let logo: Render

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    pptProps = {
      ...pptProps,
      x: cx,
      y: cy,
      r: Math.round(s * 0.2),
    }
    logo = Popit(pptProps)
  })

  useTimer(() => pptProps.p = false, 400)

  return () => {
    logo()
  }
}
