import { Play } from '@/shapes/play'
import { Popit } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export const usePlay = (): Render => {
  const { addEventResize, useMeasure } = useWebcore()

  let popitPlay: Render
  let play: Render

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()

    const r = Math.round(s * 0.2)

    const playX = cx + r + 4 * m
    const playY = cy + r - m
    const playR = Math.round(r * 0.4)
    const playC = '#bef181'

    popitPlay = Popit({
      c: playC,
      x: playX,
      y: playY,
      r: playR,
    })

    play = Play({
      x: playX,
      y: playY,
      r: playR,
      c: playC,
    })
  })

  return () => {
    popitPlay()
    play()
  }
}
