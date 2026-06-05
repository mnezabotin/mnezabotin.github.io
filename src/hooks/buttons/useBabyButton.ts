import { Popit, Props as PopitProps } from '@/shapes/popit'
import { Sound } from '@/shapes/sound'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'
import { useStorage } from '../useStorage'
import { Img } from '@/shapes/img'

type Sound = {
  render: Render
  point: () => Point
}

type Props = {
  color?: string
  popEffect?: (p: PopitProps, wr?: boolean, s?: boolean) => void
}

export const useBabyButton = ({
  color = '#f86a9a',
  popEffect = () => {}
}: Props): Sound => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    useScreenMeta,
    addEventClick,
    intersect,
  } = useWebcore()
  const { from } = useScreenMeta()

  const { getBaby, setBaby } = useStorage()

  let babyOn = getBaby()

  let props: PopitProps & { on: boolean }
  let popit: Render
  let baby: Render
  let babyOffRender: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    const r = Math.round(s * 0.25)

    const rad = Math.round(s * 0.055)

    props = {
      c: color,
      r: rad,
      x: cx - r - rad - m,
      y: cy - r + 6 * rad + m,
      p: (from === 'opening' || from === 'devs') && !props,
      on: babyOn
    }

    popit = Popit(props)

    baby = Img({
      x: Number(props.x) - props.r + Math.round(props.r * 0.5),
      y: Number(props.y) - props.r + Math.round(props.r * 0.5) - Math.round(props.r * 0.05),
      w: props.r * 2 - Math.round(props.r * 1.0),
      src: './media/baby.svg'
    })

    babyOffRender = Img({
      x: Number(props.x) - props.r + Math.round(props.r * 0.5),
      y: Number(props.y) - props.r + Math.round(props.r * 0.5) - Math.round(props.r * 0.05),
      w: props.r * 2 - Math.round(props.r * 1.0),
      src: './media/babyoff.svg'
    })
  })

  useTimer(() => {
    if (props.p) {
      popEffect(props, false, true)
    }
    props.p = false
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      babyOn = !babyOn
      setBaby(babyOn)
      props.p = true
      props.on = babyOn
      popEffect(props)
      useTimer(() => {
        props.p = false
      }, 100)
    }
  })

  const render = () => {
    popit()
    if (!props.p) {
      if (babyOn) {
        baby()
      } else {
        babyOffRender()
      }
    }
  }

  const point = (): Point => ({
    x: props.x,
    y: props.y,
    r: props.r
  })

  return {
    render,
    point
  }
}
