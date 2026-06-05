import { Application } from 'pixi.js'
import { useStage } from '@/webcore/stage'
import { useRouter } from '@/webcore/router'
import { useTicker } from '@/webcore/ticker'
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

  const { shade, clearStage, setBackground } = useStage(core)

  const router = useRouter(routes, clearStage)

  const { useLoop, stopAll } = useTicker()

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
    font: 'PressStart2P',
    sdk,
    core,

    shade,
    setBackground,

    useMeasure,

    useScreenMeta: router.useScreenMeta,
    navigate: (name?: string | string[], data?: any) => {
      stopAll()
      stopTimers()
      removeAllEvents()
      setTimeout(() => router.navigate(name, data))
    },

    useLoop,
    useTimer,

    rand,
    useRandChain,

    intersect,

    addEventResize,
    addEventClick,
    addEventMove,

    playSound,
  }

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
