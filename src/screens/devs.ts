import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export function Devs(): Render {
  const { ctx, loop, addEventResize } = useWebcore()
  const point = { x: 40, y: 100}
  let dx = 1
  let dy = 1
  let w: number
  const resize = () => {
    w = 5 * Math.ceil(
      Math.sqrt(
          innerWidth * innerWidth + innerHeight * innerHeight
      ) / 144
    )
  }
  resize()
  addEventResize(resize)
  loop(() => {
    point.x += 11 * dx
    point.y += 13 * dy
    if (point.x <= 0 || point.x + w >= innerWidth) {
      dx *= -1
    }
    if (point.y <= 0 || point.y + w >= innerHeight) {
      dy *= -1
    }

  })
  return () => {
    ctx.beginPath()
    ctx.fillStyle = 'green'
    ctx.rect(point.x, point.y, w, w)
    ctx.fill()
  }
}
