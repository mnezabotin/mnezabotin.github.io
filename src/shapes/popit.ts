import { Container, Graphics, FillGradient } from 'pixi.js'

import { useWebcore } from '@/webcore'

export type Props = {
  x: number
  y: number
  r: number
  c?: string
  p?: boolean
}

export const Popit = (props: Props): Container => {
  const { core, shade } = useWebcore()
  const { x, y, r, c = '#ffffff', p } = props

  const outerColorStop = [
    { offset: 1, color: shade(c, 0) },
    { offset: 0.99, color: shade(c, 0) },
    { offset: 0.925, color: shade(c, 9) },
    { offset: 0.85, color: shade(c, 0) },
    { offset: 0.85, color: shade(c, -15) },
    { offset: 0.82, color: shade(c, -5) },
    { offset: 0.78, color: shade(c, -15) },
  ]

  const innerColorStopPop = [
    { offset: 0.76, color: shade(c, -10) },
    { offset: 0.7, color: shade(c, -8) },
    { offset: 0.66, color: shade(c, -12) },
    { offset: 0.4, color: shade(c, -8) },
    { offset: 0, color: shade(c, -6) },
  ]

  const innerColorStopPush = [
    { offset: 0.76, color: shade(c, -12) },
    { offset: 0.74, color: shade(c, -8) },
    { offset: 0.7, color: shade(c, -2) },
    { offset: 0.66, color: shade(c, 0) },
    { offset: 0.5, color: shade(c, 5) },
    { offset: 0, color: shade(c, 18) },
  ]

  const container = new Container()
  container.x = x - r
  container.y = y - r
  const gradient = new FillGradient({
    type: 'radial',
    center: { x: 0.5, y: 0.5 },
    innerRadius: 0.1,
    outerCenter: { x: 0.5, y: 0.5 },
    outerRadius: 0.5,
    colorStops: [
      ...(p ? innerColorStopPop : innerColorStopPush),
      ...outerColorStop,
    ],
  })
  const graphics = new Graphics()
    .circle(r, r, r)
    .fill(gradient)

  container.addChild(graphics)
  core.stage.addChild(container)

  return container
}
