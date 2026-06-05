import { useWebcore } from '@/webcore'
import { Assets, Container, Sprite } from 'pixi.js'

export type Props = {
  x: number
  y: number
  w: number
  h?: number
  src: string
}

export const Img = (props: Props): Container => {
  const { core } = useWebcore()
  const container = new Container()

  Assets.load(props.src).then((texture) => {
    const sprite = new Sprite(texture)
    container.x = props.x
    container.y = props.y
    sprite.width = props.w
    sprite.height = props.h || props.w
    container.addChild(sprite)
  })
  core.stage.addChild(container)

  return container
}
