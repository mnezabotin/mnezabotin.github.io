import { Img } from '@/shapes/img'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type Back = {
  render: Render
  point: () => Point
}

export const useBackButton = (): Back => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    addEventClick,
    intersect,
    navigate,
    useScreenMeta,
  } = useWebcore()
  const { from } = useScreenMeta()

  let props: PopitProps
  let popit: Render
  let back: Render

  addEventResize(() => {
    const { s } = useMeasure()

    const r = Math.round(s * 0.055)

    props = {
      c: '#ff6347',
      r,
      x: Math.round(1.6 * r),
      y: Math.round(1.6 * r),
      p: from === 'main' && !props
    }

    popit = Popit(props)

    back = Img({
      x: Number(props.x) - r + Math.round(r * 0.4),
      y: Number(props.y) - r + Math.round(r * 0.4),
      w: r * 2 - Math.round(r * 0.8),
      src: '/media/back.svg'
    })
  })

  
  useTimer(() => {
    props.p = false
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
    if (!props.p) {
      back()
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
