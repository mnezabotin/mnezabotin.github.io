import type { Render, Stage } from '@/webcore/types'

export const useStage = (): Stage => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('CanvasRenderingContext2D is null')
  }

  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = innerHeight * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)
  }

  const render = (draw: Render) => {
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    draw()
  }

  resize()
  document.body.appendChild(canvas)

  const shade = (color: string, percent: number): string => {
    color = color.substring(1)
    const num = parseInt(color, 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt, 
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt

    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
  }

  const rotate = (draw: Render, x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y)
    ctx.rotate(Math.PI * angle)
    ctx.translate(-x, -y)

    draw()

    ctx.restore()
  }

  const translate = (draw: Render, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y)

    draw()

    ctx.restore()
  }

  const createImg = (draw: Render, w: number, h = w): HTMLCanvasElement => {
    const img = document.createElement('canvas')
    const context = img.getContext('2d')

    if (!context) {
      throw new Error('CanvasRenderingContext2D is null')
    }

    img.width = w * devicePixelRatio
    img.height = h * devicePixelRatio
    context.scale(devicePixelRatio, devicePixelRatio)

    draw(context)

    return img
  }

  const setBackground = (color: string) => document.body.style.background = color

  return {
    ctx,
    render,
    resize,

    rotate,
    translate,
    shade,
    setBackground,
    createImg,
  }
}
