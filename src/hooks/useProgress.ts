import { Pixel } from '@/shapes/pixel'
import { Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'
import { Render, Shape } from '@/webcore/types'

function rgba2hex(orig: Uint8ClampedArray<ArrayBufferLike> | undefined) {
  const R = orig?.[0] || 0
  const G = orig?.[1] || 0
  const B = orig?.[2] || 0
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

export const useProgress = (): Render => {
  const {
    addEventResize,
    useMeasure,
    rand,
    useTimer,
    shape
  } = useWebcore()

  let popits: Render[] = []
  let popits1: Render[] = []
  let popitsProps: PopitProps[] = []
  // let back: Render

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  var img = new Image();
  img.src = './cat.png'

  const count = 100
  canvas.width = count
  canvas.height = count

  let progressShape: Shape

  img.onload = () => {
    const progress = 5001
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
      const { s, cx, cy } = useMeasure()

      // popits = []
      popitsProps = []
      const w = Math.round((s * 0.86) / count)

      const ws = Math.round(cx - w * (count / 2)) - 2
      const hs = Math.round(cy - w * (count / 2)) - 2

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const props = {
            x: 2 + j * w,
            y: 2 + i * w,
            r: w / 2,
            c: i * 100 + j >= progress ? '#222' : cols[j][i]
            // c: rand(99) < 1 ? cols[j][i] : '#222'
          }
          
          popitsProps.push(props)
          // popits.push(Pixel(props))
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
    progressShape?.render()
    // for (let i = popits.length - 1; i > -1; i--) {
    //   popits[i]()
    // }
  }
}
