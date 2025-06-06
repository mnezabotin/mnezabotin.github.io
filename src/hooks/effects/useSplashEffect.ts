import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'
import { Text, Props as TextProps } from '@/shapes/text'

const RANGE = 100

type SplashEffect = {
  splashEffect: (text: string, color?: string) => void
  render: Render
}

type Props = {
  color?: string
  maxSize?: number
  infinity?: boolean
  dy?: number
  mfs?: number
}

export const useSplashEffect = (props?: Props): SplashEffect => {
  const {
    loop,
    ctx,
    useMeasure,
    rand,
    // font
  } = useWebcore()

  let splash: {
    tic: number
    props: TextProps
    shape: Render
    shake?: boolean
    origX: number
    origY: number
  } | null = null

  const loopEffect = () => {
    if (!splash) {
      return
    }

    const { m } = useMeasure()

    if (splash.tic <= RANGE) {
      splash.props.fs = (props?.mfs || 8) / RANGE * splash.tic * m
    } else {
      const dx = rand(1, 1)
      const dy = rand(1, 1)

      splash.props.x = splash.origX + (Math.random() * dx * (Math.random() > 0.5 ? 1 : -1))
      splash.props.y = splash.origY + (Math.random() * dy * (Math.random() > 0.5 ? 1 : -1))
      splash.shake = true
    }
    splash.tic += splash.tic > RANGE ? 1 : 10
    if (splash.tic > RANGE * 2 && !props?.infinity) {
      splash = null
    }
  }

  const splashEffect = (text: string) => {
    const { cx, m } = useMeasure()
  
    const tic = 0
    const textProps = {
      x: cx,
      y: Math.round(m * (props?.dy || 16)),
      text,
      c: props?.color || '#ffffff',
      fs: 0
    }
    const shape = Text(textProps)

    splash = {
      props: textProps,
      shape,
      tic,
      origX: textProps.x,
      origY: textProps.y,
    }
  }

  const render = () => {
    if (!splash) {
      return
    }
    ctx.globalAlpha = 0.01 * splash.tic
    
    // ctx.textAlign = 'center'
    // ctx.fillStyle = '#000'
    // ctx.font = `${splash.props.fs + 0.5}px ${font}`
    // ctx.fillText(splash.props.text, splash.props.x, splash.props.y)

    splash.shape()
    ctx.globalAlpha = 1
  }

  loop(loopEffect)

  return {
    splashEffect,
    render
  }
}
