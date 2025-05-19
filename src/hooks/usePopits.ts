import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'
import { PALETTE, RAD_DIFF } from '@/consts'
import { Pause } from '@/shapes/pause'

type Popits = {
  render: Render
  popits: PopitProps[]
}

export const usePopits = (): Popits => {
  const {
    navigate,
    addEventResize,
    addEventClick,
    useMeasure,
    // rand,
    useTimer,
    intersect,
    useScreenMeta,
  } = useWebcore()
  const { from } = useScreenMeta()

  const pptProps: PopitProps[] = []
  let popits: Render[] = []

  let pausePptProps: PopitProps
  let pausePopit: Render
  let pause: Render

  addEventResize(() => {
    const { s } = useMeasure()

    pptProps.splice(0)

    const r = Math.round(s * RAD_DIFF)

    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = (innerWidth - (2 * r * countw)) / (countw + 1)

    const counth = Math.round(innerHeight / r / 2) - 1
    const hs = (innerHeight - (2 * r * counth)) / (counth + 1)

    const dirIsRght= innerWidth >= innerHeight
    let pind = 0

    for (let i = 0; i < counth; i++) {
      for (let j = 0; j < countw; j++) {
        if (!PALETTE[pind]) {
          pind = 0
        }

        const props = {
          x: ws + r + j * r * 2 + ws * j,
          y: hs + r + i * r * 2 + hs * i,
          r,
          c: PALETTE[pind],
          p: true
        }
        
        if (i === 0 && j === countw - 1) {
          pausePptProps = { ...props, p: from === 'main' && !pausePptProps }
          pausePopit = Popit(pausePptProps)
          pause = Pause(props)
        } else {
          pptProps.push(props)
        }

        pind += dirIsRght ? 1 : 0
      }
      pind = dirIsRght ? 0 : pind + 1
    }

    popits = pptProps
      .map(p => Popit(p))
  })

  useTimer(() => {
    pausePptProps.p = false
  })

  addEventClick((x, y) => {
    if (intersect({ x, y }, pausePptProps)) {
      pausePptProps.p = true
      useTimer(() => {
        navigate('main')
      }, 100)
    }
  })

  // const tic = () => {
  //   useTimer(() => {
  //     const i = rand(pptProps.length - 1)
  //     pptProps[i].p = !pptProps[i].p
  //     tic()
  //   })
  // }

  // tic()

  const render = () => {
    popits.forEach(r => r())
    pausePopit()
    if (!pausePptProps?.p) {
      pause()
    }
  }

  return {
    render,
    popits: pptProps,
  }
}
