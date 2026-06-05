import { Ticker } from 'pixi.js'
import type { Interval } from '@/webcore/types'

export const useTicker = (): Interval => {
  let tickers: Ticker[] = []

  const useLoop = (
    func: Function,
    minFPS = 60,
    maxFPS = 60
  ): Ticker => {
    const ticker = new Ticker()
    ticker.minFPS = minFPS
    ticker.maxFPS = maxFPS
    ticker.add(() => func())
    tickers.push(ticker)

    return ticker
  }

  const stopAll = () => {
    for (const t of tickers) {
      t.stop()
    }

    tickers = []
  }

  return {
    useLoop,
    stopAll,
  }
}
