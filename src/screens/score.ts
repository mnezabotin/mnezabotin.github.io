import { useFond, useProgress } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Score = (): Render => {
  const { render: fond } = useFond('#ffeb3b')
  const progress = useProgress()

  return () => {
    fond()
    progress()
  }
}
