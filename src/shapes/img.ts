import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

const IMAGES: Record<string, HTMLImageElement> = {}

export type Props = {
  x?: number
  y?: number
  w: number
  h?: number
  src: string
}

export const Img = (props: Props): Render => {
  const { ctx: mainCtx } = useWebcore()

  let img: HTMLImageElement
  if (IMAGES[props.src]) {
    img = IMAGES[props.src]
  } else {
    img = new Image
    img.src = props.src
    img.onload = () => {
      IMAGES[props.src] = img
    }
  }

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
