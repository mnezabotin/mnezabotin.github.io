import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'
import { Pause } from '@/shapes/pause'
import { useStorage } from './useStorage'

type Popits = {
  render: Render
  popits: PopitProps[]
  pausePpt: PopitProps
}

type Props = {
  palette: string[] | string
  retry?: boolean
  popEffect?: (p: PopitProps, witR?: boolean, shake?: boolean) => void
}

export const usePopits = ({
  palette,
  retry,
  popEffect = () => {}
}: Props): Popits => {
  const {
    addEventResize,
    useMeasure,
    rand,
    useTimer,
    useScreenMeta,
    navigate,
    addEventClick,
    intersect,
  } = useWebcore()
  const { from } = useScreenMeta()
  const { getDifficultyRad } = useStorage()

  const pptProps: PopitProps[] = []
  let popits: Render[] = []

  let pausePopit: Render
  let pause: Render
  let retryPopit: PopitProps
  let pausePptProps: PopitProps = { x: 0, y: 0, r: 0 }

  const getFill = (i: number) => {
    if (Array.isArray(palette)) {
      return palette[i]
    } else {
      return palette
    }
  }

  addEventResize(() => {
    const { s } = useMeasure()

    pptProps.splice(0)

    // 0.15 0.14 0.11 0.09
    const dr = getDifficultyRad()
    const r = Math.round(s * dr)

    const countw = Math.round(innerWidth / r / 2) - 1
    const ws = (innerWidth - (2 * r * countw)) / (countw + 1)

    const counth = Math.round(innerHeight / r / 2) - 1
    const hs = (innerHeight - (2 * r * counth)) / (counth + 1)

    const dirIsRght= innerWidth >= innerHeight
    let pind = 0

    for (let i = 0; i < counth; i++) {
      for (let j = 0; j < countw; j++) {
        if (!getFill(pind)) {
          pind = 0
        }

        const props = {
          x: ws + r + j * r * 2 + ws * j,
          y: hs + r + i * r * 2 + hs * i,
          r,
          c: getFill(pind),
          p: true
        }
        
        if (i === 0 && j === countw - 1) {
          pausePptProps = {
            x: props.x,
            y: props.y,
            r: props.r,
            c: props.c,
            p: (
              from === 'main' ||
              from === 'gameover' ||
              from === 'gamescore'
            ) && !pausePptProps.r
          }
          pausePopit = Popit(pausePptProps)
          pause = Pause(pausePptProps)
        } else {
          pptProps.push(props)
        }

        pind += dirIsRght ? 1 : 0
      }
      pind = dirIsRght ? 0 : pind + 1
    }

    if (retry) {
      retryPopit = pptProps[rand(pptProps.length - 1)]
      useTimer(() => {
        popEffect(retryPopit, false, true)
        retryPopit.p = false
      })
    }

    popits = pptProps
      .map(p => Popit(p))
  })

  useTimer(() => {
    if (pausePptProps.p) {
      popEffect(pausePptProps, false, true)
    }
    pausePptProps.p = false
  })

  if (retry) {
    addEventClick((x, y) => {
      if (intersect({ x, y }, retryPopit)) {
        popEffect(retryPopit)
        retryPopit.p = true
        useTimer(() => {
          navigate('game')
        }, 100)
      }
    })
  }

  addEventClick((x, y) => {
    if (intersect({ x, y }, pausePptProps)) {
      popEffect(pausePptProps)
      pausePptProps.p = true
      useTimer(() => {
        navigate('main')
      }, 100)
    }
  })

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
    pausePpt: pausePptProps
  }
}
