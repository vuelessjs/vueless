import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props, { isShownCalendar }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);

  const calendarAttrs = getAttrs("calendar");
  const inputBlurAttrs = getAttrs("input");
  const inputActiveAttrs = getAttrs("inputActive");

  const inputAttrs = computed(() => {
    return isShownCalendar.value ? inputActiveAttrs.value : inputBlurAttrs.value;
  });

  return {
    config,
    calendarAttrs,
    inputAttrs,
  };
}
