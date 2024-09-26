import { computed, watchEffect } from "vue";
import { merge } from "lodash-es";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";
import { POSITION } from "../composables/useAutoPosition.js";

export default function useAttrs(props, { isShownCalendar, isTop, isRight }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const mutatedProps = computed(() => ({
    openDirectionY: isTop.value ? POSITION.top : POSITION.bottom,
    openDirectionX: isRight.value ? POSITION.right : POSITION.left,
    error: Boolean(props.error),
    description: Boolean(props.description),
  }));

  const extendingKeys = ["inputFocused"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    input: {
      extend: computed(() => [isShownCalendar.value && extendingKeysClasses.inputFocused.value]),
    },
  });

  /* Merging DatePicker's i18n translations into Calendar's i18n translations. */
  watchEffect(() => {
    const calendarConfig = keysAttrs.calendarAttrs.value.config || {};

    if (!calendarConfig.i18n || props.config.i18n) {
      keysAttrs.calendarAttrs.value.config.i18n = merge(calendarConfig.i18n, config.value.i18n);
    }
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
