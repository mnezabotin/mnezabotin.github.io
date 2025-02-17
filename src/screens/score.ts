import { useFond, useScore } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Score = (): Render => {
  const fond = useFond('#ffeb3b')
  const progress = useScore()

  return () => {
    fond()
    progress()
  }
}
