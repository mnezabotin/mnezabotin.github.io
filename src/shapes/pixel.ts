import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export type Props = {
  x?: number
  y?: number
  w: number
  c?: string
}

export const Pixel = (props: Props): Render => {
  const { ctx: mainCtx } = useWebcore()

  return (ctx = mainCtx) => {
    const {
      w = 0,
      c = '#ffffff',
      x = 0,
      y = 0,
    } = props

    ctx.fillStyle = c
    ctx.beginPath()
    ctx.rect(
      x,
      y,
      w,
      w,
    );
    ctx.fill()
  }
}
