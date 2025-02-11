import { useFond, useLogo, usePlay } from '@/hooks'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const fond = useFond()
  const logo = useLogo()
  const play = usePlay()

  return () => {
    fond()
    logo()
    play()
  }
}
