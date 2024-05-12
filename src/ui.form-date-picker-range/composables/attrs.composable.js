import useUI from "../../composable.ui";
import { cx } from "../../service.ui";

import { computed, watchEffect } from "vue";

import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { isShownMenu }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);

  const wrapperAttrs = getAttrs("wrapper");
  const buttonWrapperAttrsRaw = getAttrs("buttonWrapper");
  const buttonAttrsRaw = getAttrs("button");
  const shiftRangeButtonAttrs = getAttrs("shiftRangeButton");
  const calendarAttrs = getAttrs("calendar", { isComponent: true });
  const inputBlurAttrs = getAttrs("input", { isComponent: true });
  const inputActiveAttrs = getAttrs("inputActive");
  const rangeInputAttrs = getAttrs("rangeInput", { isComponent: true });
  const rangeInputWrapperAttrs = getAttrs("rangeInputWrapper");
  const inputRangeErrorAttrs = getAttrs("inputRangeError");

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

  const inputAttrs = computed(() => {
    return isShownMenu.value ? inputActiveAttrs.value : inputBlurAttrs.value;
  });

  const menuAttrs = getAttrs("menu");
  const periodsRowAttrs = getAttrs("periodsRow");
  const rangeSwitchWrapperAttrs = getAttrs("rangeSwitchWrapper");
  const nextIconAttrs = getAttrs("nextIcon");
  const prevIconAttrs = getAttrs("prevIcon");
  const periodButtonIconAttrs = getAttrs("periodButtonIcon");
  const rangeSwitchTitleAttrs = getAttrs("rangeSwitchTitle");

  const periodButtonAttrs = (classes = []) => {
    return getAttrs("periodButton", { classes }).value;
  };

  const periodDateListAttrs = (classes = []) => {
    return getAttrs("periodDateList", { classes }).value;
  };

  const periodDateAttrs = (classes = []) => {
    return getAttrs("periodDate", { classes }).value;
  };

  const buttonWrapperAttrs = computed(() => ({
    ...buttonWrapperAttrsRaw.value,
    class: cx([
      buttonWrapperAttrsRaw.value.class,
      isShownMenu.value && config.value.buttonWrapperActive,
    ]),
  }));

  const buttonAttrs = computed(() => ({
    ...buttonAttrsRaw.value,
    class: cx([buttonAttrsRaw.value.class, isShownMenu.value && config.value.buttonActive]),
  }));

  return {
    config,
    wrapperAttrs,
    calendarAttrs,
    inputAttrs,
    menuAttrs,
    periodsRowAttrs,
    periodButtonAttrs,
    periodButtonIconAttrs,
    rangeSwitchWrapperAttrs,
    nextIconAttrs,
    prevIconAttrs,
    periodDateAttrs,
    periodDateListAttrs,
    rangeSwitchTitleAttrs,
    buttonWrapperAttrs,
    buttonAttrs,
    shiftRangeButtonAttrs,
    rangeInputAttrs,
    rangeInputWrapperAttrs,
    inputRangeErrorAttrs,
  };
}
