import { usePopits, useGradient, useGameplay, usePopEffect } from '@/hooks'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  const { useMeasure, addEventResize } = useWebcore()
  const palette = useGradient()
  const { popEffect, render: renderPopEffects } = usePopEffect()
  const { popits, render: renderPopits, pausePpt } = usePopits({ palette, popEffect })

  const splashPorps = { mfs: 0, dy: 0 }

  // const { splashEffect, render: renderSplashEffects } = useSplashEffect(splashPorps)
  useGameplay({ popits, popEffect, pausePpt })

  addEventResize(() => {
    const pt = (popits[0].y - popits[0].r) / useMeasure().m
    splashPorps.mfs = pt
    splashPorps.dy = pt
  })

  return () => {
    renderPopEffects()
    renderPopits()
    // renderSplashEffects()
  }
}
