import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export type Props = {
  text: string
  x: number
  y: number
  r: number
  s?: number
  fs?: number
  f?: string
  c?: string
  l?: number
}

export const TextCircle = (props: Props): Render => {
  const { font, ctx: mainCtx } = useWebcore()

  const text = props.text
  const textLen = props.text.length
  const l = props.l || 1
  const numRadsPerLetter = l * Math.PI / textLen / 2

  return (ctx = mainCtx) => {
    const {
      x,
      y,
      r,
      s = 0,
      fs,
      f,
    } = props

    
    const fontSize = fs || Math.round(r / 7);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f9f9f9';
    ctx.font = `${fontSize}px ${f || font}`;

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
