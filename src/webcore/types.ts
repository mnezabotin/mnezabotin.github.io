import { Application } from 'pixi.js'

export type Interval = {
  useLoop: (func: Function, minFPS?: number, maxFPS?: number) => void
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
  shade: (color: string, percent: number) => string
  clearStage: Function
  setBackground: (color: string, pureColor?: string) => void
}

export type Route = {
  name: string
  ctor: () => void
  meta?: object
}

export type ScreenMeta = {
  from: string[]
  to: string[]
  data: any
}

export type Router = {
  navigate: (name?: string | string[], data?: any) => void
  useScreenMeta: () => ScreenMeta
}

export type Random = (min: number, max?: number) => number

export type Event = {
  addEventResize: (func: Function) => void
  onResizeEvents: Function

  addEventClick: (func: (x: number, y: number) => void) => void
  onClickEvents: (x: number, y: number) => void

  addEventMove: (func: (x: number, y: number) => void) => void
  onMoveEvents: (x: number, y: number) => void

  removeAllEvents: Function
}

export type Sdk = {
  showFullscreenAdv: () => void
  ready: () => void
  gameplayStart: () => void
  gameplayStop: () => void
  showBannerAdv: () => void
}

export type Webcore = {
  shade: Stage['shade']
  setBackground: Stage['setBackground']

  useMeasure: () => {
    cx: number
    cy: number
    s: number
    m: number
    isL: boolean
  }

  navigate: Router['navigate']
  useScreenMeta: Router['useScreenMeta'] 

  useLoop: Interval['useLoop']
  useTimer: (callback: Function, delay?: number) => Timer

  rand: Random
  useRandChain: (seed?: number) => Random

  intersect: (a: Point, b: Point) => boolean

  addEventResize: Event['addEventResize']
  addEventClick: Event['addEventClick']
  addEventMove: Event['addEventMove']

  playSound: (name: string, rate?: number) => void

  font: string
  sdk: Sdk
  core: Application
}
