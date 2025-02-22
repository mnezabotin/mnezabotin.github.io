import { Popit, type Props as PopitProps } from '@/shapes/popit'
import { Text } from '@/shapes/text'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type Logo = {
  render: Render
  point: () => Point
}

export const useLogo = (): Logo => {
  const { addEventResize, useMeasure, useTimer } = useWebcore()

  let pptProps: PopitProps = { x: 0, y: 0, r: 0, c: '#f86a9a', p: true } //ba68c8
  let logo: Render
  let yola: Render
  let popit: Render

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    const r = Math.round(s * 0.2)

    pptProps = {
      ...pptProps,
      x: cx,
      y: cy,
      r,
    }
    logo = Popit(pptProps)

    yola = Text({
      text: 'Yola',
      c: '#f1f1f1',
      x: cx,
      y: cy - r + Math.round(r * 0.9),
      fs: Math.round(r / 2.6),
      mw: r * 2,
    })

    popit = Text({
      text: 'PopiT',
      c: '#ffeb3b',
      x: cx,
      y: cy - r + Math.round(r * 1.3),
      fs: Math.round(r / 2.3),
      mw: r * 2,
    })
  })

  useTimer(() => pptProps.p = false)

  const point = () => ({
    x: pptProps.x,
    y: pptProps.y,
    r: pptProps.r
  })

  const render = () => {
    logo()
    if (!pptProps.p) {
      yola()
      popit()
    }
  }

  return {
    render,
    point
  }
}
