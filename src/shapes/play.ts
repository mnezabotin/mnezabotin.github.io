import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export type Props = {
  x?: number,
  y?: number,
  r: number
  c?: string
}

export const Play = (props: Props): Render => {
  const { ctx: mainCtx, shade } = useWebcore()

  const lw = Math.round(props.r / 2.2)
  const line = Math.round(0.15 * props.r)

  const gradient = shade(props.c || 'blue', -3)

  return (ctx = mainCtx) => {
    const {
      r,
      x = r,
      y = r,
    } = props

    ctx.lineCap = 'round'
    ctx.fillStyle = gradient
    ctx.strokeStyle = gradient
    ctx.lineWidth = lw

    ctx.beginPath()
    ctx.moveTo(x + line, y)
    ctx.lineTo(x - line / 2, y - line)
    ctx.lineTo(x - line / 2, y + line)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x + line, y)
    ctx.lineTo(x - line / 2, y - line)
    ctx.moveTo(x - line / 2, y - line)
    ctx.lineTo(x - line / 2, y + line)
    ctx.moveTo(x - line / 2, y + line)
    ctx.lineTo(x + line, y)
    ctx.stroke()
  }
}
