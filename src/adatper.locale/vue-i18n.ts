import type { I18n } from "vue-i18n";

export default function createVueI18nAdapter(i18n: I18n) {
  return {
    name: "vue-i18n",
    locale: i18n.global.locale,
    fallback: i18n.global.fallbackLocale,
    messages: i18n.global.messages,
    // @ts-expect-error Type instantiation is excessively deep and possibly infinite
    t: (key: string, ...params: unknown[]) => i18n.global.t(key, params),
    tm: i18n.global.tm,
    n: i18n.global.n,
  };
}
