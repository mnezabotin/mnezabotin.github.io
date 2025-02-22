import { Opening, Main, Game, Score, Devs } from '@/screens'

import { initWebcore } from '@/webcore'

import type { Route } from '@/webcore/types'

const routes: Route[] = [
  {
    name: 'score',
    ctor: Score
  },
  {
    name: 'main',
    ctor: Main
  },
  {
    name: 'opening',
    ctor: Opening
  },
  {
    name: 'game',
    ctor: Game
  },
  {
    name: 'devs',
    ctor: Devs
  },
]

initWebcore(routes)

document.title = 'Your\'s last Pop it'
