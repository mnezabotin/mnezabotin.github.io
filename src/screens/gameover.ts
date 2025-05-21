import { usePopits } from "@/hooks";
import { useWebcore } from "@/webcore";
import { Render } from "@/webcore/types";

export const Gameover = (): Render => {
  const palette = '#ff6347'

  const { setBackground } = useWebcore()

  const { render: popits } = usePopits({ palette, retry: true })

  setBackground(palette)

  return () => {
    popits()
  }
}
