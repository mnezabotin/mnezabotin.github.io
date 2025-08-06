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

  const sdk = await useSdk()

  await initWebcore(routes, sounds, sdk)
}

initApp()
