export type Route = {
  name: string
  ctor: Function
  meta?: object
}

export type Interval = {
  loop: (key: string, callback: () => void) => void
  stop: (key: string) => void
}

export type StageEntity = {
  resize?: () => void
  render: () => void
}

export type Stage = {
  ctx: CanvasRenderingContext2D
  add: (obj: StageEntity) => void
  remove: (obj: StageEntity) => void
  render: () => void
}

export type Random = (min: number, max: number) => number

export type WebcoreOpts = {
  seed?: number
}

export type Webcore = {
  interval: Interval
  stage: Stage
  randChain: Random
  randInt: Random
}
