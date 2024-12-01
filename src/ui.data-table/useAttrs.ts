import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Row, UTableProps, Config } from "./types.ts";
import type { UseAttrs } from "../types.ts";
import type { Ref } from "vue";

export type ComponentState = {
  tableRows: Ref<Row[]>;
  isShownActionsHeader: Ref<boolean>;
  isHeaderSticky: Ref<boolean>;
  isFooterSticky: Ref<boolean>;
};

export default function useAttrs(
  props: UTableProps,
  { isShownActionsHeader, isHeaderSticky, isFooterSticky }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    /* component state, not a props */
    actionsHeader: isShownActionsHeader.value,
    stickedHeader: isHeaderSticky.value,
    stickedFooter: isFooterSticky.value,
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return { config, ...keysAttrs };
}
