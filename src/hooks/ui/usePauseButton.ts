import { Pause } from '@/shapes/pause'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type PauseType = {
  render: Render,
  point: () => Point
}

type Props = {
  getX: (cx: number, r: number, m: number) => number
  getY: (cy: number, r: number, m: number) => number
}

export const usePauseButton = ({
  getX,
  getY,
}: Props): PauseType => {
  const {
    addEventResize,
    useMeasure,
    useTimer,
    useScreenMeta,
    navigate,
    addEventClick,
    intersect,
  } = useWebcore()
  const { from } = useScreenMeta()

  let props: PopitProps
  let popitPause: Render
  let pause: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    props = {
      c: '#fd8059',
      r: Math.round(s * 0.1),
      x: getX(cx, s, m),
      y: getY(cy, s, m),
      p: (from === 'game' || from === 'opening') && !props,
    }

    popitPause = Popit(props)

    pause = Pause(props)
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
    popitPause()
    if (!props.p) {
      pause()
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
