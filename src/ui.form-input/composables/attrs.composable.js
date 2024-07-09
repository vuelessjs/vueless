import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props, { inputPasswordClasses }) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { input, block } = config.value;

  const cvaInput = cva({
    base: input.base,
    variants: input.variants,
    compoundVariants: input.compoundVariants,
  });

  const cvaBlock = cva({
    base: block.base,
    variants: block.variants,
    compoundVariants: block.compoundVariants,
  });

  const blockClasses = computed(() =>
    cvaBlock({
      error: Boolean(props.error),
      disabled: props.disabled,
    }),
  );

  const inputClasses = computed(() =>
    cvaInput({
      size: props.size,
      type: props.type,
      labelAlign: props.labelAlign,
      label: Boolean(props.label),
      error: Boolean(props.error),
    }),
  );

  const inputWrapperAttrs = getAttrs("inputWrapper");
  const rightIconSlotAttrs = getAttrs("rightIconSlot");
  const leftIconSlotAttrs = getAttrs("leftIconSlot");
  const passwordIconAttrs = getAttrs("passwordIcon");
  const blockAttrs = getAttrs("block", { classes: blockClasses });
  const labelAttrs = getAttrs("label", { isComponent: true });
  const inputAttrsRaw = getAttrs("input", { classes: inputClasses });

  const inputAttrs = computed(() => ({
    ...inputAttrsRaw.value,
    class: cx([inputAttrsRaw.value.class, inputPasswordClasses.value]),
  }));

  return {
    config,
    inputAttrs,
    blockAttrs,
    labelAttrs,
    passwordIconAttrs,
    leftIconSlotAttrs,
    inputWrapperAttrs,
    rightIconSlotAttrs,
    hasSlotContent,
  };
}
