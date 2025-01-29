export type Interval = {
  loop: (func: Function, key?: string) => void
  stop: (key: string | Function) => void
  stopAll: Function
}

export type Render = Function

export type Stage = {
  ctx: CanvasRenderingContext2D
  render: (draw: Render) => void
  resize: Function
}

export type Route = {
  name: string
  ctor: () => Render
  meta?: object
}

export type Screen = {
  render: Render
  navigate: (name: string) => void
  resizeEvents: Function[]
  resizeEvent: (event: Function) => void
  resize: Function
  mount: Function
}

export type Random = (min: number, max: number) => number

export type Point = {
  x: number
  y: number
}

export type WebcoreOpts = {
  seed?: number
}

export type Webcore = {
  ctx: CanvasRenderingContext2D

  navigate: (name: string) => void

  loop: (func: Function, key?: string) => void
  loopStop: (key: string | Function) => void

  randChain: Random
  rand: Random

  addEventResize: (event: Function) => void
}
