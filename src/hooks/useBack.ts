import { Img } from '@/shapes/img'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type Back = {
  render: Render
  point: () => Point
}

export const useBack = (): Back => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    addEventClick,
    intersect,
    navigate,
  } = useWebcore()

  let props: PopitProps
  let popit: Render
  let back: Render

  addEventResize(() => {
    const { s, m } = useMeasure()

    const r = Math.round(s * 0.06)

    props = {
      c: '#ff6347',
      r,
      x: r + 3 * m,
      y: r + 3 * m,
      p: false
    }

    popit = Popit(props)

    back = Img({
      x: Number(props.x) - r + Math.round(r * 0.4),
      y: Number(props.y) - r + Math.round(r * 0.4),
      w: r * 2 - Math.round(r * 0.8),
      src: '/back.svg'
    })
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      props.p = true
      useTimer(() => {
        navigate('main')
      }, 100)
    }
  })

  const render = () => {
    popit()
    back()
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
