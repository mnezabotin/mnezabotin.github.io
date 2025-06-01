import { useWebcore } from '@/webcore'

const popEffects = [
  '/sounds/pop1.mp3',
  '/sounds/pop2.mp3',
  '/sounds/pop3.mp3',
  '/sounds/pop4.mp3',
  '/sounds/pop5.mp3',
  // '/sounds/pop6.mp3',
]

let activePopEffects: string[] = [...popEffects]

type SoundEffect = {
  playPop: () => void
}

export const useSoundEffect = (): SoundEffect => {
  const { rand, playSound } = useWebcore()

  const playPop = () => {
    const randInd = rand(activePopEffects.length - 1)
    const popEffect = activePopEffects[randInd]

    activePopEffects.splice(randInd, 1)

    if (!activePopEffects.length) {
      activePopEffects = [...popEffects]
    }

    const randInd2 = rand(activePopEffects.length - 1)

    activePopEffects = [
      ...activePopEffects.splice(
        randInd2,
        activePopEffects.length
      ),
      ...activePopEffects
    ]

    playSound(popEffect)
  }

  return {
    playPop
  }
}
