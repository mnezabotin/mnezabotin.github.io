// import type { StageEntity } from './stage'

// export type Router = {
//   resize: () => void
//   render: () => void
//   push: (screen: string, opt?: Record<string, string>) => void
//   getParams: () => URLSearchParams
// }

// export type Route = {
//   name: string
//   ctor: () => StageEntity
// }

// export function Router(routes: Route[]): Router {
//   const memory: Record<string, StageEntity> = {}
//   let current: StageEntity[]

//   const getParams = (): URLSearchParams => new URLSearchParams(window.location.search)

//   const setPages = () => {
//     const screen = getParams().get('screen')
//     const hh = screen?.split(',')
//     if (!hh) {
//       screens[routes[0].name] = routes[0].ctor()
//       pages= [routes[0].ctor()]
//       return
//     }
//     const result = []
//     for (const h of hh || []) {
      
//     }
//   }

//   const push = (screen: string, opts?: Record<string, string>): void => {
//     const params = new URLSearchParams({
//       ...(opts || {}),
//       screen,
//     })
//     window.location.search = params.toString()
//     setPages()
//   }

//   const resize = () => pages.forEach(p => p.resize())

//   const render = () => pages.forEach(p => p.resize())

//   return {
//     push,
//     getParams,
//     resize,
//     render,
//   }
// }
