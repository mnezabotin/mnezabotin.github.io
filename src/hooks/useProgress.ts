import { Progress } from '@/shapes/progress'
import { useWebcore } from '@/webcore'
// import { rand } from '@/webcore/random'
import { Rectangle, Render } from '@/webcore/types'

type Progress = {
  up: () => void
  down: () => void
  render: Render
  rect: () => Rectangle
}

export const useProgress = (): Progress => {
  const {
    addEventResize,
    useMeasure,
    translate,
  } = useWebcore()

  const origImgs = [
    '/cat.png',
    '/city.png',
    '/man.png',
    '/baba.png',
    '/donut.png',
    '/girl.png',
    '/home.png',
    '/iron.png',
    // '/irr.png',
    '/win.png',
    '/wolf.png',
  ]
  
  let progressTabs: Render[]
  let pgsRad = 0
  let margin = 0

  let curInd = 0

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    progressTabs = []

    pgsRad = (s - 2 * s * 0.055 * 1.6) / 2
    margin = s * 0.05

    for (let i = 0; i < origImgs.length; i++) {
      const imgSrc = origImgs[i]
      const score = 10000
      progressTabs.push(
        Progress({
          x: cx,
          y: cy + i * pgsRad * 2 + i * margin,
          r: pgsRad,
          score,
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
    const { cx } = useMeasure()

    return {
      x: cx - pgsRad,
      y: 0,
      w: 2 * pgsRad,
      h: innerHeight
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
