import type { Event } from '@/webcore/types'

export const useEvent = (): Event => {
  const resizeEvents: Function[] = []
  const clickEvents: Function[] = []

  const addEventResize = (func: Function) => {
    func()
    resizeEvents.push(func)
  }

  const onResizeEvents = () => resizeEvents.forEach(f => f())

  const addEventClick = (func: Function) => {
    func()
    resizeEvents.push(func)
  }

  const onClickEvents = () => clickEvents.forEach(f => f())

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
