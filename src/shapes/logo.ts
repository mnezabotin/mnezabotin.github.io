import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Logo = (): Render => {
  const { ctx: mainCtx } = useWebcore()

  return (ctx = mainCtx) => {
    ctx.arc(0, 0, 0, 0, 0)
  }
}