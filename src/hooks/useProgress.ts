import { Pixel } from '@/shapes/pixel'
import { Popit, Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'
import { useBack } from '@/hooks/useBack'

function rgba2hex(orig) {
  const R = orig[0]
  const G = orig[1]
  const B = orig[2]
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

export const useProgress = (): Render => {
  const { addEventResize, useMeasure, rand, ctx, useTimer } = useWebcore()

  let popits: Render[] = []
  let popitsProps: PopitProps[] = []
  let back: Render

  const backBtn = useBack()

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  var img = new Image();
  img.src = './cat.png'

  const count = 100
  canvas.width = count
  canvas.height = count

  img.onload = () => {
    const progress = 10000
    context?.drawImage(img, 0, 0)
    const cols = []
    const diff = 100 / count
    for (let i = 0; i < count; i++) {
      const arr = []
      for (let j = 0; j < count; j++) {
        const data = context?.getImageData(i * diff, j * diff, diff, diff)?.data
        arr.push(rgba2hex(data))
      }
      cols.push(arr)
    }

    addEventResize(() => {
      const { s, cx, cy, m } = useMeasure()

      popits = []
      const w = Math.round((s * 0.8 - count + 1) / count)

      const ws = Math.round(cx - w * (count / 2) - (count - 1) / 2)
      const hs = Math.round(cy - w * (count / 2) - (count - 1) / 2)

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const props = {
            x: ws + j * w + w + j,
            y: hs + i * w + w + i,
            r: w  / 2,
            p: rand(0) < 0,
            // c: cols[j][i],
            c: i * 100 + j > progress ? '#222' : cols[j][i]
            // c: rand(0) < 1 ? cols[j][i] : '#222'
          }
          popitsProps.push(props)
          popits.push(Popit(props))
        }
      }

      back = () => {
        ctx.fillStyle = '#000'
        ctx.beginPath()
        ctx.rect(ws + w / 2, hs + w / 2, count * w + count - 1, count * w + count - 1)
        ctx.closePath()
        ctx.fill()
      }

      // back = Popit({
      //   x: cx,
      //   y: cy,
      //   r: Math.round(s * 0.45),
      //   c: '#ffeb3b',
      //   p: true,
      // })
      // back = () => {
      //   ctx.strokeStyle = '#000000'
      //   ctx.lineCap = 'round'
      //   ctx.lineWidth = 2 * m
      //   ctx.beginPath()
      //   ctx.moveTo(ws, hs)
      //   ctx.lineTo(ws + count * w, hs)
      //   ctx.stroke()

      //   ctx.beginPath()
      //   ctx.moveTo(ws + count * w, hs)
      //   ctx.lineTo(ws + count * w, hs + count * w)
      //   ctx.stroke()

      //   ctx.beginPath()
      //   ctx.moveTo(ws + count * w, hs + count * w)
      //   ctx.lineTo(ws, hs + count * w)
      //   ctx.stroke()
  
      //   ctx.beginPath()
      //   ctx.moveTo(ws, hs + count * w)
      //   ctx.lineTo(ws, hs)
      //   ctx.stroke()
      // }
    })
  }

  const tic = () => {
    useTimer(() => {
      const count = rand(50, 500)
      for (let i = 0; i < count; i++) {
        const i = rand(popitsProps.length - 1)
        popitsProps[i].p = !popitsProps[i].p
      }
      
      tic()
    })
  }

  // tic()

  return () => {
    back?.()
    popits.forEach(p => p())

    backBtn()
  }
}
