import { useFond, useLogo, usePlayButton, useScoreButton } from '@/hooks'
import { useWebcore } from '@/webcore'
import { intersectArc } from '@/webcore/intersect'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const { addEventResize, rand, useScreenMeta } = useWebcore()
  const { from } = useScreenMeta()

  // '#C69FEE', '#7ceab2', '#fd8059'
  const palette = ['#00dcfe', '#5bb2f7', '#92E6E6', '#EFCD74']
  const color = from === 'opening' ? palette[0] : palette[rand(palette.length - 1)]

  const { render: fond, setIntersections } = useFond({ color })

  const { render: logo, point: useLogoPoint } = useLogo()
  const { render: play, point: usePlayPoint } = usePlayButton({
    getX: (x, s, m) => x + Math.round(s * 0.25) + 2 * m,
    getY: (y, s, m) => y + Math.round(s * 0.25) + 0 * m,
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
