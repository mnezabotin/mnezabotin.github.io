import type { Sdk } from '@/webcore/types'

export const useEmptySdk = (): Sdk => ({
  ready: () => {},
  showFullscreenAdv: () => {},
  gameplayStart: () => {},
  gameplayStop: () => {},
  showBannerAdv: () => {},
})
