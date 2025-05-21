import { Img } from '@/shapes/img'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'
import { usePopitNavigate } from '../usePopitNavigate'

type Score = {
  render: Render
  point: () => Point
}

export const useScoreButton = (): Score => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    useScreenMeta,
  } = useWebcore()
  const { from } = useScreenMeta()

  let props: PopitProps = { x: 0, y: 0, r: 0 }
  let popit: Render
  let star: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    const r = Math.round(s * 0.25)

    props = {
      c: '#ba68c8',
      r: Math.round(s * 0.08),
      x: cx - r - 1 * m,
      y: cy - r + 1 * m,
      p: (from === 'score' || from === 'opening') && !props,
    }

    popit = Popit(props)

    star = Img({
      x: Number(props.x) - props.r + Math.round(props.r * 0.5),
      y: Number(props.y) - props.r + Math.round(props.r * 0.5),
      w: props.r * 2 - Math.round(props.r * 1.0),
      src: '/media/star.svg'
    })
  })

  useTimer(() => {
    props.p = false
  })

  usePopitNavigate(props, 'score')

  const render = () => {
    popit()
    if (!props.p) {
      star()
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
