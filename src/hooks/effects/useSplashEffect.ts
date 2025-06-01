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

  let effect: {
    tic: number
    props: TextProps
    shape: Render
    shake?: boolean
    origX: number
    origY: number
  } | null = null

  const loopEffect = () => {
    if (!effect) {
      return
    }

    const { m } = useMeasure()

    if (effect.tic <= RANGE) {
      effect.props.fs = (props?.mfs || 8) / RANGE * effect.tic * m
    } else {
      const dx = rand(1, 1)
      const dy = rand(1, 1)

      effect.props.x = effect.origX + (Math.random() * dx * (Math.random() > 0.5 ? 1 : -1))
      effect.props.y = effect.origY + (Math.random() * dy * (Math.random() > 0.5 ? 1 : -1))
      effect.shake = true
    }
    effect.tic += effect.tic > RANGE ? 1 : 10
    if (effect.tic > RANGE * 2 && !props?.infinity) {
      effect = null
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

    effect = {
      props: textProps,
      shape,
      tic,
      origX: textProps.x,
      origY: textProps.y,
    }
  }

  const render = () => {
    if (!effect) {
      return
    }
    ctx.globalAlpha = 0.01 * effect.tic
    
    // ctx.textAlign = 'center'
    // ctx.fillStyle = '#000'
    // ctx.font = `${effect.props.fs + 0.5}px ${font}`
    // ctx.fillText(effect.props.text, effect.props.x, effect.props.y)

    effect.shape()
    ctx.globalAlpha = 1
  }

  loop(loopEffect)

  return {
    splashEffect,
    render
  }
}
