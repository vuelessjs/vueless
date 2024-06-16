import useUI from "../../composable.ui";
import { cva } from "../../service.ui";
import { computed, watchEffect } from "vue";

import defaultConfig from "../configs/default.config";
import { POSITION } from "../../composable.adjustElementPosition";

export default function useAttrs(props, { isShownCalendar, isTop, isRight }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { calendar } = config.value;

  const openDirectionY = computed(() => (isTop.value ? POSITION.top : POSITION.bottom));
  const openDirectionX = computed(() => (isRight.value ? POSITION.right : POSITION.left));

  const cvaCalendarWrapper = cva({
    base: calendar.wrapper.base,
    variants: calendar.wrapper.variants,
    compoundVariants: calendar.wrapper.compoundVariants,
  });

  const calendarWrapperClasses = computed(() =>
    cvaCalendarWrapper({
      openDirectionY: openDirectionY.value,
      openDirectionX: openDirectionX.value,
    }),
  );

  const calendarAttrs = getAttrs("calendar", {
    isComponent: true,
    classes: calendarWrapperClasses,
  });
  const inputBlurAttrs = getAttrs("input");
  const inputActiveAttrs = getAttrs("inputActive");
  const wrapperAttrs = getAttrs("wrapper");

  const inputAttrs = computed(() => {
    return isShownCalendar.value ? inputActiveAttrs.value : inputBlurAttrs.value;
  });

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
      calendarAttrs.value.config.i18n.userFormat = { ...config.value.i18n.months.userFormat };
    }
  });

  return {
    config,
    calendarAttrs,
    inputAttrs,
    wrapperAttrs,
  };
}
