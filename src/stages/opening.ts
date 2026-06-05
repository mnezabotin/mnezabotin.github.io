import { useWebcore } from '@/webcore'
import { Popit } from '@/shapes/popit'
import { Img } from '@/shapes/img'
import { Text } from '@/shapes/text'
import { useLang } from '@/lang'
import { Container } from 'pixi.js'

export const Opening = () => {
  const {
    addEventResize,
    useMeasure,
    setBackground,
    useTimer,
    // useLoop,
  } = useWebcore()

  const lang = useLang()

  setBackground('#040404')

  let tap: Container

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()
    const r = Math.round(s * 0.25)

    Popit({
      x: cx,
      y: cy,
      r,
      c: '#ff6347',
      p: false
    })

    Img({
      x: cx - r + Math.round(r * 0.35),
      y: cy - r + Math.round(r * 0.35),
      w: r * 2 - Math.round(r * 0.7),
      src: './media/sloth.svg'
    })

    tap = Text({
      text: lang.tapToSkip,
      c: '#f1f1f1',
      y: innerHeight - Math.round(r / 3.5),
      x: cx,
      fs: Math.round(r / 10),
      w: s,
    })
  })

  const tapLoop = () => useTimer(() => {
    tap.alpha = tap.alpha === 1 ? 0 : 1
    tapLoop()
  })

  tapLoop()
}
