import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper, body, title, description } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaBody = cva({
    base: body.base,
    variants: body.variants,
    compoundVariants: body.compoundVariants,
  });

  const cvaTitle = cva({
    base: title.base,
  });

  const cvaDescription = cva({
    base: description.base,
  });

  const wrapperClasses = computed(() =>
    setColor(
      cvaWrapper({
        color: props.color,
        bordered: props.bordered,
      }),
      props.color,
    ),
  );

  const bodyClasses = computed(() => setColor(cvaBody({ size: props.size }), props.color));

  const titleClasses = computed(() => cvaTitle());

  const descriptionClasses = computed(() => cvaDescription());

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const bodyAttrs = getAttrs("body", { classes: bodyClasses });
  const titleAttrs = getAttrs("title", { classes: titleClasses });
  const descriptionAttrs = getAttrs("description", {
    classes: descriptionClasses,
  });
  const leftSlotAttrs = getAttrs("leftSlot");
  const rightSlotAttrs = getAttrs("rightSlot");
  const topSlotAttrs = getAttrs("topSlot");
  const bottomSlotAttrs = getAttrs("bottomSlot");

  const buttonAttrs = getAttrs("button", { isComponent: true });
  const iconAttrs = getAttrs("icon", { isComponent: true });

  return {
    config,
    wrapperAttrs,
    bodyAttrs,
    buttonAttrs,
    iconAttrs,
    hasSlotContent,
    titleAttrs,
    descriptionAttrs,
    leftSlotAttrs,
    rightSlotAttrs,
    topSlotAttrs,
    bottomSlotAttrs,
  };
}
