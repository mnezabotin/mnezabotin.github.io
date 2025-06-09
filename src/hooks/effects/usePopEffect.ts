import { Props as PptProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'
import { useSoundEffect } from './useSoundEffect'

const RANGE = 100 / 2

type PopEffect = {
  popEffect: (p: PptProps) => void
  render: Render
}

let keyInd = 0

export const usePopEffect = (): PopEffect => {
  const {
    loop,
    ctx,
    shade,
    rand
  } = useWebcore()

  const { playPop, playMissed } = useSoundEffect()

  const effects: Record<string, {
    withoutRad: boolean
    shake: boolean
    tic: number
    dir: number
    popit: PptProps
    origR: number
    origX: number
    origY: number
  }> = { }

  const loopEffects = () => {
    for (const key in effects) {
      const e = effects[key]
      if (!e) {
        return
      }

      const p = e.popit

      if (!e.shake) {
        e.tic += RANGE / 5

        if (e.tic >= RANGE) {
          e.dir = -1
        }

        if (!e.withoutRad) {
          p.r = e.origR + (e.origR * 0.00075 * (e.tic + (e.dir > 0 ? 0 : RANGE - e.tic)))
        }
      } else {
        e.tic += RANGE / 5

        const dx = rand(1, 2)
        const dy = rand(1, 2)

        p.x = e.origX + (Math.random() * dx * (Math.random() > 0.5 ? 1 : -1))
        p.y = e.origY + (Math.random() * dy * (Math.random() > 0.5 ? 1 : -1))
      }

      if (e.tic >= 2 * RANGE) {
        delete effects[key]
        p.r = e.origR
        p.x = e.origX
        p.y = e.origY
      }
    }
  }

  const popEffect = (p: PptProps, withoutRad = false, shake = false) => {
    if (withoutRad) {
      playMissed()
    } else {
      playPop()
    }

    navigator?.vibrate?.(30)

    keyInd++
    const key = `${new Date().valueOf().toString()}_${keyInd}`

    const tic = 1
    const dir = 1

    let origR = p.r
    let origX = p.x
    let origY = p.y

    for (const efkey in effects) {
      const efc = effects[efkey]
      if (p === efc.popit) {
        origR = efc.origR
        origX = efc.origX
        origY = efc.origY
      }
    }
  
    effects[key] = {
      withoutRad,
      tic,
      dir,
      popit: p,
      origR,
      origX,
      origY,
      shake
    }
  }

  const render = () => {
    ctx.globalAlpha = 0.25
    for (const k in effects) {
      const e = effects[k]
      if (e.shake) {
        continue
      }

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
