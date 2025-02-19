import { useFond, useLogo, usePlay, useScore } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const { render: fond } = useFond()
  const logo = useLogo()
  const play = usePlay()
  const score = useScore()

  return () => {
    fond()
    logo()
    play()
    score()
  }
}
