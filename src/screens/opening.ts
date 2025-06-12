import { Popit, type Props as PopitProps } from '@/shapes/popit'
import { Img } from '@/shapes/img'
import { TextCircle } from '@/shapes/textCircle'
import { Text } from '@/shapes/text'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Opening = (): Render => {
  const {
    ctx,
    loop,
    rotate,
    navigate,
    useMeasure,
    addEventClick,
    addEventResize,
    setBackground,
    useTimer,
  } = useWebcore()

  setBackground('#040404')

  let isFontLoaded = false

  let pptProps: PopitProps

  let popit: Render
  let sloth: Render
  let nezabotin: Render
  let production: Render
  let tapcontinue: Render

  let tic = -0.2
  let rAnglText = 0

  let showTapContinue = false

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    const r = Math.round(s * 0.25)

    pptProps = {
      c: '#ff6347',
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
      src: '/media/sloth.svg'
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

    tapcontinue = Text({
      text: 'tab to skip',
      c: '#f1f1f1',
      y: innerHeight - Math.round(r / 5),
      x: cx,
      fs: Math.round(r / 6),
      f: 'Slackey'
    })
  })

  const tiktak = () => {
    tic += 0.01
    rAnglText = tic >= 1 ? 1 : tic
    if (tic >= 1.8) {
      pptProps.p = true
    }
    if (tic >= 2.2) {
      pptProps.c = '#f86a9a'
    }

    if (tic >= 2.6) {
      navigate('main')
    }
  }

  addEventClick(() => {
    [1.4, 1.8, 2.2, 2.6].some((num) => {
      if (tic < num) {
        tic = num
        return true
      }
    })
  })

  const onFontLoaded = () => {
    loop(tiktak)
    isFontLoaded = true
  }

  if (document?.fonts?.ready) {
    document?.fonts?.ready.then(onFontLoaded)
  } else {
    onFontLoaded()
  }

  const tapContinueTic = () => useTimer(() => {
    showTapContinue = !showTapContinue
    tapContinueTic()
  }, 250)

  tapContinueTic()

  return () => {
    const { cx, cy } = useMeasure()

    ctx.globalAlpha = isFontLoaded ? 1 : 0

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

    if (showTapContinue) {
      tapcontinue()
    }

    ctx.globalAlpha = 1
  }
}
