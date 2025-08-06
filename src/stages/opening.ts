import { Container } from 'pixi.js'
import { useWebcore } from '@/webcore'
import { Popit } from '@/shapes/popit'

export const Opening = () => {
  const {
    addEventResize,
    useMeasure,
  } = useWebcore()

  let popit: Container

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()
    const r = Math.round(s * 0.25)

    popit = Popit({
      x: cx,
      y: cy,
      r,
      c: '#ff6347',
      p: false
    })
  })
}
