import { Play } from '@/shapes/play'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Point, Render } from '@/webcore/types'

type PlayType = {
  render: Render,
  point: () => Point
}

type Props = {
  color?: string
  popEffect?: (p: PopitProps, wr?: boolean, s?: boolean) => void
}

export const usePlayButton = ({
  color = '#bef181',
  popEffect = () => {}
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
  const { from, to } = useScreenMeta()

  let props: PopitProps
  let popitPlay: Render
  let play: Render

  const getMainCoords = (): { x: number, y: number } => {
    const { cx, cy, s, m } = useMeasure()

    const x = cx + Math.round(s * 0.25) + 2 * m
    const y = cy + Math.round(s * 0.25)

    return { x, y }
  }

  const getGamescoreCoords = (): { x: number, y: number } => {
    const { cx, cy, s, isL, m } = useMeasure()
    const r = Math.round(s * 0.1)

    if (isL) {
      let x = Math.round(cx + s / 2) + m * 2
      const y = Math.round(cy + s / 2 - r * 2)
      x = Math.min(x, Math.round(innerWidth - r * 1.5))

      return { x, y }
    } else {
      const x = Math.round(cx + s * 0.12)
      let y = Math.round(cy + s / 2 + r * 1.5)
      y = Math.min(y, innerHeight - Math.round(r * 1.5))

      return { x, y }
    }
  }

  const getCoords = (): { x: number, y: number } => {
    if (to === 'main') {
      return getMainCoords()
    } else {
      return getGamescoreCoords()
    }
  }

  addEventResize(() => {
    const { s } = useMeasure()

    props = {
      c: color,
      r: Math.round(s * 0.1),
      ...getCoords(),
      p: (
        from === 'gamescore' ||
        from === 'game' ||
        from === 'gameover' ||
        from === 'opening' ||
        from === 'devs') && !props,
    }

    popitPlay = Popit(props)

    play = Play(props)
  })

  useTimer(() => {
    if (props.p) {
      popEffect(props, false, true)
    }
    props.p = false
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      popEffect(props)
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
