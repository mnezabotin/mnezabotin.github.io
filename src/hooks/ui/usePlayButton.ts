import { Play } from '@/shapes/play'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type PlayType = {
  render: Render,
  point: () => Point
}

type Props = {
  getX: (cx: number, r: number, m: number) => number
  getY: (cy: number, r: number, m: number) => number
  color?: string
}

export const usePlayButton = ({
  getX,
  getY,
  color = '#bef181'
}: Props): PlayType => {
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
  let popitPlay: Render
  let play: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    props = {
      c: color,
      r: Math.round(s * 0.1),
      x: getX(cx, s, m),
      y: getY(cy, s, m),
      p: (from === 'gamescore' || from === 'game' || from === 'opening') && !props,
    }

    popitPlay = Popit(props)

    play = Play(props)
  })

  useTimer(() => {
    props.p = false
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      props.p = true
      useTimer(() => {
        navigate('game')
      }, 100)
    }
  })

  const render = () => {
    popitPlay()
    if (!props.p) {
      play()
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
