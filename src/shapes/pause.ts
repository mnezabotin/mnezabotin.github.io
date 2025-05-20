import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export type Props = {
  x?: number,
  y?: number,
  r: number
  c?: string
}

export const Pause = (props: Props): Render => {
  const { ctx: mainCtx, shade } = useWebcore()

  const lw = Math.round(props.r / 4)
  const line = Math.round(0.12 * props.r)

  return (ctx = mainCtx) => {
    const {
      r,
      x = r,
      y = r,
    } = props

    const color = shade(props.c || 'blue', -3)

    ctx.lineCap = 'round'
    ctx.strokeStyle = color
    ctx.lineWidth = lw

    ctx.beginPath()
    ctx.moveTo(x - 1.5 * line, y - 2 * line)
    ctx.lineTo(x - 1.5 * line, y + 2 * line)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + 1.5 * line, y - 2 * line)
    ctx.lineTo(x + 1.5 * line, y + 2 * line)
    ctx.stroke()
  }
}
