import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export type Props = {
  x?: number,
  y?: number,
  r: number
  c?: string
  on?: boolean
}

export const Sound = (props: Props): Render => {
  const { ctx: mainCtx, shade } = useWebcore()

  const lw = Math.round(props.r / 4)
  const line = Math.round(0.2 * props.r)

  const gradient = shade(props.c || 'blue', -5)

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
    ctx.ellipse(
      x - line,
      y + line,
      lw,
      line,
      10 * Math.PI / 180,
      0,
      2 * Math.PI
    )
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x - line / 2, y + line)
    ctx.lineTo(x, y - line)
    ctx.lineTo(x + line, y - line)
    ctx.stroke()

    if (!props.on) {
      ctx.lineWidth = Math.round(lw / 3)
      ctx.beginPath()
      ctx.moveTo(x - r / 4, y - r / 4)
      ctx.lineTo(x + r / 4, y + r / 4)
      ctx.stroke()

    }
  }
}
