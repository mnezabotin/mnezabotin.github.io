import { useWebcore } from "@/webcore"

export const Icon = (c: string) => {
  const { shade } = useWebcore()

  const getStop = (p: number, c: string) => `<stop offset="${100 - p * 100}%" stop-color="${c}" />`
  
  const getGradient = (n: string, p = false) => {
    const stops: string[] = []

    if (p) {
      stops.push(getStop(1, shade(c, -4)))
      stops.push(getStop(0.6, shade(c, -6)))
      stops.push(getStop(0.34, shade(c, -12)))
      stops.push(getStop(0.3, shade(c, -8)))
      stops.push(getStop(0.24, shade(c, -10)))
    } else {
      // stops.push(getStop(1, shade(c, 10)))
      stops.push(getStop(1, shade(c, 12)))
      stops.push(getStop(0.5, shade(c, 5)))
      stops.push(getStop(0.34, shade(c, 0)))
      stops.push(getStop(0.3, shade(c, -2)))
      stops.push(getStop(0.26, shade(c, -8)))
      stops.push(getStop(0.24, shade(c, -12)))
    }

    stops.push(getStop(0.22, shade(c, -15)))
    stops.push(getStop(0.18, shade(c, -5)))
    stops.push(getStop(0.15, shade(c, -15)))
    stops.push(getStop(0.15, shade(c, 0)))
    stops.push(getStop(0.075, shade(c, 9)))
    stops.push(getStop(0.01, shade(c, 0)))
    stops.push(getStop(0, shade(c, 0)))

    return `
      <radialGradient id="${n}">
        ${stops.join('\n')}
      </radialGradient>
    `
  }

  const pushGName = 'push'
  const popGName = 'pop'
  const count = 2
  const p = 32
  const g = 16
  const w = 512
  const r = (w - p * 2 - (count - 1) * g) / count / 2

  const gradients = [getGradient(pushGName, true), getGradient(popGName, false)]
  const circles = []

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      circles.push(`
        <circle
          cx="${p + r + j * r * 2 + j * g}"
          cy="${p + r + i * r * 2 + i * g}"
          r="${r}"
          fill="url('#${i === count - 1 && j === count - 1 ? popGName : pushGName}')"
        />
      `)
    }
  }

  return `
    <svg
      viewBox="0 0 ${w} ${w}"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        ${gradients.join('\n')}
      </defs>
      
      <rect width="100%" height="100%" fill="${shade(c, -3)}" />
      ${circles.join('\n')}
    </svg>
  `
}
