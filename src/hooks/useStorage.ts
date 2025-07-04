const APP_KEY = 'ylp'

const SCORE_KEY = 'score'
const DIFFICULTY_LVL_KEY = 'difficulty'
const SOUND_KEY = 'sound'

const DIFFICULTY_PPT_RAD = [0.14, 0.11, 0.09, 0.075]

const TIC_MAX = 750
const TIC_MIN = 350
const TIC_STEP = 10
const DIFFICULTY_LVL_TICS: number[] = []

for (let i = 0; i * TIC_STEP <= TIC_MAX - TIC_MIN; i++) {
  DIFFICULTY_LVL_TICS.push(TIC_MAX - i * TIC_STEP)
}

let isSoundOn: boolean | null = null

type Storage = {
  getScore: () => number
  addScore: (value: number) => void

  plusDifficulty: () => void
  minusDifficulty: () => void

  getDifficultyRad: () => number
  getDifficultyTic: () => number

  resetDifficulty: () => void

  getSound: () => boolean
  setSound: (value: boolean) => void
}

export const useStorage = (): Storage => {
  const getValue = (key: string) => localStorage.getItem(`${APP_KEY}_${key}`)
  const setValue = (key: string, value: string | number | boolean) => localStorage.setItem(`${APP_KEY}_${key}`, value.toString())

  const getScore = (): number => +(getValue(SCORE_KEY) || 0)

  const setScore = (score: number) => setValue(SCORE_KEY, score)

  const addScore = (score: number) => {
    const allScore = getScore()

    setScore(allScore + score)
  }

  const getDifficulty = (): number => {
    const value = getValue(DIFFICULTY_LVL_KEY) || 0 // DIFFICULTY_LVL_TICS.length

    return +value
  }

  const setDifficulty = (lvl: number) => {
    const d = getDifficulty()

    setValue(
      DIFFICULTY_LVL_KEY,
      Math.min(
        Math.max(d + lvl, 0),
        DIFFICULTY_PPT_RAD.length * DIFFICULTY_LVL_TICS.length - 1
      )
    )
  }

  const plusDifficulty = () => setDifficulty(1)
  const minusDifficulty = () => setDifficulty(-5)
  const resetDifficulty = () => setValue(DIFFICULTY_LVL_KEY, 0)

  const getDifficultyRad = (): number => {
    const d = getDifficulty()
    const i = Math.floor(d / DIFFICULTY_LVL_TICS.length)

    return DIFFICULTY_PPT_RAD[i] || DIFFICULTY_PPT_RAD[1]
  }

  const getDifficultyTic = (): number => {
    const d = getDifficulty()
    const w = Math.floor(d / DIFFICULTY_LVL_TICS.length)

    const i = d - w * DIFFICULTY_LVL_TICS.length

    return DIFFICULTY_LVL_TICS[i] ||
      DIFFICULTY_LVL_TICS[0]
  }

  const getSound = (): boolean => {
    if (isSoundOn !== null) {
      return isSoundOn
    }

    const value = getValue(SOUND_KEY)
    if (!value || value === 'true') {
      isSoundOn = true
      return true
    } else {
      isSoundOn = false
      return false
    }
  }

  const setSound = (state: boolean) => {
    isSoundOn = state
    setValue(SOUND_KEY, state)
  }

  return {
    getScore,
    addScore,

    plusDifficulty,
    minusDifficulty,

    getDifficultyRad,
    getDifficultyTic,

    resetDifficulty,

    getSound,
    setSound,
  }
}
