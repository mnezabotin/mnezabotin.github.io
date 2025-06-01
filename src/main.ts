import { Opening, Main, Game, Gameover, GameScore, Score, Devs } from '@/screens'

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
    name: 'gameover',
    ctor: Gameover
  },
  {
    name: 'gamescore',
    ctor: GameScore
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

const sounds = [
  '/sounds/pop1.mp3',
  '/sounds/pop2.mp3',
  '/sounds/pop3.mp3',
  '/sounds/pop4.mp3',
  '/sounds/pop5.mp3',
  '/sounds/pop6.mp3',
  '/sounds/pop7.mp3',
  '/sounds/pop8.mp3',
  '/sounds/pop9.mp3',
  '/sounds/pop10.mp3',
  '/sounds/pop11.mp3',
  '/sounds/pop12.mp3',
  '/sounds/pop13.mp3',
  '/sounds/pop14.mp3',
  '/sounds/pop15.mp3',
]

initWebcore(routes, sounds)

document.title = 'Your\'s last Pop it'
