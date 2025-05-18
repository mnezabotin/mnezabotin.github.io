import { useBack, useFond, useProgress, useDown, useUp } from '@/hooks'
import { useWebcore } from '@/webcore'
import { intersectArc, intersectRect } from '@/webcore/intersect'
import type { Render } from '@/webcore/types'

export const Score = (): Render => {
  const { addEventResize } = useWebcore()

  const { render: fond, setIntersections } = useFond('#ffeb3b')

  const {
    render: progress,
    rect: useProgressRect,
    up: onUp,
    down: onDown
  } = useProgress()
  const {
    render: back,
    point: useBackPoint
  } = useBack()
  const {
    // render: down,
    point: useDownPoint
  } = useDown(onUp)
  const {
    // render: up,
    point: useUpPoint
  } = useUp(onDown)

  addEventResize(() => {
    const backPoint = useBackPoint()
    const progressRect = useProgressRect()
    const downPoint = useDownPoint()
    const upPoint = useUpPoint()
    setIntersections((x, y, r) =>
      !intersectArc({ x, y, r }, backPoint) &&
      !intersectRect({ x, y, r }, progressRect) &&
      !intersectArc({ x, y, r }, downPoint) &&
      !intersectArc({ x, y, r }, upPoint)
    )
  })

  return () => {
    fond()
    progress()
    back()
    // down()
    // up()
  }
}
