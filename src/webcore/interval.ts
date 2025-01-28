import type { Interval } from '@/webcore/types'

export function Interval(): Interval {
  const animation = requestAnimationFrame || ((func) => setTimeout(func, 1000 / 60))

  const keys: Record<string, () => void> = {}

  const loop = (key: string, callback: () => void) => {
    if (keys[key]) {
      throw new Error(`Loop ${key} already specified`)
    }

    keys[key] = callback
    const tic = () => {
      callback()
      if (!keys[key]) return
      animation(tic)
    }
    tic()
  }

  const stop = (key: string) => {
    delete keys[key]
  }

  return {
    loop,
    stop,
  }
}
