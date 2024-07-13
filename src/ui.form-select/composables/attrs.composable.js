import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { isTop, isOpen, selectedLabel: selectedLabelValue }) {
  const { config, getAttrs, hasSlotContent, isSystemKey } = useUI(
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
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
          error: Boolean(props.error),
          label: Boolean(props.label),
        });
      }

      return "";
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

    if (key === "caretToggle") {
      const caretToggleAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...caretToggleAttrs.value,
        class: cx([caretToggleAttrs.value.class, caretClasses.value]),
      }));
    }

    if (key === "caretClear") {
      const caretClearAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...caretClearAttrs.value,
        class: cx([caretClearAttrs.value.class, caretClasses.value]),
      }));
    }

    if (key === "beforeCaretSlot") {
      const beforeCaretSlotAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...beforeCaretSlotAttrs.value,
        class: cx([beforeCaretSlotAttrs.value.class, caretClasses.value]),
      }));
    }

    if (key === "afterCaretSlot") {
      const afterCaretSlotAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...afterCaretSlotAttrs.value,
        class: cx([afterCaretSlotAttrs.value.class, caretClasses.value]),
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
