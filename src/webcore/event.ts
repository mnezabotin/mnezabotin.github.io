import type { Event } from '@/webcore/types'

export const useEvent = (): Event => {
  const resizeEvents: Function[] = []

  const addEventResize = (func: Function) => {
    resizeEvents.push(func)
  }

  const onResizeEvents = () => resizeEvents.forEach(f => f())

  const removeAllEvents = () => {
    resizeEvents.splice(0)
  }

  return {
    addEventResize,
    onResizeEvents,
    removeAllEvents,
  }
}
