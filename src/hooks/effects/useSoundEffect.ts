import { useWebcore } from '@/webcore'
import { useStorage } from '../useStorage'

const popEffects = [
  '/sounds/new/pop1.mp3',
  '/sounds/new/pop2.mp3',
  '/sounds/new/pop3.mp3',
  '/sounds/new/pop4.mp3',
  '/sounds/new/pop5.mp3',
  '/sounds/new/pop6.mp3',
  '/sounds/new/pop7.mp3',
  '/sounds/new/pop8.mp3',
  '/sounds/new/pop9.mp3',
  '/sounds/new/pop10.mp3',
  '/sounds/new/pop11.mp3',
  '/sounds/new/pop12.mp3',
  '/sounds/new/pop13.mp3',
  '/sounds/new/pop14.mp3',
  '/sounds/new/pop15.mp3',
  '/sounds/new/pop16.mp3',
  '/sounds/new/pop17.mp3',
  '/sounds/new/pop18.mp3',
  '/sounds/new/pop19.mp3',
  '/sounds/new/pop20.mp3',
  '/sounds/new/pop21.mp3',
  '/sounds/new/pop22.mp3',
  '/sounds/new/pop23.mp3',
  '/sounds/new/pop24.mp3',
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
    // console.log(popEffect)
  }

  const playMissed = () => {
    if (!getSound()) {
      return
    }

    const url = '/sounds/new/wrong.mp3'

    playSound(url)
  }

  const playFail = () => {
    if (!getSound()) {
      return
    }

    const url = '/sounds/fail-fast.mp3'

    playSound(url)
  }

  const playWin = () => {
    if (!getSound()) {
      return
    }

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
