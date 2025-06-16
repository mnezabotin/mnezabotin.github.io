import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'
import { Text } from '@/shapes/text'

export const useWinText = (text: string): Render => {
  const {
    addEventResize,
    createImg,
    useMeasure,
    ctx: mainCtx,
    loop
  } = useWebcore()

  let img: HTMLCanvasElement
  let fs: number
  let x: number
  let y: number
  let w: number
  let h: number
  let top: number

  let isShow = false
  
  let jumpVelocity = -2
  const gravity = 0.1

  addEventResize(() => {
    const { s, m, cy } = useMeasure()

    // fs = Math.round(s * 0.15)
    fs = Math.round(s * 0.16)
    w = s
    h = Math.round(fs * 1.5)
    x = 0
    y = Math.max(
      Math.round((innerHeight - cy - s / 2) / 2 - fs / 2) + m * 4,
      Math.round(cy - s / 2 - fs * 2)
    )
    top = y

    isShow = y - fs / 2 > -(fs / 2) + m * 2

    const textProps = {
      fs,
      text,
      x: Math.round(s / 2),
      y: fs,
      c: '#f9f9f9',
      mw: Math.round(s * 0.8)
    }
    const win = Text(textProps)

    img = createImg((ctx = mainCtx) => {
      win(ctx)
    }, w, h)

  })

  loop(() => {
    const { m } = useMeasure()
    y += jumpVelocity
    jumpVelocity += gravity

    if (y <= m) {
      y = m
    }

    if (y >= top) {
      y = top
      jumpVelocity = -2
    }
  })

  return () => {
    if (isShow) {
      mainCtx.drawImage(img, x, y, w, h)
    }
  }
}
