export type Interval = {
  loop: (func: Function, key?: string) => void
  stop: (key: string | Function) => void
  stopAll: Function
}

export type Render = (ctx?: CanvasRenderingContext2D) => void

export type Stage = {
  ctx: CanvasRenderingContext2D
  render: (draw: Render) => void
  resize: Function

  shade: (color: string, percent: number) => string
  rotate: (draw: Render, x: number, y: number, angle: number) => void
  // shape: (
  //   draw: (ctx: CanvasRenderingContext2D) => void,
  //   x: number,
  //   y: number,
  //   w: number,
  //   h?: number
  // ) => Render,
}

export type Route = {
  name: string
  ctor: () => Render
  meta?: object
}

export type Router = {
  render: Render
  navigate: (name: string) => void
  mount: Function
}

export type Random = (min: number, max: number) => number

type AddEvent = (func: Function) => void

export type Event = {
  addEventResize: AddEvent
  onResizeEvents: Function

  addEventClick: AddEvent
  onClickEvents: (x: number, y: number) => void

  removeAllEvents: Function
}

export type WebcoreOpts = {
  seed?: number
}

export type Webcore = {
  ctx: CanvasRenderingContext2D
  shade: Stage['shade']
  rotate: Stage['rotate']
  // shape: Stage['shape']

  useMeasure: () => {
    cx: number
    cy: number
    s: number
    m: number
  }

  navigate: Router['navigate']

  loop: Interval['loop']
  loopStop: Interval['stop']

  randChain: Random
  rand: Random

  addEventResize: Event['addEventResize']
  addEventClick: Event['addEventClick']

  font: string
}
