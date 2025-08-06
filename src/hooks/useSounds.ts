import { useWebcore } from '@/webcore'
import { useStorage } from './useStorage'

const POP_EFFECTS = [
  './sounds/pop/pop1.mp3',
  './sounds/pop/pop2.mp3',
  './sounds/pop/pop3.mp3',
  './sounds/pop/pop4.mp3',
  './sounds/pop/pop5.mp3',
  './sounds/pop/pop6.mp3',
  './sounds/pop/pop7.mp3',
  './sounds/pop/pop8.mp3',
  './sounds/pop/pop9.mp3',
  './sounds/pop/pop10.mp3',
  './sounds/pop/pop11.mp3',
  './sounds/pop/pop12.mp3',
  './sounds/pop/pop13.mp3',
  './sounds/pop/pop14.mp3',
  './sounds/pop/pop15.mp3',
  './sounds/pop/pop16.mp3',
  './sounds/pop/pop17.mp3',
  './sounds/pop/pop18.mp3',
  './sounds/pop/pop19.mp3',
  './sounds/pop/pop20.mp3',
  './sounds/pop/pop21.mp3',
  './sounds/pop/pop22.mp3',
  './sounds/pop/pop23.mp3',
  './sounds/pop/pop24.mp3',
]
const WRONG_EFFECT = './sounds/wrong.mp3'
const FAIL_EFFECT = './sounds/fail.mp3'
const WIN_EFFECT = './sounds/win.mp3'
const COMPLETE_EFFECT = './sounds/complete.mp3'

export const sounds = [
  ...POP_EFFECTS,
  WRONG_EFFECT,
  FAIL_EFFECT,
  WIN_EFFECT,
  COMPLETE_EFFECT,
]

let activePopEffects: string[] = [...POP_EFFECTS]

type Sounds = {
  playPop: () => void
  playMissed: () => void
  playFail: () => void
  playWin: () => void
  playComplete: () => void
}

export const useSounds = (): Sounds => {
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
      activePopEffects = [...POP_EFFECTS]
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

    const url = WRONG_EFFECT

    playSound(url)
  }

  const playFail = () => {
    if (!getSound()) {
      return
    }

    const url = FAIL_EFFECT

    playSound(url)
  }

  const playWin = () => {
    if (!getSound()) {
      return
    }

    const url = WIN_EFFECT

    playSound(url)
  }

  const playComplete = () => {
    if (!getSound()) {
      return
    }

    const url = COMPLETE_EFFECT

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
