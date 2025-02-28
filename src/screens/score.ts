import { useBack, useFond, useProgress, useDown, useUp } from '@/hooks'
import { useWebcore } from '@/webcore'
import { intersectArc, intersectRect } from '@/webcore/intersect'
import type { Render } from '@/webcore/types'

export const Score = (): Render => {
  const { addEventResize } = useWebcore()

  const { render: fond, setIntersections } = useFond('#ffeb3b')

  const { render: progress, point: useProgressPoint } = useProgress()
  const { render: back, point: useBackPoint } = useBack()
  const { render: down, point: useDownPoint } = useDown()
  const { render: up, point: useUpPoint } = useUp()

  addEventResize(() => {
    const backPoint = useBackPoint()
    const progressPoint = useProgressPoint()
    const downPoint = useDownPoint()
    const upPoint = useUpPoint()
    setIntersections((x, y, r) =>
      !intersectArc({ x, y, r }, backPoint) &&
      !intersectRect({ x, y, r }, progressPoint) &&
      !intersectRect({ x, y, r }, downPoint) &&
      !intersectRect({ x, y, r }, upPoint)
    )
  })

  return () => {
    fond()
    progress()
    back()
    down()
    up()
  }
}
