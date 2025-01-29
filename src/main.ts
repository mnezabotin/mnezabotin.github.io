import { Opening } from '@/screens'

import { initWebcore } from '@/webcore'

import type { Route } from '@/webcore/types'

const routes: Route[] = [
  {
    name: 'opening',
    ctor: Opening
  }
]

initWebcore(routes)

document.title = 'Your\'s last Pop it'
