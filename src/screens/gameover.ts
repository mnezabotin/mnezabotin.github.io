import { usePopEffect, usePopits, useStorage } from "@/hooks";
import { useWebcore } from "@/webcore";
import { Render } from "@/webcore/types";

export const Gameover = (): Render => {
  const palette = '#ff6347'

  const { popEffect, render: renderPopEffects } = usePopEffect()
  const { setBackground } = useWebcore()
  const { minusDifficulty } = useStorage()

  const { render: popits } = usePopits({ palette, retry: true, popEffect })

  setBackground(palette)

  minusDifficulty()

  return () => {
    renderPopEffects()
    popits()
  }
}
