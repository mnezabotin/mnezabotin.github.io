import { Popit } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export function Opening(): Render {
  const { addEventResize, useMeasure } = useWebcore()
  let popit: Render

  addEventResize(() => {
    const { cx, cy } = useMeasure()
    const screen = innerWidth < innerHeight ?  innerWidth : innerHeight
    popit = Popit({
      x: cx,
      y: cy,
      r: Math.round(screen * 0.20),
      c: '#ff5722',
      p: false
    })
  })

  return () => {
    popit()
  }
}
