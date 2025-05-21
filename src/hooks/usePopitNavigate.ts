import { Props as PopitProps } from '@/shapes/popit'
import { useWebcore } from '@/webcore'

export const usePopitNavigate = (popit: PopitProps, to: string) => {
  const { addEventClick, intersect, useTimer, navigate } = useWebcore()
  addEventClick((x, y) => {
    if (intersect({ x, y }, popit)) {
      popit.p = true
      useTimer(() => {
        navigate(to)
      }, 100)
    }
  })
}
