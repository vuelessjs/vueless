import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import { computed } from "vue";

import defaultConfig from "../configs/default.config";

export default function useAttrs(props) {
  const { config, getAttrs, isSystemKey } = useUI(defaultConfig, () => props.config);
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
        });
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "timepickerLeftInput") {
      const timepickerLeftInputAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...timepickerLeftInputAttrs.value,
        class: cx([config.value.timepickerInput, timepickerLeftInputAttrs.value.class]),
      }));
    }

    if (key === "timepickerRightInput") {
      const timepickerRightInputAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...timepickerRightInputAttrs.value,
        class: cx([config.value.timepickerInput, timepickerRightInputAttrs.value.class]),
      }));
    }

    // TODO: Need to find other solution
    if (key === "day") {
      attrs[`${key}Attrs`] = (classes) => {
        return getAttrs("day", { classes }).value;
      };
    }

    if (key === "month") {
      attrs[`${key}Attrs`] = (classes) => {
        return getAttrs("month", { classes }).value;
      };
    }

    if (key === "year") {
      attrs[`${key}Attrs`] = (classes) => {
        return getAttrs("year", { classes }).value;
      };
    }
  }

  return {
    ...attrs,
    config,
  };
}
