import type { Random } from '@/webcore/types'

const PREV_MAX_INT = 2147483646
const MAX_INT = 2147483647
const DIVIDER_INT = 16807

export const useRandChain = (seed = Math.floor(Math.random() * MAX_INT)): Random => {
  seed = seed % MAX_INT
  if (seed <= 0) {
    seed += PREV_MAX_INT
  }

  const nextInt = (): number => {
    seed = seed * DIVIDER_INT % MAX_INT

    return seed
  }

  const nextFloat = (): number => {
    const num = (nextInt() - 1) / PREV_MAX_INT

    return num
  }

  const nextRand = (min: number, max?: number): number => {
    if (max === undefined) {
      max = min
      min = 0
    }

    return Math.floor(nextFloat() * (max - min + 1)) + min
  }

  return nextRand
}

export const rand = (min: number, max?: number): number => {
  if (max === undefined) {
    max = min
    min = 0
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}
