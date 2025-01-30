import type { Route, Router, Render } from '@/webcore/types'

export const useRouter = (routes: Route[]): Router => {
  const getRoute = (name?: string): Route | undefined => routes.find(r => r.name === name)

  const getRender = (name?: string): Render => getRoute(name)?.ctor() || routes[0]?.ctor() || (() => {})

  const instance: Router = {
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
