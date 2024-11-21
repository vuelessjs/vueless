import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UCheckboxMultiStateProps, Config } from "./types.ts";
import type { UCheckboxProps } from "../ui.form-checkbox/types.ts";

type ComponentState = {
  selected: Ref<{ icon?: string }>;
};

type MultiStateCheckboxAttrs = {
  value?: Partial<UCheckboxProps["value"]>;
  config?: {
    defaults?: {
      checkedIcon?: string;
    };
  };
};

export default function useAttrs(
  props: UCheckboxMultiStateProps,
  { selected }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);
  const keysAttrs = getKeysAttrs();

  const checkboxAttrs = keysAttrs.multiStateCheckboxAttrs as Ref<MultiStateCheckboxAttrs>;

  keysAttrs.multiStateCheckboxAttrs = computed(() => {
    if (selected.value.icon) {
      checkboxAttrs.value = checkboxAttrs.value || {};
      checkboxAttrs.value.config = checkboxAttrs.value.config || {};
      checkboxAttrs.value.config.defaults = checkboxAttrs.value.config.defaults || {};
      checkboxAttrs.value.config.defaults.checkedIcon = selected.value.icon;
    }

    return checkboxAttrs.value;
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
