import { computed, useSlots } from "vue";

import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { isActive, isExactActive }) {
  const slots = useSlots();

  const { config, getAttrs, hasSlotContent, setColor } = useUI(defaultConfig, () => props.config);
  const { wrapper, link, text, rightSlot, leftSlot } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaLink = cva({
    base: link.base,
    variants: link.variants,
    compoundVariants: link.compoundVariants,
  });

  const cvaText = cva({
    base: text.base,
    variants: text.variants,
    compoundVariants: text.compoundVariants,
  });

  const cvaRightSlot = cva({
    base: rightSlot.base,
    variants: rightSlot.variants,
    compoundVariants: rightSlot.compoundVariants,
  });

  const cvaLeftSlot = cva({
    base: leftSlot.base,
    variants: leftSlot.variants,
    compoundVariants: leftSlot.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    setColor(
      cvaWrapper({
        size: props.size,
        color: props.color,
        block: props.block,
        noRing: props.noRing,
        disabled: props.disabled,
      }),
      props.color,
    ),
  );

  const linkClasses = computed(() =>
    setColor(
      cvaLink({
        size: props.size,
        color: props.color,
        dashed: props.dashed,
        underlined: props.underlined,
      }),
      props.color,
    ),
  );

  const textClasses = computed(() => setColor(cvaText({ color: props.color }), props.color));

  const rightSlotClasses = computed(() =>
    setColor(cvaRightSlot({ color: props.color }), props.color),
  );

  const leftSlotClasses = computed(() =>
    setColor(cvaLeftSlot({ color: props.color }), props.color),
  );

  const wrapperAttrsRaw = getAttrs("wrapper", { classes: wrapperClasses });

  const wrapperAttrs = computed(() => {
    const hasDefaultSlot = hasSlotContent(slots["default"]);
    const hasRightSlot = hasSlotContent(slots["right"]);
    const hasLeftSlot = hasSlotContent(slots["left"]);

    return {
      ...wrapperAttrsRaw.value,
      class: cx([
        wrapperAttrsRaw.value.class,
        (hasDefaultSlot || hasLeftSlot || hasRightSlot) && config.value.withSlots,
        isActive.value && props.wrapperActiveClass,
        isExactActive.value && props.wrapperExactActiveClass,
      ]),
    };
  });

  const linkAttrsRaw = getAttrs("link", { classes: linkClasses });

  const linkAttrs = computed(() => {
    const hasDefaultSlot = hasSlotContent(slots["default"]);

    return {
      ...linkAttrsRaw.value,
      class: cx([
        linkAttrsRaw.value.class,
        hasDefaultSlot && config.value.withSlots,
        isActive.value && props.activeClass,
        isExactActive.value && props.exactActiveClass,
      ]),
    };
  });

  const rightSlotAttrs = getAttrs("rightSlot", { classes: rightSlotClasses });
  const leftSlotAttrs = getAttrs("leftSlot", { classes: leftSlotClasses });
  const textAttrs = getAttrs("text", { classes: textClasses });

  return {
    config,
    hasSlotContent,
    wrapperAttrs,
    linkAttrs,
    rightSlotAttrs,
    leftSlotAttrs,
    textAttrs,
  };
}
