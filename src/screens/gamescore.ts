import { useGradient, useScore } from "@/hooks"
import { useWebcore } from "@/webcore"
import { Render } from "@/webcore/types"

export const GameScore = (): Render => {
  const { addEventClick, navigate } = useWebcore()

  useGradient()
  const { render: score } = useScore()

  addEventClick(() => {
    navigate('game')
  })

  return () => {
    score()
  }
}
