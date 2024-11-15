import { computed, useSlots } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { ULinkProps, Config } from "./types.ts";

type ActiveState = {
  isActive: Ref<boolean>;
  isExactActive: Ref<boolean>;
};

export default function useAttrs(
  props: ULinkProps,
  { isActive, isExactActive }: ActiveState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI<Config>(
    defaultConfig,
    () => props.config,
    "link",
  );
  const slots = useSlots();

  const extendingKeys = ["linkWithChild"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    wrapper: {
      extend: computed(() => [
        hasSlotContent(slots["default"]) && extendingKeysClasses.linkWithChild.value,
        isActive.value && props.wrapperActiveClass,
        isExactActive.value && props.wrapperExactActiveClass,
      ]),
    },
    link: {
      extend: computed(() => [
        hasSlotContent(slots["default"]) && extendingKeysClasses.linkWithChild.value,
        isActive.value && props.activeClass,
        isExactActive.value && props.exactActiveClass,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
