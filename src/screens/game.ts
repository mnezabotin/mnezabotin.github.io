import { usePopits, useGradient, useGameplay } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  const { popits, render: renderPopits } = usePopits()
  useGameplay(popits)
  useGradient()

  return () => {
    renderPopits()
  }
}
