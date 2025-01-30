import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export type Props = {
  text: string
  x: number
  y: number
  r: number
  s?: number
  fs?: number
  c?: string
}

export const TextCircle = (props: Props): Render => {
  const { font, ctx: mainCtx } = useWebcore()

  const text = props.text
  const textLen = props.text.length
  const numRadsPerLetter = 2 * Math.PI / textLen / 4

  return (ctx = mainCtx) => {
    const {
      x,
      y,
      r,
      s = 0,
      fs,
    } = props

    
    const fontSize = fs || Math.round(r / 4);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f9f9f9';
    ctx.font = `${fontSize}px ${font}`;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(s);
    for (let i = 0; i < textLen; i++) {
      ctx.save();
      ctx.rotate(i * numRadsPerLetter);

      ctx.fillText(text[i], 0, -r);
      ctx.restore();
    }
    ctx.restore();
  }
}
