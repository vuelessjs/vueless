import useUI from "../composables/useUI.js";
import { cva } from "../utils/utilUI.js";
import { computed, watchEffect } from "vue";

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
      // This watcher rewrites default calendar locales with datepicker range locales
      // Watcher will not rewrite custom calendar locales
      watchEffect(() => {
        if (!attrs[`${key}Attrs`].value.config) {
          attrs[`${key}Attrs`].value.config = {};
        }

        if (attrs[`${key}Attrs`].value.config.i18n || !props.config.i18n) {
          return;
        }

        attrs[`${key}Attrs`].value.config.i18n = {
          ...config.value.i18n,
          weekdays: {
            shorthand: { ...config.value.i18n.weekdays.shorthand },
            longhand: { ...config.value.i18n.weekdays.longhand },
          },
          months: {
            shorthand: { ...config.value.i18n.months.shorthand },
            longhand: { ...config.value.i18n.months.longhand },
          },
        };

        if (props.config.i18n.weekdays.userFormat) {
          attrs[`${key}Attrs`].value.config.i18n.userFormat = {
            ...config.value.i18n.weekdays.userFormat,
          };
        }

        if (props.config.i18n.months.userFormat) {
          attrs[`${key}Attrs`].value.config.i18n.userFormat = {
            ...config.value.i18n.months.userFormat,
          };
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
