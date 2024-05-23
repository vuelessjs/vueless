import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { dropzoneWrapper, placeholder } = config.value;

  const cvaDropzoneWrapper = cva({
    base: dropzoneWrapper.base,
    variants: dropzoneWrapper.variants,
    compoundVariants: dropzoneWrapper.compoundVariants,
  });

  const cvaPlaceholder = cva({
    base: placeholder.base,
    variants: placeholder.variants,
    compoundVariants: placeholder.compoundVariants,
  });

  const dropzoneWrapperClasses = computed(() =>
    cvaDropzoneWrapper({
      error: Boolean(props.error),
      label: Boolean(props.label),
      labelAlign: props.labelAlign,
      size: props.size,
    }),
  );

  const placeholderClasses = computed(() =>
    cvaPlaceholder({
      size: props.size,
    }),
  );

  const labelAttrs = getAttrs("label", { isComponent: true });
  const buttonAttrs = getAttrs("button", { isComponent: true });
  const dropzoneWrapperAttrs = getAttrs("dropzoneWrapper", { classes: dropzoneWrapperClasses });
  const descriptionAttrs = getAttrs("description", { isComponent: true });
  const buttonWrapperAttrs = getAttrs("buttonWrapper");
  const placeholderWrapperAttrs = getAttrs("placeholderWrapper");
  const placeholderAttrs = getAttrs("placeholder", {
    classes: placeholderClasses,
    isComponent: true,
  });
  const placeholderIconAttrs = getAttrs("placeholderIcon", { isComponent: true });
  const clearIconAttrs = getAttrs("clearIcon", { isComponent: true });
  const chooseFileIconNameAttrs = getAttrs("chooseFileIconName", { isComponent: true });
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
    placeholderIconAttrs,
    clearIconAttrs,
    chooseFileIconNameAttrs,
    placeholderAttrs,
  };
}
