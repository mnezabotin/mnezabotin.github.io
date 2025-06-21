import { Opening, Main, Game, Gameover, GameScore, Score, Devs } from '@/screens'
import { useYaSdk } from '@/yasdk'

import { initWebcore } from '@/webcore'
import { useSdk } from '@/webcore/sdk'

import type { Route, Sdk } from '@/webcore/types'

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
  './sounds/pop/pop1.mp3',
  './sounds/pop/pop2.mp3',
  './sounds/pop/pop3.mp3',
  './sounds/pop/pop4.mp3',
  './sounds/pop/pop5.mp3',
  './sounds/pop/pop6.mp3',
  './sounds/pop/pop7.mp3',
  './sounds/pop/pop8.mp3',
  './sounds/pop/pop9.mp3',
  './sounds/pop/pop10.mp3',
  './sounds/pop/pop11.mp3',
  './sounds/pop/pop12.mp3',
  './sounds/pop/pop13.mp3',
  './sounds/pop/pop14.mp3',
  './sounds/pop/pop15.mp3',
  './sounds/pop/pop16.mp3',
  './sounds/pop/pop17.mp3',
  './sounds/pop/pop18.mp3',
  './sounds/pop/pop19.mp3',
  './sounds/pop/pop20.mp3',
  './sounds/pop/pop21.mp3',
  './sounds/pop/pop22.mp3',
  './sounds/pop/pop23.mp3',
  './sounds/pop/pop24.mp3',
  './sounds/fail.mp3',
  './sounds/wrong.mp3',
  './sounds/win.mp3',
  './sounds/complete.mp3',
]

document.title = 'Yo last Pop it'

const initApp = async () => {
  let sdk: Sdk

  if (true) {
    sdk = await useYaSdk()
  } else {
    sdk = useSdk()
  }

  // if (
  //   'serviceWorker' in navigator
    // && import.meta.env.MODE !== 'development'
  // ) {
    // await navigator.serviceWorker.register('./sw.js')
    // try {
      // sdk = await useYaSdk()
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  initWebcore(routes, sounds, sdk)
}

initApp()
