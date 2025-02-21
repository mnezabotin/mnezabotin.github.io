import { useBack, useFond, useGradient, useProgress } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Score = (): Render => {
  const { render: fond } = useFond('#ffeb3b')
  // useGradient()
  const progress = useProgress()
  const back = useBack()

  return () => {
    fond()
    progress()
    back()
  }
}
