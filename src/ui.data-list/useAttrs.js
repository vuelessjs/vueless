import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["labelCrossed"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    label: {
      extend: computed(() => [extendingKeysClasses.labelCrossed.value]),
    },
  });

  // if (key === "label") {
  //   const labelAttrs = attrs[`${key}Attrs`];

  //   attrs[`${key}Attrs`] = computed(() => (isActive) => ({
  //     ...labelAttrs,
  //     class: cx([
  //       labelAttrs.value.class,
  //       isActive !== undefined && !isActive ? config.value.labelCrossed : "",
  //     ]),
  //   }));
  // }

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
