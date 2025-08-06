import { Application } from 'pixi.js'
import { useStage } from '@/webcore/stage'
import { useRouter } from '@/webcore/router'
import { useInterval } from '@/webcore/interval'
import { stopTimers, useTimer } from '@/webcore/timer'
import { rand, useRandChain } from '@/webcore/random'
import { useEvent } from '@/webcore/event'
import { intersect } from '@/webcore/intersect'
import { useSound } from '@/webcore/sound'

import type {
  Route,
  Webcore,
  Sdk,
} from '@/webcore/types'

let webcore: Webcore

export const initWebcore = async (routes: Route[], sounds: string[] = [], sdk: Sdk) => {
  if (webcore) {
    throw new Error('Webcore already specified')
  }

  const core = new Application()
  await core.init({ background: '#040404', resizeTo: window, antialias: true })
  document.body.appendChild(core.canvas)

  const { shade, clearStage } = useStage(core.stage)

  const router = useRouter(routes, clearStage)

  const { loop, stop, stopAll } = useInterval()

  const {
    addEventResize,
    onResizeEvents,

    addEventClick,
    onClickEvents,

    addEventMove,
    onMoveEvents,

    removeAllEvents
  } = useEvent()

  let cx = innerWidth / 2
  let cy = innerHeight / 2
  let s = innerWidth < innerHeight ?  innerWidth : innerHeight
  let m = Math.ceil(
    Math.sqrt(
      innerWidth * innerWidth + innerHeight * innerHeight
    ) / 144
  )
  let isLandscape = innerWidth > innerHeight
  let w = innerWidth
  let h = innerHeight

  const useMeasure = () => ({ w, h, cx, cy, s, m, isL: isLandscape })

  const playSound = useSound(sounds)

  webcore = {
    font: 'Tijuf',
    sdk,
    core,

    shade,

    useMeasure,

    useScreenMeta: router.useScreenMeta,
    navigate: (name?: string | string[], data?: any) => {
      stopAll()
      stopTimers()
      removeAllEvents()
      setTimeout(() => router.navigate(name, data))
    },

    loop,
    loopStop: stop,
    useTimer,

    rand,
    useRandChain,

    intersect,

    addEventResize,
    addEventClick,
    addEventMove,

    playSound,
  }

  // loop(() => stage.render(router.render), 'draw')

  window.onresize = () => {
    cx = innerWidth / 2
    cy = innerHeight / 2
    s = innerWidth < innerHeight ?  innerWidth : innerHeight
    m = Math.ceil(
      Math.sqrt(
        innerWidth * innerWidth + innerHeight * innerHeight
      ) / 144
    )
    isLandscape = innerWidth > innerHeight
    w = innerWidth
    h = innerHeight

    clearStage()
    onResizeEvents()
  }

  document.onpointerdown = (e: MouseEvent) => {
    onClickEvents(e.clientX, e.clientY)
  }

  document.onmousemove = (e: MouseEvent) => {
    onMoveEvents(e.clientX, e.clientY)
  }

  router.navigate()
}

export const useWebcore = (): Webcore => {
  if (!webcore) {
    throw new Error('Webcore not specified')
  }

  return {
    ...webcore,
  }
}
