import type { Interval } from '@/webcore/types'

export const useInterval = (): Interval => {
  const animation = requestAnimationFrame || ((func) => setTimeout(func, 1000 / 60))

  const keys: string[] = []
  const loops: Record<string, Function> = {}

  const loop = (
    func: Function,
    key?: string
  ) => {
    if (
      Object.entries(loops).find(([_, f]) => f === func) ||
      (key && loops[key])
    ) {
      throw new Error(`Loop${key ? ' ' + key : ''} already specified`)
    }

    if (key) {
      keys.push(key)
    }
    
    key = key || new Date().valueOf().toString()
    loops[key] = func
    const tic = () => {
      func()
      if (!loops[key]) return
      animation(tic)
    }
    tic()
  }

  const stop = (key: string | Function) => {
    if (typeof key === 'string') {
      delete loops[key]
    } else {
      const f = Object.entries(loops).find(([_, f]) => f === key)
      if (f) {
        delete loops[f[0]]
      }
    }
  }

  const stopAll = () => {
    for (const key in loops) {
      if (keys.indexOf(key) === -1) {
        delete loops[key]
      }
    }
  }

  return {
    loop,
    stop,
    stopAll,
  }
}
