import { inject } from "vue";
import { createVuelessAdapter } from "../adapter.locale/vueless.ts";

import type { InjectionKey } from "vue";
import type { LocaleInstance, LocaleOptions } from "../types.ts";

export const LocaleSymbol: InjectionKey<LocaleInstance> = Symbol.for("vueless:locale");

export function createLocale(options?: LocaleOptions) {
  const i18n =
    options?.adapter && options?.adapter?.name ? options?.adapter : createVuelessAdapter(options);

  return { ...i18n };
}

export function useLocale() {
  const locale = inject(LocaleSymbol);

  if (!locale) throw new Error("[vueless] Could not find injected locale instance");

  return locale;
}
