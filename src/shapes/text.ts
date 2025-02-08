import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export type Props = {
  text: string
  x: number
  y: number
  r: number
  fs?: number
  c: string
  a?: CanvasTextAlign
}

export const TextCircle = (props: Props): Render => {
  const { font, ctx: mainCtx } = useWebcore()

  return (ctx = mainCtx) => {
    const {
      text,
      x,
      c,
      y,
      fs,
      a = 'center',
    } = props


    ctx.textAlign = a
    ctx.fillStyle = c
    ctx.font = `${fs}px ${font}`
    ctx.fillText(text, x, y)
  }
}
