import { usePopits, useGradient, useGameplay, useScore } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Game = (): Render => {
  const palette = ['#f86a9a', '#C69FEE', '#5bb2f7', '#92E6E6', '#7ceab2', '#bef181', '#EFCD74', '#fd8059']

  const { popits, render: renderPopits, pausePopit } = usePopits(palette)
  useGradient(palette)
  const gameplay = useGameplay(popits, pausePopit, palette)
  const { render: renderScore } = useScore()

  return () => {
    if (gameplay.state !== 'results') {
      renderPopits()
    }

    if (gameplay.state === 'results') {
      renderScore()
    }
  }
}
