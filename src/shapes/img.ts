import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export type Props = {
  x?: number
  y?: number
  w: number
  h?: number
  src: string
}

export const Img = (props: Props): Render => {
  const { ctx: mainCtx } = useWebcore()
  const img = new Image
  img.src = props.src

  return (ctx = mainCtx) => {
    const {
      w,
      h = w,
      x = 0,
      y = 0,
    } = props

    if (img.complete) {
      ctx.drawImage(img, x, y, w, h)
    }
  }
}
