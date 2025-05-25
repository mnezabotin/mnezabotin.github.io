import { Props as PptProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

const RANGE = 100 / 2

type PopEffect = {
  popEffect: (p: PptProps) => void
  render: Render
}

export const usePopEffect = (): PopEffect => {
  const {
    loop,
    ctx,
    shade
  } = useWebcore()

  const effects: Record<string, {
    withoutRad: boolean
    tic: number
    dir: number
    popit: PptProps
    origR: number
  }> = { }

  const loopEffects = () => {
    for (const key in effects) {
      const e = effects[key]
      if (!e) {
        return
      }

      const p = e.popit

      e.tic += RANGE / 5

      if (e.tic >= RANGE) {
        e.dir = -1
      }

      if (!e.withoutRad) {
        p.r = e.origR + (e.origR * 0.00075 * (e.tic + (e.dir > 0 ? 0 : RANGE - e.tic)))
      }

      if (e.tic >= 2 * RANGE) {
        delete effects[key]
        p.r = e.origR
      }
    }
  }

  const popEffect = (p: PptProps, withoutRad = false) => {
    const key = new Date().valueOf().toString()

    const tic = 1
    const dir = 1
  
    effects[key] = { withoutRad, tic, dir, popit: p, origR: p.r }
  }

  const render = () => {
    ctx.globalAlpha = 0.25
    for (const k in effects) {
      const e = effects[k]
      const p = e.popit

      ctx.fillStyle = shade(p.c || 'red', -12)
      ctx.beginPath()
      ctx.arc(
        p.x,
        p.y,
        p.r + (e.origR * 0.001 * (e.tic + (e.dir > 0 ? 0 : RANGE - e.tic))),
        0,
        Math.PI * 2
      )
      ctx.closePath()
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  loop(loopEffects)

  return {
    popEffect,
    render
  }
}
