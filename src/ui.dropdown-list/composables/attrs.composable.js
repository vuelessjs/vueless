import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, isSystemKey, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  const optionClasses = computed(() =>
    cva(config.value.option)({
      ...props,
    }),
  );

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

    if (key === "subGroupLabel") {
      const subGroupLabelAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...subGroupLabelAttrs.value,
        class: cx([subGroupLabelAttrs.value.class, optionClasses.value]),
      }));
    }

    if (key === "groupLabel") {
      const groupLabelAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...groupLabelAttrs.value,
        class: cx([groupLabelAttrs.value.class, optionClasses.value]),
      }));
    }
  }

  const optionAttrs = (classes = []) => {
    const mergedClasses = cx([optionClasses.value, ...classes]);

    return getAttrs("option", { classes: mergedClasses }).value;
  };

  return {
    ...attrs,
    optionAttrs,
    optionClasses,
    hasSlotContent,
    config,
  };
}
