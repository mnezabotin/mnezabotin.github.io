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
import { useLang } from "@/lang"
import { useWebcore } from "@/webcore"
import { Render } from "@/webcore/types"

export const GameScore = (): Render => {
  const {
    useScreenMeta,
    useTimer,
    navigate,
    // translate
  } = useWebcore()
  const { plusDifficulty, resetDifficulty } = useStorage()

  const lang = useLang()

  const { data } = useScreenMeta()

  const { popEffect, render: renderPopEffects } = usePopEffect()

  useGradient()

  const { playWin, playComplete } = useSoundEffect()

  const { render: score, isJump, isCompleted } = useScore(data?.winScore, true)

  let play: Render
  let pause: Render
  if (!isCompleted) {
    const { render: playRender } = usePlayButton({ popEffect })
    const { render: pauseRender } = usePauseButton({ popEffect })
    play = playRender
    pause = pauseRender
  }

  const win = useWinText(
    isCompleted
      ? lang.theEnd
      : isJump
        ? lang.complete
        : lang.youWin
  )

  if (isJump || isCompleted) {
    resetDifficulty()
    playComplete()
  } else {
    plusDifficulty()
    playWin()
  }

  if (isCompleted) {
    useTimer(() => {
      navigate('devs')
    }, 5000)
  }

  return () => {
    renderPopEffects()
  
    // if (innerHeight > innerWidth) {
    //   translate(score, 0, -Math.round(innerHeight * 0.05))
    // } else {
      score()
    // }

    if (!isCompleted) {
      play()
      pause()
    }

    win()
  }
}
