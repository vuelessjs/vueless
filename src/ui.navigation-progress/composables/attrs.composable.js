import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, getColor, setColor, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    let classes = "";
    let value = config.value[key];

    const isVariants = value.variants || value.compoundVariants;
    const excludeKeys = ["progress", "indicator", "step"];

    if (isVariants && !excludeKeys.includes(key)) {
      const getCVA = cva(value);

      classes = computed(() => getCVA({ ...props }));
    }

    if (isVariants && excludeKeys.includes(key)) {
      const getCVA = cva(value);

      classes = computed(() =>
        setColor(getCVA({ ...props, color: getColor(props.color) }), props.color),
      );
    }

    if (key === "step") {
      const stepAttrsRaw = getAttrs("step", { classes });

      attrs[`${key}Attrs`] = computed(() => (classes) => ({
        ...stepAttrsRaw.value,
        class: cx([stepAttrsRaw.value.class, classes]),
      }));
    } else {
      attrs[`${key}Attrs`] = getAttrs(key, { classes });
    }
  }

  return {
    ...attrs,
    config,
  };
}
