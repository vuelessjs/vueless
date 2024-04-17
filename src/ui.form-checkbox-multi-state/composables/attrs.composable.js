import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props, { selected }) {
  const { getAttrs } = useUI(defaultConfig, () => props.config);

  const checkboxAttrsRaw = getAttrs("checkbox", { isComponent: true });

  const checkboxAttrs = computed(() => {
    if (!checkboxAttrsRaw.value.config) {
      checkboxAttrsRaw.value.config = {};
    }

    checkboxAttrsRaw.value.config.selectedIconName = selected.value.icon;

    return checkboxAttrsRaw.value;
  });

  return {
    checkboxAttrs,
  };
}
