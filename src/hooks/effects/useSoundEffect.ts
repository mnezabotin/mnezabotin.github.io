import { useWebcore } from '@/webcore'
import { useStorage } from '../useStorage'

let popEffects = [
  '/sounds/pop/pop1.mp3',
  '/sounds/pop/pop2.mp3',
  '/sounds/pop/pop3.mp3',
  '/sounds/pop/pop4.mp3',
  '/sounds/pop/pop5.mp3',
  '/sounds/pop/pop6.mp3',
  '/sounds/pop/pop7.mp3',
  '/sounds/pop/pop8.mp3',
  '/sounds/pop/pop9.mp3',
  '/sounds/pop/pop10.mp3',
  '/sounds/pop/pop11.mp3',
  '/sounds/pop/pop12.mp3',
  '/sounds/pop/pop13.mp3',
  '/sounds/pop/pop14.mp3',
  '/sounds/pop/pop15.mp3',
  '/sounds/pop/pop16.mp3',
  '/sounds/pop/pop17.mp3',
  '/sounds/pop/pop18.mp3',
  '/sounds/pop/pop19.mp3',
  '/sounds/pop/pop20.mp3',
  '/sounds/pop/pop21.mp3',
  '/sounds/pop/pop22.mp3',
  '/sounds/pop/pop23.mp3',
  '/sounds/pop/pop24.mp3',
  // '/sounds/pop/pop25.mp3',
  // '/sounds/pop/pop26.mp3',
  // '/sounds/pop/pop27.mp3',
  // '/sounds/pop/pop28.mp3',
  // '/sounds/pop/pop29.mp3',
  // '/sounds/pop/pop30.mp3',
  // '/sounds/pop/pop31.mp3',
]

let activePopEffects: string[] = [...popEffects]

type SoundEffect = {
  playPop: () => void
  playMissed: () => void
  playFail: () => void
  playWin: () => void
  playComplete: () => void
}

export const useSoundEffect = (): SoundEffect => {
  const { rand, playSound } = useWebcore()

  const { getSound } = useStorage()

  const playPop = () => {
    if (!getSound()) {
      return
    }

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
    if (!getSound()) {
      return
    }

    const url = '/sounds/wrong.mp3'

    playSound(url)
  }

  const playFail = () => {
    if (!getSound()) {
      return
    }

    const url = '/sounds/fail.mp3'

    playSound(url)
  }

  const playWin = () => {
    if (!getSound()) {
      return
    }

    const url = '/sounds/win.mp3'

    playSound(url)
  }

  const playComplete = () => {
    if (!getSound()) {
      return
    }

    const url = '/sounds/complete.mp3'

    playSound(url)
  }

  return {
    playPop,
    playMissed,
    playFail,
    playWin,
    playComplete,
  }
}
