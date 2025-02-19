import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export const useBack = (): Render => {
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

  addEventResize(() => {
    const { s, m } = useMeasure()

    const r = Math.round(s * 0.054)

    props = {
      c: '#00dcfe',
      r: Math.round(s * 0.054),
      x: r + 2 * m,
      y: r + 2 * m,
      p: false
    }

    popit = Popit(props)
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, props)) {
      props.p = true
      useTimer(() => {
        navigate('main')
      }, 100)
    }
  })

  return () => {
    popit()
  }
}
