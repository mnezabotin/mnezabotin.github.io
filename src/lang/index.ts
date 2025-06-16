import { en } from './en'
import { ru } from './ru'
import type { Language } from './types'

let lang: Language = ru

export const setLang = (l: string) => {
  switch (l) {
    case 'ru':
      lang = ru
      break;
    default:
      lang = en
  }
}

export const useLang = (): Language => lang
