import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

type FondIntersection = (condition: (x: number, y: number, r: number) => boolean) => void

type Fond = {
  render: Render
  setIntersections: FondIntersection
}

export const useFond = (color = '#00dcfe'): Fond => {
  const {
    addEventResize,
    useRandChain,
    useMeasure,
    rand,
    useTimer,
    setBackground,
  } = useWebcore()

  setBackground(color)

  const randSeed = rand(0, 999)

  let pptProps: PopitProps[] = []
  let popits: Render[] = []

  addEventResize(() => {
    const rand = useRandChain(randSeed)
    const { s } = useMeasure()

    pptProps = []

    const r = Math.round(s * 0.044)

    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = Math.round((innerWidth - (2 * r * countw)) / (countw + 1))

    const counth = Math.round(innerHeight / r / 2) - 1
    const hs = Math.round((innerHeight - (2 * r * counth)) / (counth + 1))

    for (let i = 0; i < counth; i++) {
      for (let j = 0; j < countw; j++) {
        if (rand(rand(9)) < 1) {
          pptProps.push({
            x: ws + r + j * r * 2 + ws * j,
            y: hs + r + i * r * 2 + hs * i,
            r,
            c: color,
            p: true,
          })
        }
      }
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

  useTimer(() => {
    pptProps.forEach(r => r.p = rand(1) > 0)
    tic()
  })

  const render = () => {
    popits.forEach(r => r())
  }

  const setIntersections: FondIntersection = (condition) => {
    pptProps = pptProps
      .filter(({ x, y, r}) => condition(x, y, r))
    popits = pptProps
      .map(p => Popit(p))
  }

  return {
    render,
    setIntersections
  }
}
