import { Opening, Main, Game, Gameover, GameScore, Score, Devs } from '@/screens'

import { initWebcore } from '@/webcore'

import type { Route } from '@/webcore/types'

const routes: Route[] = [
  {
    name: 'score',
    ctor: Score
  },
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
    name: 'gameover',
    ctor: Gameover
  },
  {
    name: 'gamescore',
    ctor: GameScore
  },
  {
    name: 'devs',
    ctor: Devs
  },
]

initWebcore(routes)

document.title = 'Your\'s last Pop it'
