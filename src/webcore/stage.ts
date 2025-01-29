import type { Render, Stage } from '@/webcore/types'

export function Stage(): Stage {
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

  return {
    ctx,
    render,
    resize,
  }
}
