import type { Stage, StageEntity } from '@/webcore/types'

export function Stage(): Stage {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('CanvasRenderingContext2D is null')
  }

  const objs: StageEntity[] = []

  const add = (obj: StageEntity) => {
    if (objs.indexOf(obj) === -1) {
      objs.push(obj)
    }
  }

  const remove = (obj: StageEntity) => {
    const i = objs.indexOf(obj)
    if (i > -1) {
      objs.splice(i, 1)
    }
  }

  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = innerHeight * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    objs.forEach(o => o.resize?.())
  }

  const render = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    objs.forEach(o => o.render())
  }

  resize()
  document.body.appendChild(canvas)
  document.addEventListener('resize', resize)

  return {
    ctx,
    add,
    remove,
    render,
  }
}
