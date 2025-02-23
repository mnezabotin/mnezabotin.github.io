import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

const GRADIENTS: Record<string, CanvasGradient>  = {}

export type Props = {
  x: number
  y: number
  r: number
  c?: string
  p?: boolean
}

export const Popit = (props: Props): Render => {
  const { shade, ctx: mainCtx } = useWebcore()

  const getGradient = (): CanvasGradient => {
    const {
      r,
      c = '#ffffff',
      x,
      y,
      p,
    } = props

    const gkey = `${c}_${x}_${y}_${r}_${p ? 'push' : 'pop'}`

    if (GRADIENTS[gkey]) {
      return GRADIENTS[gkey]
    }

    const gradient = mainCtx.createRadialGradient(x, y, r, x, y, r / 5)

    gradient.addColorStop(0, shade(c, 0))
    gradient.addColorStop(0.01, shade(c, 0))
    gradient.addColorStop(0.075, shade(c, 9))
    gradient.addColorStop(0.15, shade(c, 0))
    gradient.addColorStop(0.15, shade(c, -15))
    gradient.addColorStop(0.18, shade(c, -5))
    gradient.addColorStop(0.22, shade(c, -15))

    if (p) {
      gradient.addColorStop(0.24, shade(c, -10))
      gradient.addColorStop(0.3, shade(c, -8))
      gradient.addColorStop(0.34, shade(c, -12))
      gradient.addColorStop(0.6, shade(c, -6))
      gradient.addColorStop(1, shade(c, -4))
    } else {
      gradient.addColorStop(0.24, shade(c, -12))
      gradient.addColorStop(0.26, shade(c, -8))
      gradient.addColorStop(0.3, shade(c, -2))
      gradient.addColorStop(0.34, shade(c, 0))
      gradient.addColorStop(0.5, shade(c, 5))
      gradient.addColorStop(1, shade(c, 10))
    }

    GRADIENTS[gkey] = gradient

    console.log(GRADIENTS)

    return gradient
  }

  return (ctx = mainCtx) => {
    const {
      r,
      x,
      y,
    } = props

    const gradient = getGradient()

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }
}
