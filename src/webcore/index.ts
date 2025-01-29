import { useStage } from '@/webcore/stage'
import { useScreen } from '@/webcore/screen'
import { useInterval } from '@/webcore/interval'
import { rand, useRandChain } from '@/webcore/random'

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

  webcore = {
    ctx: stage.ctx,

    navigate: (name: string) => {
      stopAll()
      new Promise(() => screen.navigate(name))
    },

    loop,
    loopStop: stop,

    rand,
    randChain,

    addEventResize: screen.resizeEvent
  }

  loop(() => stage.render(screen.render), 'draw')

  window.onresize = () => {
    stage.resize()
    screen.resize()
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
