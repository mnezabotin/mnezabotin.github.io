import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export type Props = {
  x?: number
  y?: number
  r: number
  c?: string
  p?: boolean
}

export const Pixel = (props: Props): Render => {
  const { ctx: mainCtx, shade } = useWebcore()

  return (ctx = mainCtx) => {
    const {
      r = 0,
      c = '#ffffff',
      x = 0,
      y = 0,
      p,
    } = props

    if (p) {
      ctx.fillStyle = shade(c, 5)
      ctx.beginPath()
      ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    } else {
      ctx.fillStyle = c
      ctx.beginPath()
      ctx.arc(x + r, y + r, r + 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

  }
}
