import { useWebcore } from "@/webcore"

export const Icon = (c: string, p = false) => {
  const { shade } = useWebcore()

  const stops: string[] = []

  const getStop = (p: number, c: string) => `<stop offset="${100 - p * 100}%" stop-color="${c}" />`

  if (p) {
    stops.push(getStop(1, shade(c, -4)))
    stops.push(getStop(0.6, shade(c, -6)))
    stops.push(getStop(0.34, shade(c, -12)))
    stops.push(getStop(0.3, shade(c, -8)))
    stops.push(getStop(0.24, shade(c, -10)))
  } else {
    stops.push(getStop(1, shade(c, 10)))
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
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <radialGradient id="popitGradient">
          ${stops.join('')}
        </radialGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="${shade(c, -3)}" />
      <circle cx="256" cy="256" r="224" fill="url('#popitGradient')" />
    </svg>
  `
}
