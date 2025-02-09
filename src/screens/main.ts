import { useLogo, usePlay } from '@/hooks'
import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const { setBackground } = useWebcore()

  setBackground('#00dcfe')

  const logo = useLogo()
  const play = usePlay()

  return () => {
    logo()
    play()
  }
}
