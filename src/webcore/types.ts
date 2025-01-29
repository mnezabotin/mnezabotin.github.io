export type Interval = {
  loop: (key: string, callback: () => void) => void
  stop: (key: string) => void
}

export type Render = () => void

export type Stage = {
  ctx: CanvasRenderingContext2D
  render: (draw: Render) => void
  resize: Render
}

export type Route = {
  name: string
  ctor: () => Render
  meta?: object
}

export type Screen = {
  render: Render
  navigate: (name: string) => void
  resizeEvents: Render[]
  addResizeEvent: (event: Render) => void
  resize: Render
}

export type Random = (min: number, max: number) => number

export type WebcoreOpts = {
  seed?: number
}

export type Webcore = {
  ctx: CanvasRenderingContext2D
  interval: Interval
  navigate: (name: string) => void
  randChain: Random
  randInt: Random
  addResizeEvent: (event: Render) => void
}
