import { useFond, useLogoButton, usePlayButton, usePopEffect, useScoreButton, useSoundButton } from '@/hooks'
import { useWebcore } from '@/webcore'
import { intersectArc } from '@/webcore/intersect'
import type { Render } from '@/webcore/types'

export const Main = (): Render => {
  const { addEventResize, rand, useScreenMeta, sdk } = useWebcore()
  const { from } = useScreenMeta()

  if (from === 'opening') {
    sdk.ready()
  } else if (from === 'game') {
    sdk.gameplayStop()
    sdk.showFullscreenAdv()
  }

  const { popEffect, render: renderPopEffects } = usePopEffect()

  // '#C69FEE', '#7ceab2', '#fd8059', '#EFCD74'
  const palette = ['#00dcfe', '#5bb2f7', '#92E6E6']
  const color = from === 'opening' ? palette[0] : palette[rand(palette.length - 1)]

  const { render: fond, setIntersections } = useFond({ color })

  const { render: logo, point: useLogoPoint } = useLogoButton({ popEffect })
  const { render: play, point: usePlayPoint } = usePlayButton({ popEffect })
  const { render: score, point: useScorePoint } = useScoreButton({ popEffect })
  const { render: sound, point: useSoundPoint } = useSoundButton({ popEffect })

  addEventResize(() => {
    const scorePoint = useScorePoint()
    const logoPoint = useLogoPoint()
    const playPoint = usePlayPoint()
    const soundPoint = useSoundPoint()

    setIntersections((x, y, r) =>
      !intersectArc({ x, y, r }, scorePoint) &&
      !intersectArc({ x, y, r }, logoPoint) &&
      !intersectArc({ x, y, r }, playPoint) &&
      !intersectArc({ x, y, r }, soundPoint)
    )
  })

  return () => {
    renderPopEffects()
    fond()
    logo()
    play()
    score()
    sound()
  }
}
