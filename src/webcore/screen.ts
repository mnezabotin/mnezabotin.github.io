import type { Route, Screen, Render } from '@/webcore/types'

export const useScreen = (routes: Route[]): Screen => {
  const getRoute = (name?: string): Route | undefined => routes.find(r => r.name === name)

  const getRender = (name?: string): Render => getRoute(name)?.ctor() || routes[0]?.ctor() || (() => {})

  const instance: Screen = {
    render: () => {},
    navigate: (name: string) => {
      instance.render = getRender(name)
    },
    mount: () => {
      instance.render = getRender()
    }
  }

  return instance
}
