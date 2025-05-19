import { Opening, Main, Game, Score, Devs } from '@/screens'

import { initWebcore } from '@/webcore'

import type { Route } from '@/webcore/types'

const routes: Route[] = [
  {
    name: 'opening',
    ctor: Opening
  },
  {
    name: 'main',
    ctor: Main
  },
  {
    name: 'game',
    ctor: Game
  },
  {
    name: 'score',
    ctor: Score
  },
  {
    name: 'devs',
    ctor: Devs
  },
]

const audioPaths = [
  '/sounds/tap.mp3'
]

initWebcore(routes, audioPaths)

document.title = 'Your\'s last Pop it'
