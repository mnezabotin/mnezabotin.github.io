import { Pause } from '@/shapes/pause'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type PauseType = {
  render: Render,
  point: () => Point
}

type Props = {
  popEffect?: (p: PopitProps, wr?: boolean, s?: boolean) => void
}

export const usePauseButton = ({
  popEffect = () => {}
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

  const getCoords = (): { x: number, y: number } => {
    const { cx, cy, s, isL, m } = useMeasure()
    const r = Math.round(s * 0.1)

    if (isL) {
      let x = Math.round(cx - s / 2) - m
      const y = Math.round(cy - s / 2 + r * 2)
      x = Math.max(x, Math.round(r * 1.5))

      return { x, y }
    } else {
      const x = Math.round(cx - s * 0.12)
      let y = Math.round(cy + s / 2 + r * 1.5)
      y = Math.min(y, innerHeight - Math.round(r * 1.5))

      return { x, y }
    }
  }

  addEventResize(() => {
    const { s } = useMeasure()

    const r = Math.round(s * 0.08) 
    props = {
      c: '#fd8059',
      r,
      ...getCoords(),
      p: (from === 'game' || from === 'opening') && !props,
    }

    popitPause = Popit(props)

    pause = Pause(props)
  })

  useTimer(() => {
    if (props.p) {
      popEffect(props, false, true)
    }
    props.p = false
  }, 500)

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      popEffect(props)
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
