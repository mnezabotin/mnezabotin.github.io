import { Progress } from '@/shapes/progress'
import { useWebcore } from '@/webcore'
import { rand } from '@/webcore/random'
import { Point, Render } from '@/webcore/types'

type Progress = {
  render: Render
  point: () => Point
}

export const useProgress = (): Progress => {
  const {
    addEventResize,
    useMeasure,
  } = useWebcore()
  
  let progressTabs: Render[]

  addEventResize(() => {
    const { cx, cy, s } = useMeasure()

    progressTabs = []

    const origImgs = ['/cat.png', '/city.png', '/man.png']
    const r = s * 0.35
    const mr = s * 0.05

    for (let i = 0; i < origImgs.length; i++) {
      const imgSrc = origImgs[i]
      const score = rand(10000)
      progressTabs.push(
        Progress({
          x: cx,
          y: cy - r * 2 - mr + i * r * 2 + i * mr,
          r,
          score,
          imgSrc
        })
      )
    }
  })

  const render = () => {
    progressTabs?.forEach(p => p())
  }

  const point = () => {
    const { cx, cy } = useMeasure()

    return {
      x: cx,
      y: cy,
      r: 0
    }
  }

  return {
    render,
    point
  }
}
