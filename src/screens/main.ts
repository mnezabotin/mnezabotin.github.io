import { useFond, useLogo, usePlayButton, useScoreButton } from '@/hooks'
import { useWebcore } from '@/webcore'
import { intersectArc } from '@/webcore/intersect'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const { addEventResize } = useWebcore()

  const { render: fond, setIntersections } = useFond({})

  const { render: logo, point: useLogoPoint } = useLogo()
  const { render: play, point: usePlayPoint } = usePlayButton({
    getX: (x, s, m) => x + Math.round(s * 0.25) + 2 * m,
    getY: (y, s, m) => y + Math.round(s * 0.25) + 0 * m
  })
  const { render: score, point: useScorePoint } = useScoreButton()

  addEventResize(() => {
    const scorePoint = useScorePoint()
    const logoPoint = useLogoPoint()
    const playPoint = usePlayPoint()
    setIntersections((x, y, r) =>
      !intersectArc({ x, y, r }, scorePoint) &&
      !intersectArc({ x, y, r }, logoPoint) &&
      !intersectArc({ x, y, r }, playPoint)
    )
  })

  return () => {
    fond()
    logo()
    play()
    score()
  }
}
