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
  // '/sounds/pop1.mp3',
  // '/sounds/pop2.mp3',
  // '/sounds/pop3.mp3',
  // '/sounds/pop4.mp3',
  // '/sounds/pop5.mp3',
  // '/sounds/pop6.mp3',
  // '/sounds/pop7.mp3',
  // '/sounds/pop8.mp3',
  // '/sounds/pop9.mp3',
  // '/sounds/pop10.mp3',
  // '/sounds/pop11.mp3',
  // '/sounds/pop12.mp3',
  // '/sounds/pop13.mp3',
  // '/sounds/pop14.mp3',
  // '/sounds/pop15.mp3',
  // '/sounds/pop16.mp3',
  
  '/sounds/new/pop1.mp3',
  '/sounds/new/pop2.mp3',
  '/sounds/new/pop3.mp3',
  '/sounds/new/pop4.mp3',
  '/sounds/new/pop5.mp3',
  '/sounds/new/pop6.mp3',
  '/sounds/new/pop7.mp3',
  '/sounds/new/pop8.mp3',
  '/sounds/new/pop9.mp3',
  '/sounds/new/pop10.mp3',
  '/sounds/new/pop11.mp3',
  '/sounds/new/pop12.mp3',
  '/sounds/new/pop13.mp3',
  '/sounds/new/pop14.mp3',
  '/sounds/new/pop15.mp3',
  '/sounds/new/pop16.mp3',
  '/sounds/new/pop17.mp3',
  '/sounds/new/pop18.mp3',
  '/sounds/new/pop19.mp3',
  '/sounds/new/pop20.mp3',
  '/sounds/new/pop21.mp3',
  '/sounds/new/pop22.mp3',
  '/sounds/new/pop23.mp3',
  '/sounds/new/pop24.mp3',
  '/sounds/new/pop25.mp3',
  '/sounds/new/pop26.mp3',
  '/sounds/new/pop27.mp3',
  '/sounds/new/pop28.mp3',
  '/sounds/new/pop29.mp3',
  '/sounds/new/pop30.mp3',
  '/sounds/new/pop31.mp3',

  
  '/sounds/rinat/pop(1).wav',
  '/sounds/rinat/pop(2).wav',
  '/sounds/rinat/pop(3).wav',
  '/sounds/rinat/pop(4).wav',
  '/sounds/rinat/pop(5).wav',
  '/sounds/rinat/pop(6).wav',
  '/sounds/rinat/pop(7).wav',
  '/sounds/rinat/pop(8).wav',
  '/sounds/rinat/pop(9).wav',
  '/sounds/rinat/pop(10).wav',
  '/sounds/rinat/pop(11).wav',
  '/sounds/rinat/pop(12).wav',

  '/sounds/fail-fast.mp3',
  '/sounds/new/wrong.mp3',
  '/sounds/win.mp3',
]

initWebcore(routes, sounds)

document.title = 'Yo last Pop it'
