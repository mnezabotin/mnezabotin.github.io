import { Point, Rectangle } from '@/webcore/types'

export const intersectArc = (a: Point, b: Point): boolean => {
  const xd = Math.pow(Math.abs(a.x - b.x), 2)
  const yd = Math.pow(Math.abs(a.y - b.y), 2)

  const ar = a.r || 0
  const br = b.r || 0
  const rd = Math.pow(ar + br, 2)

  return xd + yd <= rd
}

export const intersectSquare = (a: Point, b: Point): boolean => {
  const ar = a.r || 0
  const br = b.r || 0

  return Math.abs(a.x - b.x) <= (ar + br) && Math.abs(a.y - b.y) <= (ar + br)
}

export const intersectRect = (a: Point, b: Rectangle): boolean => {
  const ar = a.r || 0
  const bw = b.w || 0
  const bh = b.h || 0

  return Math.abs(b.x + bw / 2 - a.x) <= bw / 2 + ar &&
    Math.abs(b.y + bh / 2 - a.y) <= bh / 2 + ar
}

export const intersect = (a: Point, b: Point): boolean => intersectArc(a, b)
