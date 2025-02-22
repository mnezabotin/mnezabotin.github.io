import type { Event } from '@/webcore/types'

export const useEvent = (): Event => {
  const resizeEvents: Function[] = []
  const clickEvents: ((x: number, y: number) => void)[] = []

  const addEventResize = (func: Function) => {
    func()
    resizeEvents.push(func)
  }

  const onResizeEvents = () => resizeEvents.forEach(f => f())

  const addEventClick = (func: (x: number, y: number) => void) => {
    clickEvents.push(func)
  }

  const onClickEvents = (x: number, y: number) => clickEvents.forEach(f => f(x, y))

  const removeAllEvents = () => {
    resizeEvents.splice(0)
    clickEvents.splice(0)
  }

  return {
    addEventResize,
    onResizeEvents,

    addEventClick,
    onClickEvents,

    removeAllEvents,
  }
}
