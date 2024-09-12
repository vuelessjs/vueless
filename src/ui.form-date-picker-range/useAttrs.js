import useUI from "../composables/useUI.js";
import { cx, cva } from "../utils/utilUI.js";

import { computed, watchEffect } from "vue";

import defaultConfig from "./config.js";
import { POSITION } from "../composables/useAutoPosition.js";

export default function useAttrs(props, { isShownMenu, isTop, isRight, isPeriod }) {
  const { config, getAttrs, isSystemKey, hasSlotContent, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  const variantKeys = [
    "rangeInputFirst",
    "rangeInputLast",
    "periodButtonActive",
    "periodDateWeekList",
    "periodDateMonthList",
    "periodDateQuarterList",
    "periodDateYearList",
    "firstPeriodGridDate",
    "firstPeriodListDate",
    "lastPeriodGridDate",
    "lastPeriodListDate",
    "periodDateActive",
    "periodDateInRange",
  ];

  for (const key in defaultConfig) {
    if (isSystemKey(key) && variantKeys.includes(key)) continue;

    const classes = computed(() => {
      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "menu") {
      const menuAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...menuAttrs.value,
        class: cx([
          cva(config.value.menu)({
            openDirectionY: isTop.value ? POSITION.top : POSITION.bottom,
            openDirectionX: isRight.value ? POSITION.right : POSITION.left,
          }),
          menuAttrs.value.class,
        ]),
      }));
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

  for (const key of variantKeys) {
    if (key === "rangeInputFirst") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.rangeInputAttrs.value,
        class: cx([attrs.rangeInputAttrs.value.class, config.value.rangeInputFirst]),
      }));
    }

    if (key === "rangeInputLast") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.rangeInputAttrs.value,
        class: cx([attrs.rangeInputAttrs.value.class, config.value.rangeInputLast]),
      }));
    }

    if (key === "periodButtonActive") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodButtonAttrs.value,
        class: cx([attrs.periodButtonAttrs.value.class, config.value.periodButtonActive]),
      }));
    }

    if (key === "periodDateWeekList") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodDateListAttrs.value,
        class: cx([attrs.periodDateListAttrs.value.class, config.value.periodDateWeekList]),
      }));
    }

    if (key === "periodDateMonthList") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodDateListAttrs.value,
        class: cx([attrs.periodDateListAttrs.value.class, config.value.periodDateMonthList]),
      }));
    }

    if (key === "periodDateQuarterList") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodDateListAttrs.value,
        class: cx([attrs.periodDateListAttrs.value.class, config.value.periodDateQuarterList]),
      }));
    }

    if (key === "periodDateYearList") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodDateListAttrs.value,
        class: cx([attrs.periodDateListAttrs.value.class, config.value.periodDateYearList]),
      }));
    }

    if (key === "periodDateActive") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodDateAttrs.value,
        class: cx([attrs.periodDateAttrs.value.class, config.value.periodDateActive]),
      }));
    }

    if (key === "periodDateInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodDateAttrs.value,
        class: cx([attrs.periodDateAttrs.value.class, config.value.periodDateInRange]),
      }));
    }

    if (
      [
        "firstPeriodGridDate",
        "firstPeriodListDate",
        "lastPeriodGridDate",
        "lastPeriodListDate",
      ].includes(key)
    ) {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.periodDateAttrs.value,
        class: cx([
          attrs.periodDateAttrs.value.class,
          config.value.edgePeriodDate,
          config.value[key],
        ]),
      }));
    }
  }

  const periodDateListAttrs = computed(() => {
    if (isPeriod.value.week) return attrs.periodDateWeekListAttrs.value;
    if (isPeriod.value.month) return attrs.periodDateMonthListAttrs.value;
    if (isPeriod.value.quarter) return attrs.periodDateQuarterListAttrs.value;
    if (isPeriod.value.year) return attrs.periodDateYearListAttrs.value;

    return attrs.periodDateListAttrs.value;
  });

  const periodDatesMenuAttrs = computed(() => ({
    periodsRowAttrs: attrs.periodsRowAttrs.value,
    periodButtonAttrs: attrs.periodButtonAttrs.value,
    periodButtonActiveAttrs: attrs.periodButtonActiveAttrs.value,
    periodDateAttrs: attrs.periodDateAttrs.value,
    periodDateActiveAttrs: attrs.periodDateActiveAttrs.value,
    periodDateInRangeAttrs: attrs.periodDateInRangeAttrs.value,
    periodDateListAttrs: periodDateListAttrs.value,
    rangeSwitchWrapperAttrs: attrs.rangeSwitchWrapperAttrs.value,
    rangeSwitchButtonAttrs: attrs.rangeSwitchButtonAttrs.value,
    rangeSwitchTitleAttrs: attrs.rangeSwitchTitleAttrs.value,
    lastPeriodGridDateAttrs: attrs.lastPeriodGridDateAttrs.value,
    firstPeriodGridDateAttrs: attrs.firstPeriodGridDateAttrs.value,
    lastPeriodListDateAttrs: attrs.lastPeriodListDateAttrs.value,
    firstPeriodListDateAttrs: attrs.firstPeriodListDateAttrs.value,
    customRangeDescription: attrs.customRangeDescriptionAttrs.value,
  }));

  const rangeInputsAttrs = computed(() => ({
    rangeInputFirstAttrs: attrs.rangeInputFirstAttrs.value,
    rangeInputLastAttrs: attrs.rangeInputLastAttrs.value,
  }));

  return {
    ...attrs,
    periodDatesMenuAttrs,
    rangeInputsAttrs,
    periodDateListAttrs,
    config,
    hasSlotContent,
  };
}
