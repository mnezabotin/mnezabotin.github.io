import type { Route, Router, ScreenMeta } from '@/webcore/types'

export const useRouter = (routes: Route[], clearStage: Function): Router => {
  let to: string[] = []
  let from: string[] = []
  let data: any

  const getRoute = (name?: string): Route | undefined => routes.find(r => r.name === name) || routes[0]

  const useScreenMeta = (): ScreenMeta => ({
    to,
    from,
    data
  })

  const applyRoute = (name?: string) => {
    const route = getRoute(name)
    route?.ctor()
    to.push(route?.name || '')
  }

  const navigate = (name?: string | string[], meta?: any) => {
    clearStage()
    from = to
    to = []
    data = meta
    if (Array.isArray(name)) {
      for (const n of name) {
        applyRoute(n)
      }
    } else {
      applyRoute(name)
    }
  }

  return {
    useScreenMeta,
    navigate
  }
}
