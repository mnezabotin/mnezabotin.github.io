import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

type FondIntersection = (condition: (x: number, y: number, r: number) => boolean) => void

type Fond = {
  render: Render
  setIntersections: FondIntersection
}

type Props = {
  color?: string
  frequency?: number
}

export const useFond = ({ color = '#00dcfe', frequency = 20 }: Props): Fond => {
  const {
    addEventResize,
    useRandChain,
    useMeasure,
    rand,
    useTimer,
    setBackground,
    useScreenMeta,
    // ctx,
  } = useWebcore()
  const { from } = useScreenMeta()

  setBackground(color)

  const randSeed = rand(0, 999)

  let pptProps: PopitProps[] = []
  let popits: Render[] = []

  addEventResize(() => {
    const rand = useRandChain(randSeed)
    const { s } = useMeasure()

    pptProps = []

    const r = Math.round(s * 0.05)

    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = Math.round((innerWidth - (2 * r * countw)) / (countw + 1))

    const counth = Math.round(innerHeight / r / 2) - 1
    const hs = Math.round((innerHeight - (2 * r * counth)) / (counth + 1))

    for (let i = 0; i < counth; i++) {
      for (let j = 0; j < countw; j++) {
        if (rand(rand(frequency)) < 1) {
          pptProps.push({
            x: ws + r + j * r * 2 + ws * j,
            y: hs + r + i * r * 2 + hs * i,
            r,
            c: color,
            p: from === 'opening' ? true : rand(1) > 0,
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
      if (pptProps[i]) {
        pptProps[i].p = !pptProps[i].p
      }
      tic()
    }, 750)
  }

  if (from === 'opening') {
    useTimer(() => {
      pptProps.forEach(r => r.p = rand(1) > 0)
      tic()
    })
  } else {
    tic()
  }

  const render = () => {
    // ctx.globalAlpha = 0.75
    popits.forEach(r => r())
    // ctx.globalAlpha = 1
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
