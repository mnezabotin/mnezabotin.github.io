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
    navigate,
  } = useWebcore()
  const { popEffect, render: renderPopEffects } = usePopEffect()

  const { render: backRender } = useBackButton({ popEffect })

  const palette = useGradient(true)

  let objs: Obj[] = []

  const positions = [
    'Director',
    'Producer',
    'Author',
    'Developer',
    'Lead',
    'PM',
    'Product',
    'Analyst',
    'Designer',
    'QA',
    'Animator',
    'Kitchener',
    'Cleaner',
    'Psychologist',
    'Motivator',
    'Mentor'
  ]
  let start = innerHeight

  addEventResize(() => {
    const { m, s } = useMeasure()

    objs = []

    const fs = Math.round(m * 3.5)

    const w = Math.round(s * 0.75)
    const x = Math.round((innerWidth - w) / 2)

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
        fs: Math.round(fs * 0.6),
        // fs: s * 0.25 / 7,
        mw: w,
        a: 'left',
        f: 'Slackey'
      })
      const employee = Text({
        text: 'Maksim Nezabotin',
        x: w,
        y: fs * 1.5,
        c: '#f9f9f9',
        // c: palette[pind + 1] || palette[0],
        fs: Math.round(fs * 0.7),
        // fs: s * 0.25 / 8,
        mw: w,
        a: 'right',
        f: 'Slackey'
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

      start += 5 * fs
      pind++
    }
  })

  setBackground('#040404')

  loop(() => {
    for (const o of objs) {
      o.y -= 2
    }

    const last = objs[objs.length - 1]
    if (last.y + last.h < 0) {
      navigate('main')
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
