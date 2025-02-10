import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export type Props = {
  text: string
  c: string
  x: number
  y: number
  a?: CanvasTextAlign
  fs: number
  mw?: number
}

export const Text = (props: Props): Render => {
  const { font, ctx: mainCtx } = useWebcore()

  return (ctx = mainCtx) => {
    const {
      text,
      x,
      c,
      y,
      fs,
      a = 'center',
      mw,
    } = props


    ctx.textAlign = a
    ctx.fillStyle = c
    ctx.font = `${fs}px ${font}`
    ctx.fillText(text, x, y, mw)
  }
}
