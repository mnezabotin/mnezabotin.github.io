import { Popit, type Props as PopitProps } from '@/shapes/popit'
import { Img } from '@/shapes/img'
import { TextCircle } from '@/shapes/textCircle'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Opening = (): Render => {
  const {
    loop,
    rotate,
    navigate,
    useMeasure,
    addEventClick,
    addEventResize,
  } = useWebcore()

  let pptProps: PopitProps

  let popit: Render
  let sloth: Render
  let nezabotin: Render
  let production: Render

  let tic = -0.2
  let rAnglText = 0

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    const r = Math.round(s * 0.2)

    pptProps = {
      c: '#ff5722',
      x: cx,
      y: cy,
      r,
      p: false
    }
    popit = Popit(pptProps)

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
    tic += 0.01
    rAnglText = tic >= 1 ? 1 : tic
    if (tic >= 1.8) {
      pptProps.p = true
    }
    if (tic >= 2.2) {
      pptProps.c = '#f86a9a'
    }

    if (tic >= 2.6) {
      navigate('opening')
    }
  })

  addEventClick(() => {
    [1, 1.4, 1.8, 2.2, 2.6].some((num) => {
      if (tic < num) {
        tic = num
        return true
      }
    })
  })

  return () => {
    const { cx, cy } = useMeasure()

    popit()
    
    if (tic < 1.8) {
      sloth()
    }

    if (tic < 1.4) {
      rotate(() => {
        nezabotin()
        production()
      }, cx, cy, rAnglText)
    }
  }
}
