import { useWebcore } from '@/webcore'

export const useGradient = (palette: string[]) => {
  const {
    addEventResize,
    useMeasure,
    setBackground,
  } = useWebcore()

  addEventResize(() => {
    const { s } = useMeasure()

    const r = Math.round(s * 0.14)
    
    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = (innerWidth - (2 * r * countw)) / (countw + 1)

    const counth = Math.round(innerHeight / r / 2) - 1
    const hs = (innerHeight - (2 * r * counth)) / (counth + 1)

    const dirIsRght= innerWidth >= innerHeight
    const count = dirIsRght ? countw : counth

    const start = dirIsRght ? ws : hs
    const size = dirIsRght ? innerWidth : innerHeight

    let pind = 0
    const colorStops = []

    for (let j = 0; j < count; j++) {
      if (!palette[pind]) {
        pind = 0
      }

      colorStops.push(`${palette[pind]} ${(start + r + j * r * 2 + start * j) / size * 100}%`)
      pind++
    }

    const direction = dirIsRght ? 'to right' : 'to bottom'

    setBackground(`linear-gradient(${direction}, ${colorStops.join(', ')})`, palette[0])
  })
}
