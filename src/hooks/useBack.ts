import { Img } from '@/shapes/img'
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
    shade
  } = useWebcore()

  let props: PopitProps
  let popit: Render
  let back: Render

  console.log(shade('#ff6347', - 3))

  addEventResize(() => {
    const { s, m } = useMeasure()

    const r = Math.round(s * 0.054)

    props = {
      c: '#ff6347',
      r: Math.round(s * 0.054),
      x: r + 2 * m,
      y: r + 2 * m,
      p: false
    }

    popit = Popit(props)

    back = Img({
      x: Number(props.x) - props.r + Math.round(props.r * 0.35),
      y: Number(props.y) - props.r + Math.round(props.r * 0.35),
      w: props.r * 2 - Math.round(props.r * 0.7),
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

  return () => {
    popit()
    back()
  }
}
