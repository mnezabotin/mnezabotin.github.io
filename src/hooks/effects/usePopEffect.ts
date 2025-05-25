import { Props as PptProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

const RANGE = 250 / 2

type PopEffect = {
  popEffect: (p: PptProps) => void
  render: Render
}

export const usePopEffect = (): PopEffect => {
  const { loop, ctx, loopStop, shade } = useWebcore()

  const effects: Record<string, {
    loopEffect: () => void
    tic: number,
    dir: number,
    popit: PptProps
  }> = { }

  const loopEffect = (key: string) => {
    const e = effects[key]
    if (!e) {
      return
    }

    e.tic += RANGE / 5

    if (e.tic >= RANGE) {
      e.dir = -1
    }

    if (e.tic >= 2 * RANGE) {
      loopStop(e.loopEffect)
      delete effects[key]
    }
  }

  const popEffect = (p: PptProps) => {
    const key = new Date().valueOf().toString()

    const lpEffect = () => loopEffect(key)
    const tic = 1
    const dir = 1
  
    effects[key] = { loopEffect: lpEffect, tic, dir, popit: p }

    loop(lpEffect)
  }

  const render = () => {
    ctx.globalAlpha = 0.25
    for (const k in effects) {
      const e = effects[k]
      const p = e.popit

      ctx.fillStyle = shade(p.c || 'red', -16)
      ctx.beginPath()
      ctx.arc(
        p.x,
        p.y,
        p.r + (p.r * 0.001 * (e.tic + (e.dir > 0 ? 0 : RANGE - e.tic))),
        0,
        Math.PI * 2
      )
      ctx.closePath()
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  return {
    popEffect,
    render
  }
}
