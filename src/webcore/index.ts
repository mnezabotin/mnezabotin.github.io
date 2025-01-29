import { useStage } from '@/webcore/stage'
import { useScreen } from '@/webcore/screen'
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

  const screen = useScreen(routes)

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
      new Promise(() => screen.navigate(name))
    },

    loop,
    loopStop: stop,

    rand,
    randChain,

    addEventResize,
  }

  loop(() => stage.render(screen.render), 'draw')

  window.onresize = () => {
    stage.resize()
    onResizeEvents()
  }

  screen.mount()
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
