import { Play } from '@/shapes/play'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export const usePlay = (): Render => {
  const {
    addEventResize,
    useMeasure,
    useTimer
  } = useWebcore()

  let props: PopitProps
  let popitPlay: Render
  let play: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    const r = Math.round(s * 0.2)

    props = {
      c: '#bef181',
      r: Math.round(r * 0.4),
      x: cx + r + 4 * m,
      y: cy + r - m,
      p: !props,
    }

    popitPlay = Popit(props)

    play = Play(props)
  })

  useTimer(() => {
    props.p = false
  })

  return () => {
    popitPlay()
    if (!props.p) {
      play()
    }
  }
}
