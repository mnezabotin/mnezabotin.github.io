import { useWebcore } from '@/webcore'
import type { Render } from '@/webcore/types'

const COUNT_PX = 100
const PIXEL_OFFSET = 0
const DARK_COL = '#222'

type PixelProps = {
  x: number
  y: number
  r: number
  c: string
  p?: boolean
}


const rgbToHex = (orig: Uint8ClampedArray | undefined) => {
  const R = orig?.[0] || 0
  const G = orig?.[1] || 0
  const B = orig?.[2] || 0
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

type ImageValue = {
  drawImg: HTMLCanvasElement | null
  img: HTMLImageElement
  cols: string[]
  isFilled: boolean
  r: number
  score: number
}

const IMAGES: Record<string, ImageValue> = {}

export type Props = {
  imgSrc: string
  score: number
  x: number
  y: number
  r: number
}

export const Progress = (props: Props): Render => {
  const { ctx: mainCtx, createImg, useRandChain } = useWebcore()

  let imageValue: ImageValue

  if (!IMAGES[props.imgSrc]) {
    imageValue = IMAGES[props.imgSrc] = {
      img: new Image(),
      cols: [],
      isFilled: false,
      r: props.r,
      drawImg: null,
      score: props.score
    }
    imageValue.img.src = props.imgSrc
  } else {
    imageValue = IMAGES[props.imgSrc]
  }

  const drawPixel = (pxProps: PixelProps, ctx = mainCtx) => {
    const { x, y, c, r } = pxProps
    
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    // if (p) {
    //   ctx.fillStyle = shade(c, 5)
    //   ctx.beginPath()
    //   ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
    //   ctx.closePath()
    //   ctx.fill()
    // } else {
    //   ctx.fillStyle = c
    //   ctx.beginPath()
    //   ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
    //   ctx.closePath()
    //   ctx.fill()
    // }
  }

  const getPixelProps = () => {
    const pxsProps = []

    const w = (props.r * 2 - 2 * PIXEL_OFFSET) / COUNT_PX

    for (let i = 0; i < COUNT_PX; i++) {
      for (let j = 0; j < COUNT_PX; j++) {
        const pxProps = {
          x: PIXEL_OFFSET + j * w,
          y: PIXEL_OFFSET + i * w,
          r: w / 2,
          c: DARK_COL,
          // c: i * 100 + j >= props.score
          //   ? DARK_COL
          //   : imageValue.cols[j * COUNT_PX + i]
        }
        
        pxsProps.push(pxProps)
      }
    }

    let score = props.score
    const boxPxsProps = [...pxsProps]
    const rand = useRandChain(0)
  
    for (let i = score; i > 0; i--) {
      const randInd = rand(boxPxsProps.length - 1)
      const px = boxPxsProps[randInd]
      const origInd = pxsProps.indexOf(px)
      px.c = imageValue.cols[origInd]

      boxPxsProps.splice(randInd, 1)
    }

    return pxsProps
  }

  const onFilled = () => {
    const pxsProps = getPixelProps()

    imageValue.drawImg = createImg((ctx = mainCtx) => {
      ctx.fillStyle = DARK_COL
      ctx.beginPath()
      ctx.rect(0, 0, 2 * props.r, 2 * props.r)
      ctx.closePath()
      ctx.fill()

      pxsProps.filter(p => p.c === DARK_COL).forEach(p => drawPixel(p, ctx))
      pxsProps.filter(p => p.c !== DARK_COL).forEach(p => drawPixel(p, ctx))      
      // pxsProps.filter(p => p.c !== DARK_COL).forEach(p => drawPixel({ ...p, p: true }, ctx))
    }, 2 * props.r)
  }

  const onLoadImg = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = COUNT_PX
    canvas.height = COUNT_PX

    const context = canvas.getContext("2d", { willReadFrequently: true })
    context?.drawImage(imageValue.img, 0, 0)

    for (let i = 0; i < COUNT_PX; i++) {
      const arr = []
      for (let j = 0; j < COUNT_PX; j++) {
        const data = context?.getImageData(j, i, 1, 1)?.data
        arr.push(rgbToHex(data))
      }
      imageValue.cols.push(...arr)
    }

    imageValue.isFilled = true
    onFilled()
  }

  if (!imageValue.isFilled) {
    imageValue.img.onload = onLoadImg
  } else if (imageValue.r !== props.r || imageValue.score !== props.score) {
    onFilled()
  }

  return (ctx = mainCtx) => {
    const { x, y, r } = props

    if (imageValue.drawImg) {
      ctx.drawImage(imageValue.drawImg, x - r, y - r, 2 * r, 2 * r)
    }
  }
}
