import { usePopits, useGradient, useGameplay, usePopEffect, useSplashEffect } from '@/hooks'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  const { useMeasure } = useWebcore()
  const palette = useGradient()
  const { popEffect, render: renderPopEffects } = usePopEffect()
  const { popits, render: renderPopits } = usePopits({ palette, popEffect })

  const pt = (popits[0].y - popits[0].r) / useMeasure().m

  const { splashEffect, render: renderSplashEffects } = useSplashEffect({ mfs: pt, dy: pt })
  useGameplay({ popits, popEffect, splashEffect })

  return () => {
    renderPopEffects()
    renderPopits()
    renderSplashEffects()
  }
}
