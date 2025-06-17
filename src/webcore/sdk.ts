import { Sdk } from './types'

export const useSdk = (): Sdk => ({
  ready: () => {},
  showFullscreenAdv: () => {},
  gameplayStart: () => {},
  gameplayStop: () => {},
})
