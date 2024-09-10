import useUI from "../../composables/useUI";
import { cva } from "../../utils/utilsUI";
import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props, { selected }) {
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

    if (key === "checkbox") {
      const checkboxAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => {
        if (!checkboxAttrs.value.config) {
          checkboxAttrs.value.config = {};
        }

        checkboxAttrs.value.config.selectedIconName = selected.value.icon;

        return checkboxAttrs.value;
      });
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
