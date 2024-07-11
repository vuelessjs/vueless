import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { inputPasswordClasses }) {
  const { config, getAttrs, hasSlotContent, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  const inputClasses = computed(() =>
    cva(config.value.input)({
      ...props,
      error: Boolean(props.error),
      label: Boolean(props.label),
    }),
  );

  const blockClasses = computed(() =>
    cva(config.value.block)({
      ...props,
      error: Boolean(props.error),
      disabled: props.disabled,
    }),
  );

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    let classes = "";
    let value = config.value[key];

    if (value.variants || value.compoundVariants) {
      const getCVA = cva(value);

      classes = computed(() =>
        getCVA({
          ...props,
          error: Boolean(props.error),
          label: Boolean(props.label),
        }),
      );
    }

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "block") {
      const blockAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...blockAttrs.value,
        class: cx([blockAttrs.value.class, blockClasses.value]),
      }));
    }

    if (key === "input") {
      const inputAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...inputAttrs.value,
        class: cx([inputAttrs.value.class, inputPasswordClasses.value, inputClasses.value]),
      }));
    }

    if (key === "label") {
      const labelAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...labelAttrs.value,
        class: cx([labelAttrs.value.class]),
      }));
    }

    if (key === "rightIconSlot" || key === "leftIconSlot" || key === "passwordIcon") {
      const iconAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...iconAttrs.value,
        class: cx([iconAttrs.value.class]),
      }));
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
