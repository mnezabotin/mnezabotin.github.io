import { Application, Color } from 'pixi.js'
import { Stage } from './types'

export const useStage = (core: Application): Stage => {
  const shade = (color: string, percent: number): string => {
    color = color.substring(1)
    const num = parseInt(color, 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt, 
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt

    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
  }

  const clearStage = () => {
    while (core.stage.children.length > 0) {
      core.stage.removeChild(core.stage.getChildAt(0))
    }
  }

  const setBackground = (color: string, pureColor?: string) => {
    core.renderer.background.color = new Color(color)
    // document.body.style.background = color
    if (pureColor) {
      document.body.style.backgroundColor = pureColor
      document.querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', pureColor)
    }
  }

  return {
    shade,
    clearStage,
    setBackground,
  }
}
