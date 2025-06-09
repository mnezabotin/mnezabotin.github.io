import {
  useGradient,
  usePlayButton,
  usePauseButton,
  useScore,
  useStorage,
  usePopEffect,
  useSoundEffect,
  useWinText,
} from "@/hooks"
import { useWebcore } from "@/webcore"
import { Render } from "@/webcore/types"

export const GameScore = (): Render => {
  const {
    useScreenMeta,
    // translate
  } = useWebcore()
  const { plusDifficulty, resetDifficulty } = useStorage()

  const { data } = useScreenMeta()

  const { popEffect, render: renderPopEffects } = usePopEffect()

  useGradient()

  const { playWin } = useSoundEffect()

  const { render: score, isJump } = useScore(data?.winScore, true)

  const { render: play } = usePlayButton({ popEffect })
  const { render: pause } = usePauseButton({ popEffect })

  const win = useWinText(isJump ? 'Complete' : 'You win')

  if (isJump) {
    resetDifficulty()
  } else {
    plusDifficulty()
  }

  playWin()

  return () => {
    renderPopEffects()
  
    // if (innerHeight > innerWidth) {
    //   translate(score, 0, -Math.round(innerHeight * 0.05))
    // } else {
      score()
    // }

    play()
    pause()

    win()
  }
}
