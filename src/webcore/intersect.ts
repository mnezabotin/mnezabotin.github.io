import { Point } from '@/webcore/types'

export const intersect = (a: Point, b: Point): boolean => {
  const ar = a.r || 0
  const br = b.r || 0

  const ax = a.x || 0
  const ay = a.y || 0

  const bx = b.x || 0
  const by = b.y || 0

  const xd = Math.pow(Math.abs(ax - bx), 2)
  const yd = Math.pow(Math.abs(ay - by), 2)
  const rd = Math.pow(ar + br, 2)

  return xd + yd <= rd
}

export const intersectArc = (a: Point, b: Point): boolean => {
  const xd = Math.pow(Math.abs(a.x - b.x), 2)
  const yd = Math.pow(Math.abs(a.y - b.y), 2)

  const ar = a.r || 0
  const br = b.r || 0
  const rd = Math.pow(ar + br, 2)

  return xd + yd <= rd
}

export const intersectRect = (a: Point, b: Point): boolean => {
  const ar = a.r || 0
  const br = b.r || 0

  return Math.abs(a.x - b.x) <= (ar + br) && Math.abs(a.y - b.y) <= (ar + br)
}
