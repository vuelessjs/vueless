import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { computed, watchEffect } from "vue";

export default function useAttrs(props, { isShownCalendar }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);

  const calendarAttrs = getAttrs("calendar");
  const inputBlurAttrs = getAttrs("input");
  const inputActiveAttrs = getAttrs("inputActive");

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
  };
}
