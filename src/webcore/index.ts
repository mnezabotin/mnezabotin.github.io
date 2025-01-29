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

  webcore = {
    ctx: stage.ctx,
    interval,
    navigate: screen.navigate,
    randInt,
    randChain,
    resizeEvent: screen.resizeEvent
  }

  interval.loop('render', () => stage.render(screen.render))
  window.onresize = () => {
    stage.resize()
    screen.resize()
  }

  screen.mount()

  window.userNavigate = screen.navigate
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
