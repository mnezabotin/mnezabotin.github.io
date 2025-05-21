type Storage = {
  getScore: () => number
  setScore: (value: number) => void
  addScore: (value: number) => void
}

const APP_KEY = 'ylp'
const SCORE_KEY = 'score'

export const useStorage = (): Storage => {
  const getValue = (key: string) => localStorage.getItem(`${APP_KEY}_${key}`)
  const setValue = (key: string, value: string | number) => localStorage.setItem(`${APP_KEY}_${key}`, value.toString())

  const getScore = (): number => {
    const value = getValue(SCORE_KEY) || 0

    return +value
  }

  const setScore = (score: number) => setValue(SCORE_KEY, score)

  const addScore = (score: number) => {
    const allScore = getScore()

    setScore(allScore + score)
  }

  return {
    getScore,
    setScore,
    addScore,
  }
}
