import { useBack, useFond, useProgress } from '@/hooks'
import { useWebcore } from '@/webcore'
import { intersectArc, intersectRect } from '@/webcore/intersect'
import type { Render } from '@/webcore/types'

export const Score = (): Render => {
  const { addEventResize } = useWebcore()
  const { render: fond, setIntersections } = useFond('#ffeb3b')

  const { render: progress, point: useProgressPoint } = useProgress()
  const { render: back, point: useBackPoint } = useBack()

  addEventResize(() => {
    const backPoint = useBackPoint()
    const progressPoint = useProgressPoint()
    setIntersections((x, y, r) =>
      !intersectArc({ x, y, r }, backPoint) &&
      !intersectRect({ x, y, r }, progressPoint)
    )
  })

  return () => {
    fond()
    progress()
    back()
  }
}
