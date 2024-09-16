import { inject } from "vue";
import createVuelessAdapter from "../adatper.locale/vueless.js";

export const LocaleSymbol = Symbol.for("vueless:locale");

function isLocaleInstance(obj) {
  return obj.name !== null;
}

export function createLocale(options) {
  const i18n =
    options?.adapter && isLocaleInstance(options?.adapter)
      ? options?.adapter
      : createVuelessAdapter(options);

  return { ...i18n };
}

export function useLocale() {
  const locale = inject(LocaleSymbol);

  if (!locale) throw new Error("[vueless] Could not find injected locale instance");

  return locale;
}
