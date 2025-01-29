import { randInt, RandChain } from '@/webcore/random'
import { Interval } from '@/webcore/interval'
import { Stage } from '@/webcore/stage'
import { Screen } from '@/webcore/screen'

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
  const screen = Screen(routes)
  const randChain = RandChain()

  interval.loop('render', () => stage.render(screen.render))
  document.addEventListener('resize', () => {
    stage.resize()
    screen.resize()
  })

  webcore = {
    ctx: stage.ctx,
    navigate: screen.navigate,
    interval,
    randInt,
    randChain,
    addResizeEvent: screen.addResizeEvent
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
