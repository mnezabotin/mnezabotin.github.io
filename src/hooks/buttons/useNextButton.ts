import { Img } from '@/shapes/img'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'
import { useSoundEffect } from '../effects/useSoundEffect'

type Back = {
  render: Render
  point: () => Point
}

type Props = {
  onClick: () => void
  popEffect?: (p: PopitProps, wr?: boolean, s?: boolean) => void
}

export const useNextButton = ({ onClick }: Props): Back => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    addEventClick,
    intersect,
    rotate,
  } = useWebcore()

  const { playPop } = useSoundEffect()

  let props: PopitProps
  let popit: Render
  let back: Render

  addEventResize(() => {
    const { s } = useMeasure()

    const r = Math.round(s * 0.08)

    props = {
      c: '#ff6347',
      r,
      x: Math.round(innerWidth - 1.6 * r),
      y: Math.round(innerHeight - 1.6 * r),
      p: false
    }

    popit = Popit(props)

    back = Img({
      x: Number(props.x) - r + Math.round(r * 0.4),
      y: Number(props.y) - r + Math.round(r * 0.4),
      w: r * 2 - Math.round(r * 0.8),
      src: '/media/back.svg'
    })
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      playPop()
      // if (!props?.p) {
      //   popEffect(props)
      // }
      props.p = true
      onClick()
      useTimer(() => {
        // if (props?.p) {
        //   popEffect(props, false, true)
        // }
        props.p = false
      }, 100)
    }
  })

  const render = () => {
    popit()
    if (!props.p) {
      rotate(() => {
        back()
      }, props.x, props.y, innerHeight > innerWidth ? -1 : -0.5)
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
