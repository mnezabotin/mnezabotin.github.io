import { usePopits, useGradient } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  useGradient()

  const popits = usePopits()

  return () => {
    popits()
  }
}
