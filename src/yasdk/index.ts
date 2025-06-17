import { Sdk } from '@/webcore/types'
import type { SDK as YaSDK } from 'ysdk';

export const useYaSdk = async (): Promise<Sdk> => new Promise((resolve) => {
  let ysdk: YaSDK | null = null

  const ready = () => {
    ysdk?.features?.LoadingAPI?.ready()
  }

  const showFullscreenAdv = () => {
    ysdk?.adv?.showFullscreenAdv()
  }

  const gameplayStart = () => {
    ysdk?.features?.GameplayAPI?.start()
    ysdk?.adv?.hideBannerAdv()
  }

  const gameplayStop = () => {
    ysdk?.features?.GameplayAPI?.stop()
    ysdk?.adv?.showBannerAdv()
  }

  const initSDK = async () => {
    try {
      ysdk = await YaGames?.init?.()
    } catch (e) {
      console.error(e)
    }

    resolve({
      ready,
      showFullscreenAdv,
      gameplayStart,
      gameplayStop,
    })
  }

  const s = document.createElement('script')
  s.src = 'https://sdk.games.s3.yandex.net/sdk.js'
  s.onload = initSDK
  document.body.append(s)
})
