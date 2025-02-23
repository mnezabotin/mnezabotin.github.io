import { Pixel } from '@/shapes/pixel'
import { Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { rand } from '@/webcore/random'
import { Point, Render, Shape } from '@/webcore/types'

function rgba2hex(orig: Uint8ClampedArray<ArrayBufferLike> | undefined) {
  const R = orig?.[0] || 0
  const G = orig?.[1] || 0
  const B = orig?.[2] || 0
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

type Progress = {
  render: Render
  point: () => Point
}

export const useProgress = (): Progress => {
  const {
    addEventResize,
    useMeasure,
    shape,
  } = useWebcore()

  let popits: Render[] = []
  let popits1: Render[] = []
  let popitsProps: PopitProps[] = []

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  var img = new Image();
  img.src = rand(1) < 1 ? './iron.png' : './cat.png'

  const count = 100
  canvas.width = count
  canvas.height = count

  let progressShape: Shape

  img.onload = () => {
    const progress = 10000 // rand(10000)
    context?.drawImage(img, 0, 0)
    const cols: string[][] = []
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

      // popits = []
      popitsProps = []
      const w = (s * 0.7 - 4) / count // Math.round((s * 0.86) / count)

      const ws = Math.round(cx - w * (count / 2)) - 2
      const hs = Math.round(cy - w * (count / 2)) - 2

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const props = {
            x: 2 + j * w,
            y: 2 + i * w,
            r: w / 2,
            c: i * 100 + j >= progress ? '#222' : cols[j][i]
            // c: rand(rand(20)) < 1 ? cols[j][i] : '#222'
          }
          
          popitsProps.push(props)
        }
      }

      popits = [
        ...popitsProps
          .filter(p => p.c === '#222')
          .map(p => Pixel(p)),
        ...popitsProps
          .filter(p => p.c !== '#222')
          .map(p => Pixel(p))
      ]

      popits1 = popitsProps.filter(p => p.c !== '#222').map(p => Pixel({
        ...p,
        p: true
      }))

      progressShape = shape({
        draw: (ctx) => {
          popits.forEach((p) => p(ctx))
          popits1.forEach((p) => p(ctx))
        },
        x: ws,
        y: hs,
        w: w * count + 4,
        img: progressShape?.img,
      })
    })
  }

  const render = () => {
    progressShape?.render()
    
  }

  const point = () => {
    const { s, cx, cy } = useMeasure()

    return {
      x: cx,
      y: cy,
      r: s / 2
    }
  }

  return {
    render,
    point
  }
}
