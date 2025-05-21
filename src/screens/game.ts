import { usePopits, useGradient, useGameplay } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  const palette = useGradient()
  const { popits, render: renderPopits } = usePopits({ palette })
  useGameplay(popits)

  return () => {
    renderPopits()
  }
}
