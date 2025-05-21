import { useGradient, useScore, useStorage } from "@/hooks"
import { useWebcore } from "@/webcore"
import { Render } from "@/webcore/types"

export const GameScore = (): Render => {
  const { addEventClick, navigate } = useWebcore()
  const { plusDifficulty } = useStorage()

  plusDifficulty()
  useGradient()
  const { render: score } = useScore()

  addEventClick(() => {
    navigate('game')
  })

  return () => {
    score()
  }
}
