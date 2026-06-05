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

/*export const TextCircle = (props: Props): Render => {
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
}*/


/*
const container = new PIXI.Container();
app.stage.addChild(container);

const textStyle = new PIXI.TextStyle({
    fontSize: 24,
    fill: 0xFFFFFF,
});

const characterSpacing = 10; // Adjust for spacing between characters
let currentAngle = 0;

for (let i = 0; i < textString.length; i++) {
    const char = textString[i];
    const charText = new PIXI.Text(char, textStyle);
    charText.anchor.set(0.5); // Center the anchor for rotation

    // Calculate position on the circle
    const x = circleX + circleRadius * Math.cos(currentAngle);
    const y = circleY + circleRadius * Math.sin(currentAngle);

    charText.x = x;
    charText.y = y;

    // Calculate rotation to align with the tangent
    charText.rotation = currentAngle + Math.PI / 2; // Add PI/2 to point "outwards"

    container.addChild(charText);

    // Increment angle based on character width and desired spacing
    currentAngle += (charText.width + characterSpacing) / circleRadius;
}
*/