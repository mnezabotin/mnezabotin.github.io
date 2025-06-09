import { Popit, type Props as PopitProps } from '@/shapes/popit'
import { Text } from '@/shapes/text'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type Logo = {
  render: Render
  point: () => Point
}


type Props = {
  color?: string
  popEffect?: (p: PopitProps, wr?: boolean, s?: boolean) => void
}

export const useLogoButton = ({
  color = '#f86a9a',
  popEffect = () => {}
}: Props): Logo => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    useScreenMeta,
    addEventClick,
    intersect,
    navigate,
  } = useWebcore()
  const { from } = useScreenMeta()

  let props: PopitProps //ba68c8
  let logo: Render
  let yola: Render
  let popit: Render

  let counter = 0

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    const r = Math.round(s * 0.25)

    props = {
      c: color,
      x: cx,
      y: cy,
      r,
      p: (from === 'opening' || from === 'devs') && !props,
    }
    logo = Popit(props)

    yola = Text({
      text: 'Yola',
      c: '#f1f1f1',
      x: cx,
      y: cy - r + Math.round(r * 0.9),
      fs: Math.round(r / 2.6),
      mw: r * 2,
    })

    popit = Text({
      text: 'PopiT',
      c: '#ffeb3b',
      x: cx,
      y: cy - r + Math.round(r * 1.3),
      fs: Math.round(r / 2.3),
      mw: r * 2,
    })
  })

  useTimer(() => {
    if (props.p) {
      popEffect(props, false, true)
    }
    props.p = false
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props) && !props?.p) {
      counter++
      popEffect(props)
      props.p = true
      useTimer(() => {
        if (counter > 50) {
          navigate('devs')
        } else {
          if (props?.p) {
            popEffect(props, false, true)
          }
          props.p = false
        }
      }, 200)
    }
  })

  const point = () => ({
    x: props.x,
    y: props.y,
    r: props.r
  })

  const render = () => {
    logo()
    if (!props.p) {
      yola()
      popit()
    }
  }

  return {
    render,
    point
  }
}
