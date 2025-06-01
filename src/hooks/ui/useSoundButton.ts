import { Popit, Props as PopitProps } from '@/shapes/popit'
import { Sound } from '@/shapes/sound'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'
import { useStorage } from '../useStorage'

type Sound = {
  render: Render
  point: () => Point
}

type Props = {
  color?: string
  popEffect?: (p: PopitProps, wr?: boolean, s?: boolean) => void
}

export const useSoundButton = ({
  color = '#f7e333',
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

  const { getSound, setSound } = useStorage()

  let props: PopitProps & { on: boolean }
  let popit: Render
  let sound: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    const r = Math.round(s * 0.25)

    const sooundOn = getSound()

    props = {
      c: color,
      r: Math.round(s * 0.065),
      x: cx - r - 6 * m,
      y: cy - r + 14 * m,
      p: (from === 'opening') && !props,
      on: sooundOn
    }

    popit = Popit(props)

    sound = Sound(props)
  })

  useTimer(() => {
    if (props.p) {
      popEffect(props, false, true)
    }
    props.p = false
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      popEffect(props)
      let sooundOn = getSound()
      sooundOn = !sooundOn
      setSound(sooundOn)
      props.p = true
      props.on = sooundOn
      useTimer(() => {
        props.p = false
      }, 100)
    }
  })

  const render = () => {
    popit()
    if (!props.p) {
      sound()
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
