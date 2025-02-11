import { useWebcore } from '@/webcore'
import { PALETTE, RAD_DIFF } from '@/consts'

export const useGradient = () => {
  const {
    addEventResize,
    useMeasure,
    setBackground,
  } = useWebcore()

  addEventResize(() => {
    const { s } = useMeasure()

    const r = Math.round(s * RAD_DIFF)
    
    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = (innerWidth - (2 * r * countw)) / (countw + 1)

    let pind = 0
    const colorStops = []

    for (let j = 0; j < countw; j++) {
      if (!PALETTE[pind]) {
        pind = 0
      }

      colorStops.push(`${PALETTE[pind]} ${(ws + r + j * r * 2 + ws * j) / innerWidth * 100}%`)
      pind++
    }

    setBackground(`linear-gradient(to right, ${colorStops.join(', ')})`)
  })
}
