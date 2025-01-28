import { randInt, RandChain } from '@/webcore/random'
import { Interval } from '@/webcore/interval'
import { Stage } from '@/webcore/stage'

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

  const interval = Interval()
  const stage = Stage()
  const randChain = RandChain()

  interval.loop('render', stage.render)

  webcore = {
    interval,
    randInt,
    randChain,
    stage,
  }
}

export const useWebcore = (opts?: WebcoreOpts): Webcore => {
  if (!webcore) {
    throw new Error('Webcore not specified')
  }

  return {
    ...webcore,
    randChain: opts?.seed ? RandChain(opts?.seed) : webcore.randChain,
  }
}
