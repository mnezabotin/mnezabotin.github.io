import { usePopEffect, usePopits, useStorage, useSoundEffect } from '@/hooks'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

export const Gameover = (): Render => {
  const { setBackground, sdk } = useWebcore()

  sdk.gameplayStop()

  const palette = '#ff6347'

  const { popEffect, render: renderPopEffects } = usePopEffect()
  const { minusDifficulty } = useStorage()

  const { render: popits } = usePopits({ palette, retry: true, popEffect })

  const { playFail } = useSoundEffect()

  setBackground(palette)

  minusDifficulty()

  playFail()

  return () => {
    renderPopEffects()
    popits()
  }
}
