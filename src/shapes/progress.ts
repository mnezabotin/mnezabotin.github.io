import { useWebcore } from '@/webcore'
import { Props as PptProps } from '@/shapes/popit'
import type { Render } from '@/webcore/types'

const COUNT_PX = 100
const DARK_COL = '#222'

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
  winScore: number
  seed: number
}

export const Progress = (props: Props): Render => {
  const { ctx: mainCtx, createImg, useRandChain, useTimer } = useWebcore()

  let imageValue: ImageValue
  let showWinScore = false
  let winPopits: PptProps[] = []

  const popRad = (props.r * 2) / COUNT_PX / 2

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

  const winScoreTic = () => useTimer(() => {
    showWinScore = !showWinScore
    winScoreTic()
  }, 250)

  const drawPixel = (pxProps: PptProps, ctx = mainCtx) => {
    const { x, y, c, r } = pxProps
    
    ctx.fillStyle = c || 'red'
    ctx.beginPath()
    ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  const drawFond = (ctx = mainCtx, x = 0, y = 0) => {
    ctx.fillStyle = DARK_COL
    ctx.beginPath()
    ctx.roundRect(x, y, 2 * props.r, 2 * props.r, popRad)
    ctx.closePath()
    ctx.fill()
  }

  const getPixelProps = () => {
    const pxsProps: PptProps[] = []

    for (let i = 0; i < COUNT_PX; i++) {
      for (let j = 0; j < COUNT_PX; j++) {
        const pxProps = {
          x: j * popRad * 2,
          y: i * popRad * 2,
          r: popRad,
          c: DARK_COL,
        }
        
        pxsProps.push(pxProps)
      }
    }

    let score = props.score - props.winScore
    const boxPxsProps = [...pxsProps]
    const rand = useRandChain(props.seed)

    const setPixel = (isWin = false) => {
      const randInd = rand(boxPxsProps.length - 1)
      const px = boxPxsProps[randInd]
      const origInd = pxsProps.indexOf(px)
      px.c = isWin ? DARK_COL : imageValue.cols[origInd]

      boxPxsProps.splice(randInd, 1)

      if (isWin) {
        winPopits.push({
          ...px,
          c: imageValue.cols[origInd]
        })
      }
    }

    for (let i = score; i > 0; i--) {
      setPixel()
    }

    if (props.winScore) {
      winPopits = []
      for (let i = props.winScore; i > 0; i--) {
        setPixel(true)
      }
      winScoreTic()
    }

    return pxsProps
  }

  const onFilled = () => {
    const pxsProps = getPixelProps()

    imageValue.drawImg = createImg((ctx = mainCtx) => {
      drawFond(ctx)
      pxsProps.filter(p => p.c !== DARK_COL).forEach(p => drawPixel(p, ctx))
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
    const { x, y, r, winScore } = props

    if (imageValue.drawImg) {
      ctx.drawImage(imageValue.drawImg, x - r, y - r, 2 * r, 2 * r)
    } else {
      drawFond(ctx, x - r, y - r)
    }

    if (showWinScore && winScore && imageValue.drawImg) {
      for (const px of winPopits) {
        ctx.fillStyle = px.c || 'red'
        ctx.beginPath()
        ctx.arc(
          x - r + px.x + px.r,
          y - r + px.y + px.r,
          px.r,
          0,
          Math.PI * 2
        )
        ctx.closePath()
        ctx.fill()
      }
    }
  }
}
