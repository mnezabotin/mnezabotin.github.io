import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export const useFond = (): Render => {
  const {
    addEventResize,
    useMeasure,
    useRandChain,
    rand,
    useTimer
  } = useWebcore()

  let popits: Render[] = []
  let pptProps: PopitProps[] = []

  addEventResize(() => {
    const { cx, cy, s, m } = useMeasure()
    const rand = useRandChain(9)

    const props = []

    const r = Math.round(s * 0.08)

    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = (innerWidth - (2 * r * countw)) / (countw + 1)

    const counth = Math.round(innerHeight / r / 2) - 1
    const hs = (innerHeight - (2 * r * counth)) / (counth + 1)

    for (let i = 0; i < counth; i++) {
      for (let j = 0; j < countw; j++) {
        props.push({
          x: ws + r + j * r * 2 + ws * j,
          y: hs + r + i * r * 2 + hs * i,
          r,
          c: '#00dcfe',
          p: rand(1) > 0,
        })
      }
    }

    const mRad = Math.round(s * 0.2)
    const mmRad = mRad * 0.4

    pptProps = props
      .filter(({ r, x, y }) =>
        !(Math.abs(x - cx) < (mRad + r) &&
        Math.abs(y - cy) < (mRad + r))
      )
      .filter(({ r, x, y }) =>
        !(Math.abs(x - (cx + mRad + m)) < (mmRad + r) &&
          Math.abs(y - (cy + mRad + m)) < (mmRad + r))
      )

    popits = pptProps
      .map(p => Popit(p))
  })

  const time = () => {
    useTimer(() => {
      const i = rand(pptProps.length - 1)
      pptProps[i].p = !pptProps[i].p
      time()
    }, 400)
  }

  time()

  return () => {
    popits.forEach(r => r())
  }
}
