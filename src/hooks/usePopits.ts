import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

const RAD_DIFF = 0.08
const PALETTE = ['#f86a9a', '#C69FEE', '#5bb2f7', '#92E6E6', '#7ceab2', '#bef181', '#EFCD74', '#fd8059']

export const usePopits = (): Render => {
  const {
    addEventResize,
    useMeasure,
    rand,
    useTimer,
    setBackground,
  } = useWebcore()

  let pptProps: PopitProps[] = []
  let popits: Render[] = []

  const initBackground = () => {
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
  }

  const initPopits = () => {
    const { s } = useMeasure()

    pptProps = []

    const r = Math.round(s * RAD_DIFF)

    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = (innerWidth - (2 * r * countw)) / (countw + 1)

    const counth = Math.round(innerHeight / r / 2) - 1
    const hs = (innerHeight - (2 * r * counth)) / (counth + 1)

    let pind = 0

    for (let i = 0; i < counth; i++) {
      for (let j = 0; j < countw; j++) {
        if (!PALETTE[pind]) {
          pind = 0
        }

        pptProps.push({
          x: ws + r + j * r * 2 + ws * j,
          y: hs + r + i * r * 2 + hs * i,
          r,
          c: PALETTE[pind],
          p: rand(1) > 0,
        })

        pind++
      }
      pind = 0
    }

    popits = pptProps
      .map(p => Popit(p))
  }

  addEventResize(() => {
    initBackground()
    initPopits()
  })

  const tic = () => {
    useTimer(() => {
      const i = rand(pptProps.length - 1)
      pptProps[i].p = !pptProps[i].p
      tic()
    })
  }

  tic()

  return () => {
    popits.forEach(r => r())
  }
}
