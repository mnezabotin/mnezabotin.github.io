import { useWebcore } from '@/webcore'

let popEffects = [
  '/sounds/pop1.mp3',
  // '/sounds/pop2.mp3',
  // '/sounds/pop3.mp3',
  '/sounds/pop4.mp3',
  '/sounds/pop5.mp3',
  // '/sounds/pop6.mp3',
]

type SoundEffect = {
  playPop: () => void
}

export const useSoundEffect = (): SoundEffect => {
  const { rand, playSound } = useWebcore()

  const playPop = () => {
    const randInd = rand(popEffects.length - 1)
    const popEffect = popEffects[randInd]

    popEffects = [
      ...popEffects.splice(
        randInd,
        popEffects.length
      ),
      ...popEffects
    ]

    playSound(popEffect)
  }

  return {
    playPop
  }
}
