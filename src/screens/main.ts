import { useFond, useLogo, usePlay } from '@/hooks'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const { setBackground } = useWebcore()

  setBackground('#00dcfe')

  const fond = useFond()
  const logo = useLogo()
  const play = usePlay()

  return () => {
    fond()
    logo()
    play()
  }
}
