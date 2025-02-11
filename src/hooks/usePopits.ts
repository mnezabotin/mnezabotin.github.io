import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'
import { PALETTE, RAD_DIFF } from '@/consts'

export const usePopits = (): Render => {
  const {
    addEventResize,
    useMeasure,
    rand,
    useTimer,
  } = useWebcore()

  let pptProps: PopitProps[] = []
  let popits: Render[] = []

  addEventResize(() => {
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
          p: true// p: rand(1) > 0,
        })

        pind++
      }
      pind = 0
    }

    popits = pptProps
      .map(p => Popit(p))
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
