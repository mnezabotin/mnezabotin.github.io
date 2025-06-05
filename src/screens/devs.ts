import { useBackButton, useGradient, usePopEffect } from '@/hooks'
import { useWebcore } from '@/webcore'
import { Text } from '@/shapes/text'
import type { Render } from '@/webcore/types'

type Obj = {
  img: HTMLCanvasElement
  x: number
  y: number
  w: number
  h: number
}

export const Devs = (): Render => {
  const {
    addEventResize,
    setBackground,
    createImg,
    useMeasure,
    ctx: mainCtx,
    loop,
  } = useWebcore()
  const { popEffect, render: renderPopEffects } = usePopEffect()

  const { render: backRender } = useBackButton({ popEffect })

  const palette = useGradient(true)

  let objs: Obj[] = []

  const positions = [
    'Director',
    'Producer',
    'Designer',
    'Developer',
  ]

  addEventResize(() => {
    const { m, cy, s } = useMeasure()

    objs = []

    const fs = Math.round(m * 3.5)

    const w = Math.round(s * 0.6)
    const x = Math.round((s - w) / 2)

    let start = cy
    let pind = 0

    for (const p of positions) {
      if (!palette[pind]) {
        pind = 0
      }
      const position = Text({
        text: p,
        x: 0,
        y: fs,
        c: palette[pind],
        fs: Math.round(fs * 0.7),
        mw: w,
        a: 'left',
      })
      const employee = Text({
        text: 'MAXIM NEZABOTIN',
        x: w,
        y: fs * 2,
        c: '#fff',
        fs: Math.round(fs * 0.75),
        mw: w,
        a: 'right',
        // f: 'Tahoma, sans-serif'
      })

      const img = createImg((ctx = mainCtx) => {
        position(ctx)
        employee(ctx)
      }, w, 2 * fs)

      objs.push({
        img,
        x,
        y: start,
        w,
        h: 5 * fs
      })

      start += 7 * fs
      pind++
    }
  })

  setBackground('#040404')

  loop(() => {
    for (const o of objs) {
      o.y -= 1
    }
  })

  return () => {
    objs.forEach(({ img, x, y, w, h }) => {
      // mainCtx.fillStyle = 'red'
      // mainCtx.beginPath()
      // mainCtx.rect(x, y, w, h)
      // mainCtx.closePath()
      // mainCtx.fill()
      mainCtx.drawImage(img, x, y, w, h)
    })

    renderPopEffects()
    backRender()
  }
}
