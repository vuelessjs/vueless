import { computed } from "vue";
import { merge } from "lodash-es";

import { COMPONENTS } from "../constants";
import { useLocaleTm } from "./useLocaleTm";

export function useComponentLocaleMessages<TLocale>(
  componentName: keyof typeof COMPONENTS,
  defaultLocale: Record<string, unknown>,
  propsLocale: Record<string, unknown> = {},
) {
  const { messages: globalComponentMassages } = useLocaleTm(componentName);

  const localeMessages = computed(
    () => merge({}, defaultLocale, globalComponentMassages.value, propsLocale) as TLocale,
  );

  return { localeMessages };
}
