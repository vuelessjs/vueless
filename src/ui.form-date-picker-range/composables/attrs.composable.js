import useUI from "../../composable.ui";
import { cx, cva } from "../../service.ui";

import { computed, watchEffect } from "vue";

import defaultConfig from "../configs/default.config";
import { POSITION } from "../../composable.adjustElementPosition";

export default function useAttrs(props, { isShownMenu, isTop, isRight }) {
  const { config, getAttrs, isSystemKey } = useUI(defaultConfig, () => props.config);
  const attrs = {};

  const openDirectionY = computed(() => (isTop.value ? POSITION.top : POSITION.bottom));
  const openDirectionX = computed(() => (isRight.value ? POSITION.right : POSITION.left));

  const menuClasses = computed(() =>
    cva(config.value.menu)({
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

    if (key === "menu") {
      const menuAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...menuAttrs.value,
        class: cx([menuClasses.value, menuAttrs.value.class]),
      }));
    }

    if (key === "input") {
      const inputActiveAttrs = getAttrs("inputActive", { classes });
      const inputBlurAttrs = getAttrs("inputBlur", { classes });

      attrs[`${key}Attrs`] = computed(() => {
        return isShownMenu.value ? inputActiveAttrs.value : inputBlurAttrs.value;
      });
    }

    if (key === "buttonWrapper") {
      const buttonWrapperAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...buttonWrapperAttrs.value,
        class: cx([
          buttonWrapperAttrs.value.class,
          isShownMenu.value && config.value.buttonWrapperActive,
        ]),
      }));
    }

    if (key === "button") {
      const buttonAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...buttonAttrs.value,
        class: cx([buttonAttrs.value.class, isShownMenu.value && config.value.buttonActive]),
      }));
    }

    if (key === "periodButton") {
      attrs[`${key}Attrs`] = (classes = []) => {
        return getAttrs("periodButton", { classes }).value;
      };
    }

    if (key === "periodDateList") {
      attrs[`${key}Attrs`] = (classes = []) => {
        return getAttrs("periodDateList", { classes }).value;
      };
    }

    if (key === "periodDate") {
      attrs[`${key}Attrs`] = (classes = []) => {
        return getAttrs("periodDate", { classes }).value;
      };
    }

    if (key === "calendar") {
      const calendarAttrs = attrs[`${key}Attrs`];

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
