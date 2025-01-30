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

export const initWebcore = (routes: Route[]): void => {
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

  webcore = {
    ctx: stage.ctx,

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
  }

  loop(() => stage.render(router.render), 'draw')

  window.onresize = () => {
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
