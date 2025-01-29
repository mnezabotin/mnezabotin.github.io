import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export function Opening(): Render {
  const { ctx } = useWebcore()
  return () => {
    ctx.fillStyle = 'red'
    ctx.rect(0, 0, 150, 150)
    ctx.fill()
  }
}
