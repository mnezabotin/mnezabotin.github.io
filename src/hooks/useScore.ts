import { Pixel } from '@/shapes/pixel'
import { Popit } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render } from '@/webcore/types'

function rgba2hex(orig) {
  const R = orig[0]
  const G = orig[1]
  const B = orig[2]
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

export const useScore = (): Render => {
  const { addEventResize, useMeasure, rand, ctx, shade } = useWebcore()

  let popits: Render[] = []
  let back: Render

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  var img = new Image();
  img.src = './donut.png'

  const count = 100
  canvas.width = count
  canvas.height = count

  img.onload = () => {
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
      const w = Math.round((s * 0.7) / count)

      const ws = Math.round(cx - w * (count / 2))
      const hs = Math.round(cy - w * (count / 2))

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          popits.push(Pixel({
            x: ws + j * w + w,
            y: hs + i * w + w,
            w,
            c: cols[j][i],
            // c: rand(16) < 1 ? '#000000' : cols[j][i]
          }))
        }
      }

      back = () => {
        ctx.strokeStyle = shade('#ffeb3b', 10)
        ctx.lineCap = 'round'
        ctx.lineWidth = 2 * m
        ctx.beginPath()
        ctx.moveTo(ws, hs)
        ctx.lineTo(ws + count * w, hs)
        ctx.stroke()
      }
    })
  }

  return () => {
    popits.forEach(p => p())
    // back?.()
  }
}
