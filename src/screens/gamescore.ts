import { useGradient, usePlayButton, usePauseButton, useScore, useStorage } from "@/hooks"
import { useWebcore } from "@/webcore"
import { Render } from "@/webcore/types"

export const GameScore = (): Render => {
  const { translate } = useWebcore()
  const { plusDifficulty } = useStorage()

  useGradient()

  const { render: score } = useScore()

  const { render: play } = usePlayButton({
    getX: (x, s, m) => innerWidth > innerHeight ?
      Math.min(x + (s - 2 * s * 0.055 * 1.6) / 2 + 4 * m + Math.round(s * 0.1), innerWidth - 2 * m - Math.round(s * 0.1)) :
      x + (s - 2 * s * 0.055 * 1.6) / 8 + 0 *  Math.round(s * 0.1) + 2 * m,
    getY: (y, s, m) => innerWidth > innerHeight ?
      y + (s - 2 * s * 0.055 * 1.6) / 2 + 0 * m - Math.round(s * 0.1) :
      Math.min(y + (s - 2 * s * 0.055 * 1.6) / 2 + 4 * m + Math.round(s * 0.1), innerHeight - 2 * m - Math.round(s * 0.1))
  })

  const { render: pause } = usePauseButton({
    getX: (x, s, m) => innerWidth > innerHeight ?
      Math.max(x - (s - 2 * s * 0.055 * 1.6) / 2 - 4 * m - Math.round(s * 0.1), 2 * m + Math.round(s * 0.1)) :
      x + (s - 2 * s * 0.055 * 1.6) / 8 - 2 * Math.round(s * 0.1) - 2 * m,
    getY: (y, s, m) => innerWidth > innerHeight ?
      y - (s - 2 * s * 0.055 * 1.6) / 2 + 0 * m + Math.round(s * 0.1) :
      Math.min(y + (s - 2 * s * 0.055 * 1.6) / 2 + 4 * m + Math.round(s * 0.1), innerHeight - 2 * m - Math.round(s * 0.1))
  })

  plusDifficulty()

  return () => {
    if (innerHeight > innerWidth) {
      translate(score, 0, -Math.round(innerHeight * 0.07))
    } else {
      score()
    }

    play()
    pause()
  }
}
