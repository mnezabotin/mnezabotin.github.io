import { useStage } from '@/webcore/stage'
import { useRouter } from '@/webcore/router'
import { useInterval } from '@/webcore/interval'
import { rand, useRandChain } from '@/webcore/random'
import { useEvent } from '@/webcore/event'

import type {
  Route,
  Webcore,
  WebcoreOpts,
} from '@/webcore/types'

let webcore: Webcore

export const initWebcore = (routes: Route[]) => {
  if (webcore) {
    throw new Error('Webcore already specified')
  }

  const stage = useStage()

  const router = useRouter(routes)

  const { loop, stop, stopAll } = useInterval()

  const randChain = useRandChain()

  const {
    addEventResize,
    onResizeEvents,
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
    ctx: stage.ctx,
    shade: stage.shade,
    // shape: stage.shape,

    useMeasure,

    navigate: (name: string) => {
      stopAll()
      removeAllEvents()
      new Promise(() => router.navigate(name))
    },

    loop,
    loopStop: stop,

    rand,
    randChain,

    addEventResize,

    font: 'Tijuf'
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

  router.mount()
}

export const useWebcore = (opts?: WebcoreOpts): Webcore => {
  if (!webcore) {
    throw new Error('Webcore not specified')
  }

  return {
    ...webcore,
    randChain: opts?.seed ? useRandChain(opts?.seed) : webcore.randChain,
  }
}
