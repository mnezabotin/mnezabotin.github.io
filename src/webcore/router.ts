import type { Route, Router, ScreenMeta } from '@/webcore/types'

export const useRouter = (routes: Route[]): Router => {
  let to: string = ''
  let from: string = ''
  let data: any

  const getRoute = (name?: string): Route | undefined => routes.find(r => r.name === name) || routes[0]

  const useScreenMeta = (): ScreenMeta => ({
    to,
    from,
    data
  })

  const instance: Router = {
    render: () => {},
    navigate: (name?: string, meta?: any) => {
      const route = getRoute(name)
      from = to || ''
      to = route?.name || ''
      data = meta
      instance.render = route?.ctor() || (() => {})
    },
    useScreenMeta
  }

  return instance
}
