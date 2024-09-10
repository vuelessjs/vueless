import useUI from "../../composables/useUI.js";
import { cva, cx } from "../../utils/utilUI.js";

import { computed } from "vue";

import defaultConfig from "../configs/default.config";

export default function useAttrs(props) {
  const { config, getAttrs, isSystemKey, hasSlotContent, isCVA } = useUI(
    defaultConfig,
    () => props.config,
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

    // eslint-disable-next-line prettier/prettier
    if (["timepickerInputHours", "timepickerInputMinutes", "timepickerInputSeconds"].includes(key)) {
      const keyAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...keyAttrs.value,
        class: cx([config.value.timepickerInput, keyAttrs.value.class]),
      }));
    }

    // TODO: Need to find other solution
    // classes is not reactive here, which may cause problems in styling by `config` prop
    if (key === "day" || key === "month" || key === "year") {
      attrs[`${key}Attrs`] = (classes) => getAttrs(key, { classes }).value;
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
