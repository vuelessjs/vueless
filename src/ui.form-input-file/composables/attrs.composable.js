import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { dropzoneWrapper, placeholder, selectedItem } = config.value;

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

  const cvaSelectedItem = cva({
    base: selectedItem.base,
    variants: selectedItem.variants,
    compoundVariants: selectedItem.compoundVariants,
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

  const selectedItemClasses = computed(() =>
    cvaSelectedItem({
      size: props.size,
    }),
  );

  const labelAttrs = getAttrs("label", { isComponent: true });
  const buttonAttrs = getAttrs("button", { isComponent: true });
  const dropzoneWrapperAttrs = getAttrs("dropzoneWrapper", { classes: dropzoneWrapperClasses });
  const descriptionAttrs = getAttrs("description", { isComponent: true });
  const contentWrapperAttrs = getAttrs("contentWrapper");
  const buttonWrapperAttrs = getAttrs("buttonWrapper");
  const placeholderAttrs = getAttrs("placeholder", { classes: placeholderClasses });
  const clearIconAttrs = getAttrs("clearIcon", { isComponent: true });
  const chooseFileIconAttrs = getAttrs("chooseFileIcon", { isComponent: true });
  const inputAttrs = getAttrs("input");
  const fileListAttrs = getAttrs("fileList");
  const selectedItemAttrs = getAttrs("selectedItem", { classes: selectedItemClasses });

  return {
    config,
    inputAttrs,
    labelAttrs,
    buttonAttrs,
    dropzoneWrapperAttrs,
    descriptionAttrs,
    contentWrapperAttrs,
    clearIconAttrs,
    placeholderAttrs,
    fileListAttrs,
    buttonWrapperAttrs,
    selectedItemAttrs,
    chooseFileIconAttrs,
  };
}
