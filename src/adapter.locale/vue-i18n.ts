import type { I18n } from "vueless/vue-i18n";
import type { LocaleInstance } from "../types";

export function createVueI18nAdapter(i18n: I18n): LocaleInstance {
  return {
    name: "vue-i18n",
    locale: i18n.global.locale,
    fallback: i18n.global.fallbackLocale as string,
    messages: i18n.global.messages,
    t: (key: string, ...params: unknown[]) => i18n.global.t(key, params),
    tm: i18n.global.tm,
    n: i18n.global.n,
  };
}
