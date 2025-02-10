import { usePopits } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  const popits = usePopits()

  return () => {
    popits()
  }
}
