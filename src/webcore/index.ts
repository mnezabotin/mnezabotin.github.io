import { useStage } from '@/webcore/stage'
import { useRouter } from '@/webcore/router'
import { useInterval } from '@/webcore/interval'
import { stopTimers, useTimer } from '@/webcore/timer'
import { rand, useRandChain } from '@/webcore/random'
import { useEvent } from '@/webcore/event'
import { intersect } from '@/webcore/intersect'

import type {
  Route,
  Webcore,
} from '@/webcore/types'


let webcore: Webcore

export const initWebcore = (routes: Route[]) => {
  if (webcore) {
    throw new Error('Webcore already specified')
  }

  const stage = useStage()

  const router = useRouter(routes)

  const { loop, stop, stopAll } = useInterval()

  const {
    addEventResize,
    onResizeEvents,

    addEventClick,
    onClickEvents,

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

  const useMeasure = () => ({ cx, cy, s, m })

  webcore = {
    font: 'Tijuf',

    ctx: stage.ctx,
    shade: stage.shade,
    rotate: stage.rotate,
    shape: stage.shape,
    setBackground: stage.setBackground,
    createImg: stage.createImg,

    useMeasure,

    useScreenMeta: router.useScreenMeta,
    navigate: (name?: string, data?: any) => {
      if (!routes.some(r => r.name === name)) {
        throw new Error(`Screen ${name} not specified`)
      }

      stopAll()
      stopTimers()
      removeAllEvents()
      new Promise(() => router.navigate(name, data))
    },

    loop,
    loopStop: stop,
    useTimer,

    rand,
    useRandChain,

    intersect,

    addEventResize,
    addEventClick,
  }

  loop(() => stage.render(router.render), 'draw')

  window.onresize = () => {
    cx = innerWidth / 2
    cy = innerHeight / 2
    s = innerWidth < innerHeight ?  innerWidth : innerHeight
    m = Math.ceil(
      Math.sqrt(
        innerWidth * innerWidth + innerHeight * innerHeight
      ) / 144
    )

    stage.resize()
    onResizeEvents()
  }

  document.ontouchstart = (e: TouchEvent) => {
    const touches = e.touches || []
    for (const t of touches) {
      onClickEvents(t.clientX, t.clientY)
    }
  }

  document.onmousedown = (e: MouseEvent) => {
    onClickEvents(e.clientX, e.clientY)
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
