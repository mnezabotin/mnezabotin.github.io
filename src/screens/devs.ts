import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export function Devs(): Render {
  const { ctx, addEventResize, loop } = useWebcore()
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
    point.x += 2 * dx
    point.y += 3 * dy
    dx *= -1
    dy *= -1
  })
  return () => {
    ctx.save();
    var dx = Math.random() * 2;
    var dy = Math.random() * 3;
    ctx.translate(dx, dy);  
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.rect(point.x, point.y, w, w)
    ctx.fill()
    ctx.restore();
  }
}
