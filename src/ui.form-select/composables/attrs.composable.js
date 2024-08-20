import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { isTop, isOpen, selectedLabel: selectedLabelValue }) {
  const { config, getAttrs, hasSlotContent, isSystemKey, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  const caretClasses = computed(() =>
    cva(config.value.caret)({
      ...props,
      error: Boolean(props.error),
      label: Boolean(props.label),
    }),
  );

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
          error: Boolean(props.error),
          label: Boolean(props.label),
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "wrapper") {
      const wrapperAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...wrapperAttrs.value,
        class: cx([wrapperAttrs.value.class, isOpen.value && config.value.wrapperActive]),
      }));
    }

    if (key === "label") {
      const labelAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...labelAttrs.value,
        class: cx([
          labelAttrs.value.class,
          isOpen.value && config.value.labelWrapperActive,
          isTop.value && config.value.labelWrapperTop,
        ]),
      }));
    }

    if (key === "toggle") {
      const toggleAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...toggleAttrs.value,
        class: cx([toggleAttrs.value.class, caretClasses.value]),
      }));
    }

    if (key === "clear") {
      const clearAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...clearAttrs.value,
        class: cx([clearAttrs.value.class, caretClasses.value]),
      }));
    }

    if (key === "beforeCaret") {
      const beforeCaretAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...beforeCaretAttrs.value,
        class: cx([beforeCaretAttrs.value.class, caretClasses.value]),
      }));
    }

    if (key === "afterCaret") {
      const afterCaretAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...afterCaretAttrs.value,
        class: cx([afterCaretAttrs.value.class, caretClasses.value]),
      }));
    }

    if (key === "search") {
      const searchAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...searchAttrs.value,
        class: cx([
          searchAttrs.value.class,
          Boolean(selectedLabelValue.value) && !isOpen.value && "w-0", // this is not configurable
        ]),
      }));
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
