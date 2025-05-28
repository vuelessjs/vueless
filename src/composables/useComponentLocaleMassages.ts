import { computed, ref, watch } from "vue";
import { merge } from "lodash-es";

import { COMPONENTS } from "../constants";
import { useLocale } from "./useLocale.ts";

export function useComponentLocaleMessages<TLocale>(
  componentName: keyof typeof COMPONENTS,
  defaultLocale: Record<string, unknown>,
  propsLocale: Record<string, unknown> = {},
) {
  const { tm, locale } = useLocale();

  const globalComponentMassages = ref(tm(componentName));

  watch(locale, () => {
    globalComponentMassages.value = tm(componentName);
  });

  const localeMessages = computed(
    () => merge({}, defaultLocale, globalComponentMassages.value, propsLocale) as TLocale,
  );

  return { localeMessages };
}
