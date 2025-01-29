import type { Route, Screen, Render } from '@/webcore/types'

const SCREEN_KEY = 'screen'

export function Screen(routes: Route[]): Screen {
  const getRoute = (name?: string): Route | undefined => routes.find(r => r.name === name)

  const getRender = (name?: string) => {
    if (!name) {
      const params = new URLSearchParams(window.location.search)
      name = params.get(SCREEN_KEY) || undefined
    }

    const route = getRoute(name) || routes[0]

    return route?.ctor() || (() => {})
  }

  const instance: Screen = {
    render: () => {},
    resizeEvents: [],
    resizeEvent: (event: Render) => {
      instance.resizeEvents.push(event)
    },
    navigate: (name: string) => {
      window.location.search = `${SCREEN_KEY}=${name}`
      instance.resizeEvents = []
      instance.render = getRender(name)
    },
    resize: () => instance.resizeEvents.forEach(e => e()),
    mount: () => {
      instance.render = getRender()
    }
  }

  return instance
}
