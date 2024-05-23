import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { dropzoneWrapper } = config.value;

  const cvaDropzoneWrapper = cva({
    base: dropzoneWrapper.base,
    variants: dropzoneWrapper.variants,
    compoundVariants: dropzoneWrapper.compoundVariants,
  });

  const dropzoneWrapperClasses = computed(() =>
    cvaDropzoneWrapper({
      error: Boolean(props.error),
      label: Boolean(props.label),
      labelAlign: props.labelAlign,
      size: props.size,
    }),
  );

  const labelAttrs = getAttrs("label", { isComponent: true });
  const buttonAttrs = getAttrs("button", { isComponent: true });
  const dropzoneWrapperAttrs = getAttrs("dropzoneWrapper", { classes: dropzoneWrapperClasses });
  const descriptionAttrs = getAttrs("description", { isComponent: true });
  const buttonWrapperAttrs = getAttrs("buttonWrapper");
  const placeholderWrapperAttrs = getAttrs("placeholderWrapper");
  const placeholderAttrs = getAttrs("placeholder", { isComponent: true });
  const iconPlaceholderAttrs = getAttrs("iconPlaceholder", { isComponent: true });
  const iconCloseAttrs = getAttrs("iconClose", { isComponent: true });
  const iconUploadFileAttrs = getAttrs("iconUploadFile", { isComponent: true });
  const inputAttrs = getAttrs("input");

  return {
    config,
    inputAttrs,
    labelAttrs,
    buttonAttrs,
    dropzoneWrapperAttrs,
    descriptionAttrs,
    buttonWrapperAttrs,
    placeholderWrapperAttrs,
    iconPlaceholderAttrs,
    iconCloseAttrs,
    iconUploadFileAttrs,
    placeholderAttrs,
  };
}
