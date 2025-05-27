import { createI18n } from 'vue-i18n'
import en from '@/plugins/locale/en'
import fr from '@/plugins/locale/fr'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
  },
})

export default i18n
