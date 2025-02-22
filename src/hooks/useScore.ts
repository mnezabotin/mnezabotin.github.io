import { Img } from '@/shapes/img'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { intersectArc } from '@/webcore/intersect'
import { Render } from '@/webcore/types'

// type Score = {
//   render: Render
//   point: Point
// }

export const useScore = (): Render => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    addEventClick,
    navigate,
  } = useWebcore()

  let props: PopitProps
  let popit: Render
  let star: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    const r = Math.round(s * 0.2)

    props = {
      c: '#ba68c8',
      r: Math.round(s * 0.054),
      x: cx - r - 1 * m,
      y: cy - r + 1 * m,
      p: !props,
    }

    popit = Popit(props)

    star = Img({
      x: Number(props.x) - props.r + Math.round(props.r * 0.5),
      y: Number(props.y) - props.r + Math.round(props.r * 0.5),
      w: props.r * 2 - Math.round(props.r * 1.0),
      src: '/star1.svg'
    })
  })

  useTimer(() => {
    props.p = false
  })

  addEventClick((x, y) => {
    if (intersectArc({ x, y }, props)) {
      props.p = true
      useTimer(() => {
        navigate('score')
      }, 100)
    }
  })

  return () => {
    popit()
    if (!props.p) {
      star()
    }
  }
}
