import { useWebcore } from '@/webcore'

const popEffects = [
  '/sounds/pop1.mp3',
  '/sounds/pop2.mp3',
  '/sounds/pop3.mp3',
  '/sounds/pop4.mp3',
  '/sounds/pop5.mp3',
  '/sounds/pop6.mp3',
  // '/sounds/pop7.mp3',
  '/sounds/pop8.mp3',
  '/sounds/pop9.mp3',
  '/sounds/pop10.mp3',
  '/sounds/pop11.mp3',
  '/sounds/pop12.mp3',
  '/sounds/pop13.mp3',
  '/sounds/pop14.mp3',
  '/sounds/pop15.mp3',
]

let activePopEffects: string[] = [...popEffects]

type SoundEffect = {
  playPop: () => void
  playMissed: () => void
  playFail: () => void
  playWin: () => void
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

  const playMissed = () => {
    const url = '/sounds/pop7.mp3'

    playSound(url)
  }

  const playFail = () => {
    const url = '/sounds/fail.mp3'

    playSound(url)
  }

  const playWin = () => {
    const url = '/sounds/win.mp3'

    playSound(url)
  }

  return {
    playPop,
    playMissed,
    playFail,
    playWin
  }
}
