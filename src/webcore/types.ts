export type Interval = {
  loop: (func: Function, key?: string) => void
  stop: (key: string | Function) => void
  stopAll: Function
}

export type Timer = {
  resume: Function
  pause: Function
  stop: Function
}

export type Render = (ctx?: CanvasRenderingContext2D) => void

export type ShapeProps = {
  draw: Render
  x: number
  y: number
  w: number
  h?: number
  img?: HTMLCanvasElement
}

export type Point = {
  x: number
  y: number
  r?: number
}

export type Rectangle = {
  x: number
  y: number
  w?: number
  h?: number
}

export type Stage = {
  ctx: CanvasRenderingContext2D
  render: (draw: Render) => void
  resize: Function

  shade: (color: string, percent: number) => string
  rotate: (draw: Render, x: number, y: number, angle: number) => void
  translate: (draw: Render, x: number, y: number) => void
  setBackground: (color: string, pureColor?: string) => void
  createImg: (draw: Render, w: number, h?: number) => HTMLCanvasElement
}

export type Route = {
  name: string
  ctor: () => Render
  meta?: object
}

export type ScreenMeta = {
  from: string
  to: string
  data: any
}

export type Router = {
  render: Render
  navigate: (name?: string, data?: any) => void
  useScreenMeta: () => ScreenMeta
}

export type Random = (min: number, max?: number) => number

export type Event = {
  addEventResize: (func: Function) => void
  onResizeEvents: Function

  addEventClick: (func: (x: number, y: number) => void) => void
  onClickEvents: (x: number, y: number) => void

  removeAllEvents: Function
}

export type Webcore = {
  ctx: CanvasRenderingContext2D
  shade: Stage['shade']
  rotate: Stage['rotate']
  translate: Stage['translate']
  setBackground: Stage['setBackground']
  createImg: Stage['createImg']

  useMeasure: () => {
    cx: number
    cy: number
    s: number
    m: number
  }

  navigate: Router['navigate']
  useScreenMeta: Router['useScreenMeta'] 

  loop: Interval['loop']
  loopStop: Interval['stop']
  useTimer: (callback: Function, delay?: number) => Timer

  rand: Random
  useRandChain: (seed?: number) => Random

  intersect: (a: Point, b: Point) => boolean

  addEventResize: Event['addEventResize']
  addEventClick: Event['addEventClick']

  font: string
}
