import { useGradient, useScore } from "@/hooks"
import { Render } from "@/webcore/types"

export const GameScore = (): Render => {
  useGradient()
  const { render: score } = useScore()

  return () => {
    score()
  }
}
