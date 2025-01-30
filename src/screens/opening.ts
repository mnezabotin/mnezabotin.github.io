import { Popit } from '@/shapes/popit'
import { Img } from '@/shapes/img'
import { TextCircle } from '@/shapes/textCircle'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Opening = (): Render => {
  const {
    ctx,
    loop,
    addEventResize,
    useMeasure,
  } = useWebcore()

  let popit: Render
  let sloth: Render
  let nezabotin: Render
  let production: Render

  let rotate = 0

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    const r = Math.round(s * 0.20)

    popit = Popit({
      c: '#ff5722',
      x: cx,
      y: cy,
      r,
    })

    sloth = Img({
      x: cx - r + Math.round(r * 0.35),
      y: cy - r + Math.round(r * 0.35),
      w: r * 2 - Math.round(r * 0.7),
      src: '/sloth.svg'
    })

    nezabotin = TextCircle({
      text: 'nezabotin',
      x: cx,
      y: cy,
      r: Math.round(r * 1.1),
      s: Math.PI * 1.6,
    })

    production = TextCircle({
      text: 'production',
      x: cx,
      y: cy,
      r: Math.round(r * 1.1),
      s: Math.PI * 2.6,
    })
  })

  loop(() => {
    rotate += 0.01 
  })

  return () => {
    const { cx, cy } = useMeasure()

    popit()
    sloth()
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI * rotate);
    ctx.translate(-cx, -cy)
    nezabotin()
    production()
    ctx.restore()
  }
}
