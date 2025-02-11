import { useWebcore } from '@/webcore'
import { Text } from '@/shapes/text'
import type { Render } from '@/webcore/types'

export const useDevTitre = (): Render => {
  const { addEventResize, useMeasure } = useWebcore()
  
  let titre: Render

  addEventResize(() => {
    const { cx, m } = useMeasure()

    const fs = Math.round(1.2 * m)

    titre = Text({
      text: 'Nezabotin Production',
      x: cx,
      y: innerHeight - fs - m,
      fs,
      c: '#fff'
    })
  })

  return () => {
    titre()
  }
}
