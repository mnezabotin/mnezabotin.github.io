import { useEmptySdk } from './emptySdk'
import { useYandexSdk } from './yandexSdk'

import type { Sdk } from '@/webcore/types'

export const useSdk = async () => {
  let sdk: Sdk

  if (import.meta.env.MODE === 'yandex') {
    sdk = await useYandexSdk()
  } else {
    sdk = useEmptySdk()
  }

  return sdk
}