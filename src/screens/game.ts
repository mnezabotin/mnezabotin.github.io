import { usePopits, useGradient, useGameplay, usePopEffect } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  const palette = useGradient()
  const { popEffect, render: renderPopEffects } = usePopEffect()
  const { popits, render: renderPopits } = usePopits({ palette })
  useGameplay({ popits, popEffect })

  return () => {
    renderPopEffects()
    renderPopits()
  }
}
