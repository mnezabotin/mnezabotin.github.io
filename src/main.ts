import { Opening, Devs } from '@/screens'

import { initWebcore } from '@/webcore'

import type { Route } from '@/webcore/types'

const routes: Route[] = [
  {
    name: 'opening',
    ctor: Opening
  },
  {
    name: 'devs',
    ctor: Devs
  }
]

initWebcore(routes)

document.title = 'Your\'s last Pop it'
