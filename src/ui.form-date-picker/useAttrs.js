import useUI from "../composables/useUI.js";
import { cva } from "../utils/utilUI.js";
import { computed, watchEffect } from "vue";
import { merge } from "lodash-es";

import defaultConfig from "./config.js";
import { POSITION } from "../composables/useAutoPosition.js";

export default function useAttrs(props, { isShownCalendar, isTop, isRight }) {
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
          openDirectionY: isTop.value ? POSITION.top : POSITION.bottom,
          openDirectionX: isRight.value ? POSITION.right : POSITION.left,
          error: Boolean(props.error),
          description: Boolean(props.description),
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "input") {
      const inputAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...inputAttrs.value,
        config: {
          ...inputAttrs.value.config,
          ...(isShownCalendar.value ? config.value.inputFocused : {}),
        },
      }));
    }

    if (key === "calendar") {
      /* Merging DatePicker's i18n translations into Calendar's i18n translations. */
      watchEffect(() => {
        const calendarConfig = attrs[`${key}Attrs`].value.config || {};

        if (!calendarConfig.i18n || props.config.i18n) {
          attrs[`${key}Attrs`].value.config.i18n = merge(calendarConfig.i18n, config.value.i18n);
        }
      });
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
