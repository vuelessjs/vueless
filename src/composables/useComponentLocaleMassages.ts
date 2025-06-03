import { computed, ref, watch } from "vue";
import { merge } from "lodash-es";
import { recursiveRt } from "../adapter.locale/vueless.ts";

import { useLocale } from "./useLocale.ts";

import { COMPONENTS } from "../constants";

import type { VueMessageType } from "vue-i18n";

export function useComponentLocaleMessages<TLocale>(
  componentName: keyof typeof COMPONENTS,
  defaultLocale: Record<string, unknown>,
  propsLocale: Record<string, unknown> = {},
) {
  const { tm, locale } = useLocale();

  const globalComponentMassages = ref(recursiveRt(tm(componentName) as VueMessageType));

  watch(locale, () => {
    globalComponentMassages.value = recursiveRt(tm(componentName) as VueMessageType);
  });

  const localeMessages = computed(
    () => merge({}, defaultLocale, globalComponentMassages.value, propsLocale) as TLocale,
  );

  return { localeMessages };
}
