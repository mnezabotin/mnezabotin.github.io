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

export const useScore = (): Score => {
  const {
    addEventResize,
    useMeasure,
    translate,
  } = useWebcore()

  const { getScore } = useStorage()

  const origImgs = [
    '/media/cat.png',
  ]

  const score = getScore()
  
  let progressTabs: Render[]
  let pgsRad = 0
  let margin = 0

  let curInd = Math.floor(score / MAX_IMG_POINTS)

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    progressTabs = []

    pgsRad = (s - 2 * s * 0.055 * 1.6) / 2
    margin = s * 0.05

    for (let i = 0; i < origImgs.length; i++) {
      const imgSrc = origImgs[i]
      progressTabs.push(
        Progress({
          x: cx,
          y: cy + i * pgsRad * 2 + i * margin,
          r: pgsRad,
          score: score - i * MAX_IMG_POINTS < 0 ? 0 : score - i * MAX_IMG_POINTS,
          imgSrc
        })
      )
    }
  })

  const render = () => {
    translate(() => {
      progressTabs?.forEach(p => p())
    }, 0, -(curInd * pgsRad * 2 + curInd * margin))
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
