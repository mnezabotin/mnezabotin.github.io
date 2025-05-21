import { Play } from '@/shapes/play'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type Play = {
  render: Render,
  point: () => Point
}

export const usePlayButton = (): Play => {
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

    const r = Math.round(s * 0.25)

    props = {
      c: '#bef181',
      r: Math.round(s * 0.1),
      x: cx + r + 2 * m,
      y: cy + r,
      p: (from === 'game' || from === 'opening') && !props,
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
