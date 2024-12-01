import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { URadioProps, Config } from "./types.ts";

type ComponentState = {
  radioColor: Ref<string>;
  radioSize: Ref<string>;
};

export default function useAttrs(
  props: URadioProps,
  { radioColor, radioSize }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    color: radioColor.value,
    size: radioSize.value,
    label: Boolean(props.label),
    error: Boolean(props.error),
  }));

  return { config, ...getKeysAttrs(mutatedProps) };
}
