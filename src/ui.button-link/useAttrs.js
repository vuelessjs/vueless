import { computed, useSlots } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

export default function useAttrs(props, { isActive, isExactActive }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
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
