import { useBackButton, useFond, useScore, useNextButton, usePrevButton, usePopEffect } from '@/hooks'
import { useWebcore } from '@/webcore'
import { intersectArc, intersectRect } from '@/webcore/intersect'
import type { Render } from '@/webcore/types'

export const Score = (): Render => {
  const { addEventResize, rand } = useWebcore()

  const { popEffect, render: renderPopEffects } = usePopEffect()

  const palette = ['#ffeb3b', '#C69FEE', '#5bb2f7', '#92E6E6', '#7ceab2', '#bef181', '#EFCD74']
  const color = palette[rand(palette.length - 1)]

  const { render: fond, setIntersections } = useFond({ color, frequency: 10 })

  const {
    render: progress,
    rect: useProgressRect,
    up: onUp,
    down: onDown
  } = useScore()
  const {
    render: back,
    point: useBackPoint
  } = useBackButton({ popEffect })
  const {
    render: next,
    point: useDownPoint
  } = useNextButton(onUp)
  const {
    render: prev,
    point: useUpPoint
  } = usePrevButton(onDown)

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
    renderPopEffects()
    fond()
    progress()
    back()
    next()
    prev()
  }
}
