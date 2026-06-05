import {
  Container,
  Color,
  BitmapText,
  TextStyleAlign,
} from 'pixi.js'
import { useWebcore } from '@/webcore'

export type Props = {
  text: string
  c: string
  x: number
  y: number
  a?: TextStyleAlign
  fs: number
  w?: number
  f?: string
}

export const Text = (props: Props): Container => {
  const { core, font } = useWebcore()
  const container = new Container()

  const text = new BitmapText({
    text: props.text,
    style: {
      fontFamily: props.f || font,
      fontSize: props.fs,
      fill: new  Color(props.c),
      align: props.a || 'center',
    }
  })

  container.x = props.x - text.width / 2
  container.y = props.y

  container.addChild(text)
  core.stage.addChild(container)

  return container
}
