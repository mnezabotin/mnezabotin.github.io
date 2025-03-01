import { Timer } from '@/webcore/types'

let timerIds: number[] = []

export const stopTimers = () => {
  for (const id of timerIds) {
    clearTimeout(id)
  }
  timerIds = []
}

export const useTimer = (callback: Function, delay = 400): Timer => {
  let start: Date = new Date()
  let remaining = delay
  let id: number = setTimeout(callback, remaining)
  timerIds.push(id)

  const pause = () => {
    clearTimeout(id)
    const now: any  = new Date()
    const strt : any = start
    remaining -= now - strt
  }

  const resume = () => {
    start = new Date()
    clearTimeout(id)
    id = setTimeout(callback, remaining)
    timerIds.push(id)
  }

  const stop = () => {
    clearTimeout(id)
  }

  return {
    pause,
    resume,
    stop,
  }
}
