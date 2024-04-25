export default function createVueI18nAdapter(i18n) {
  const locale = i18n.global.locale;
  const fallback = i18n.global.fallbackLocale;
  const messages = i18n.global.messages;

  return {
    name: "vue-i18n",
    locale,
    fallback,
    messages,
    t: (key, ...params) => i18n.global.t(key, params),
    n: i18n.global.n,
  };
}
