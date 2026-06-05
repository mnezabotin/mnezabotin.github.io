import { Assets } from 'pixi.js'

import { routes } from '@/routes'
import { sounds } from '@/hooks'
import { useSdk } from '@/sdk'

import { initWebcore } from '@/webcore'

document.title = 'Yo last Pop it'
document.body.oncontextmenu = () => false

const initApp = async () => {
  if (
    'serviceWorker' in navigator &&
    import.meta.env.MODE !== 'development'
  ) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
  }

  await Assets.load([
    './fonts/PressStart2P.ttf',
    './fonts/Tijuf.otf',
  ])

  const sdk = await useSdk()

  await initWebcore(routes, sounds, sdk)
}

initApp()
