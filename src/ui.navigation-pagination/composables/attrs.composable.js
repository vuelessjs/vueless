import useUI from "../../composables/useUI.js";

import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../utils/utilUI.js";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, isSystemKey, hasSlotContent, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );

  const paginationButtonClasses = computed(() =>
    cva(config.value.paginationButton)({
      ...props,
    }),
  );

  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (
      key === "firstButton" ||
      key === "lastButton" ||
      key === "prevButton" ||
      key === "nextButton" ||
      key === "activeButton" ||
      key === "inactiveButton"
    ) {
      const keyAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...keyAttrs.value,
        class: cx([paginationButtonClasses.value, keyAttrs.value.class]),
      }));
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
