import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";
import { computed, watchEffect } from "vue";

import defaultConfig from "../configs/default.config";
import { POSITION } from "../../composable.adjustElementPosition";

export default function useAttrs(props, { isShownCalendar, isTop, isRight }) {
  const { config, getAttrs, isSystemKey } = useUI(defaultConfig, () => props.config);
  const attrs = {};

  const openDirectionY = computed(() => (isTop.value ? POSITION.top : POSITION.bottom));
  const openDirectionX = computed(() => (isRight.value ? POSITION.right : POSITION.left));

  const calendarWrapperClasses = computed(() =>
    cva(config.value.calendar.wrapper)({
      openDirectionY: openDirectionY.value,
      openDirectionX: openDirectionX.value,
    }),
  );

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

    if (key === "input") {
      const inputActiveAttrs = getAttrs("inputActive", { classes });
      const inputBlurAttrs = getAttrs("inputBlur", { classes });

      attrs[`${key}Attrs`] = computed(() => {
        return isShownCalendar.value ? inputActiveAttrs.value : inputBlurAttrs.value;
      });
    }

    if (key === "calendar") {
      const calendarAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...calendarAttrs.value,
        class: cx([calendarWrapperClasses.value, calendarAttrs.value.class]),
      }));

      // This watcher rewrites default calendar locales with datepicker range locales
      // Watcher will not rewrite custom calendar locales
      watchEffect(() => {
        if (!calendarAttrs.value.config) {
          calendarAttrs.value.config = {};
        }

        if (calendarAttrs.value.config.i18n || !props.config.i18n) {
          return;
        }

        calendarAttrs.value.config.i18n = {
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
          calendarAttrs.value.config.i18n.userFormat = {
            ...config.value.i18n.weekdays.userFormat,
          };
        }

        if (props.config.i18n.months.userFormat) {
          calendarAttrs.value.config.i18n.userFormat = {
            ...config.value.i18n.months.userFormat,
          };
        }
      });
    }
  }

  return {
    ...attrs,
    config,
  };
}
