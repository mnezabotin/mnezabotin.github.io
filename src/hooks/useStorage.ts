const APP_KEY = 'ylp'

const SCORE_KEY = 'score'

const DIFFICULTY_LVL_KEY = 'difficulty'
const DIFFICULTY_LVL_TICS = [1000, 800, 500, 350, 250]
const DIFFICULTY_PPT_RAD = [0.15, 0.14, 0.11, 0.09]

type Storage = {
  getScore: () => number
  addScore: (value: number) => void

  plusDifficulty: () => void
  minusDifficulty: () => void

  getDifficultyRad: () => number
  getDifficultyTic: () => number
}

export const useStorage = (): Storage => {
  const getValue = (key: string) => localStorage.getItem(`${APP_KEY}_${key}`)
  const setValue = (key: string, value: string | number) => localStorage.setItem(`${APP_KEY}_${key}`, value.toString())

  const getScore = (): number => +(getValue(SCORE_KEY) || 0)

  const setScore = (score: number) => setValue(SCORE_KEY, score)

  const addScore = (score: number) => {
    const allScore = getScore()

    setScore(allScore + score)
  }

  const getDifficulty = (): number => {
    const value = getValue(DIFFICULTY_LVL_KEY) || 5

    return +value
  }

  const setDifficulty = (lvl: number) => {
    const d = getDifficulty()

    setValue(
      DIFFICULTY_LVL_KEY,
      Math.min(
        Math.max(d + lvl, 0),
        19
      )
    )
  }

  const plusDifficulty = () => setDifficulty(1)
  const minusDifficulty = () => setDifficulty(-1)

  const getDifficultyRad = (): number => {
    const d = getDifficulty()
    const i = Math.floor(d / 5)

    return DIFFICULTY_PPT_RAD[i] || DIFFICULTY_PPT_RAD[1]
  }

  const getDifficultyTic = (): number => {
    const d = getDifficulty()
    const w = Math.floor(d / 5)

    const i = d - w * 5

    return DIFFICULTY_LVL_TICS[i] ||
      DIFFICULTY_LVL_TICS[0]
  }

  return {
    getScore,
    addScore,

    plusDifficulty,
    minusDifficulty,

    getDifficultyRad,
    getDifficultyTic,
  }
}
