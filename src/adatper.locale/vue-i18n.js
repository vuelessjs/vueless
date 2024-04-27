export default function createVueI18nAdapter(i18n) {
  return {
    name: "vue-i18n",
    locale: i18n.global.locale,
    fallback: i18n.global.fallbackLocale,
    messages: i18n.global.messages,
    t: (key, ...params) => i18n.global.t(key, params),
    tm: i18n.global.tm,
    n: i18n.global.n,
  };
}
