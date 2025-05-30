import { Progress } from '@/shapes/progress'
import { useWebcore } from '@/webcore'
import type { Rectangle, Render } from '@/webcore/types'
import { useStorage } from './useStorage'

const MAX_IMG_POINTS = 10000

type Score = {
  up: () => void
  down: () => void
  render: Render
  rect: () => Rectangle
}

export const useScore = (winScore = 0, isOne = false): Score => {
  const {
    addEventResize,
    useMeasure,
    translate,
  } = useWebcore()

  const { getScore } = useStorage()

  const origImgs = [
    '/media/levels/cat.png',
    '/media/levels/city.png',
    '/media/levels/donut.png',
    '/media/levels/girl.png',
    '/media/levels/max.png',
  ]

  const score = getScore()
  
  let progressTabs: Render[]
  let pgsRad = 0
  let margin = 0

  let curInd = Math.min(
    Math.floor(score / MAX_IMG_POINTS),
    origImgs.length - 1
  )

  addEventResize(() => {
    const { cx, cy, s, isL } = useMeasure()

    progressTabs = []

    pgsRad = (s - 2 * s * 0.055 * 1.6) / 2
    margin = s * 0.05

    let i = isOne ? curInd : 0
    for (i; i < (isOne ? curInd + 1 : origImgs.length); i++) {
      const imgSrc = origImgs[i]

      const x = isL
        ? cx
        : cx + i * pgsRad * 2 + i * margin
      const y = isL
        ? cy + i * pgsRad * 2 + i * margin
        : cy

      progressTabs.push(
        Progress({
          x,
          y,
          r: pgsRad,
          score: Math.min(score - i * MAX_IMG_POINTS, 10000),
          imgSrc,
          winScore,
        })
      )
    }
  })

  const render = () => {
    const { isL } = useMeasure()
    const x = isL ? 0 : -(curInd * pgsRad * 2 + curInd * margin)
    const y = isL ? -(curInd * pgsRad * 2 + curInd * margin) : 0

    translate(() => {
      progressTabs?.forEach(p => p())
    }, x, y)
  }

  const rect = () => {
    const { cx, cy } = useMeasure()

    const isLandscape = innerWidth > innerHeight

    return {
      x: isLandscape ? cx - pgsRad : 0,
      y: isLandscape ? 0 : cy - pgsRad,
      w: isLandscape ? 2 * pgsRad : innerWidth,
      h: isLandscape ? innerHeight : 2 * pgsRad
    }
  }

  const up = () => {
    curInd = curInd + 1 < origImgs.length
      ? curInd + 1
      : origImgs.length - 1
  }

  const down = () => {
    curInd = curInd - 1 < 0
      ? 0
      : curInd - 1
  }

  return {
    up,
    down,
    render,
    rect
  }
}
