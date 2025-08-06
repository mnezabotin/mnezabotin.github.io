import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

const IMAGES: Record<string, HTMLCanvasElement>  = {}

export type Props = {
  x: number
  y: number
  r: number
  c?: string
  p?: boolean
}

export const Popit = (props: Props): Render => {
  const { shade, ctx: mainCtx, createImg } = useWebcore()

  const getGradient = (): CanvasGradient => {
    const {
      r,
      c = '#ffffff',
      p,
    } = props

    const gradient = mainCtx.createRadialGradient(r, r, r, r, r, r / 5)

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
      gradient.addColorStop(0.6, shade(c, -8))
      gradient.addColorStop(1, shade(c, -6))
    } else {
      gradient.addColorStop(0.24, shade(c, -12))
      gradient.addColorStop(0.26, shade(c, -8))
      gradient.addColorStop(0.3, shade(c, -2))
      gradient.addColorStop(0.34, shade(c, 0))
      gradient.addColorStop(0.5, shade(c, 5))
      gradient.addColorStop(1, shade(c, 18))
    }

    return gradient
  }

  const getImg = () => {
    const {
      r,
      c = '#ffffff',
      p,
    } = props

    const ikey = `${c}_${p ? 'push' : 'pop'}_${r}`

    if (IMAGES[ikey]) {
      return IMAGES[ikey]
    }

    const img = createImg((ctx = mainCtx) => {
      const gradient = getGradient()
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(r, r, r, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fill()
    }, 2 * r)

    IMAGES[ikey] = img

    return img
  }

  return (ctx = mainCtx) => {
    const { x, y, r } = props

    const img = getImg()
    ctx.drawImage(img, x - r, y - r, 2 * r, 2 * r)
  }
}
