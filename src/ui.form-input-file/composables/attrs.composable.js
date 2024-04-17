import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { errorMessage, dragOver }) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { upload, block } = config.value;

  const cvaUpload = cva({
    base: upload.base,
    variants: upload.variants,
    compoundVariants: upload.compoundVariants,
  });

  const cvaBlock = cva({
    base: block.base,
    variants: block.variants,
    compoundVariants: block.compoundVariants,
  });

  const uploadClasses = computed(() =>
    cvaUpload({
      size: props.size,
      label: Boolean(props.label),
      error: Boolean(errorMessage.value),
    }),
  );

  const blockClasses = computed(() =>
    cvaBlock({
      label: Boolean(props.label),
    }),
  );

  const uploadAttrs = getAttrs("upload", { classes: uploadClasses });
  const buttonAttrs = getAttrs("button", { isComponent: true });
  const iconUploadFileAttrs = getAttrs("iconUploadFile", { isComponent: true });
  const wrapperAttrs = getAttrs("wrapper");
  const labelAttrs = getAttrs("label", { isComponent: true });
  const blockAttrs = getAttrs("block", { classes: blockClasses });
  const descriptionAttrs = getAttrs("description");
  const listAttrs = getAttrs("list");
  const itemCloseAttrs = getAttrs("itemClose");
  const iconCloseRaw = getAttrs("iconClose", {
    classes: itemCloseAttrs.value.class,
    isComponent: true,
  });

  const iconCloseAttrs = computed(() => ({
    ...iconCloseRaw.value,
    class: cx([iconCloseRaw.value.class, itemCloseAttrs.value.class]),
  }));

  const uppyUploadRaw = getAttrs("uppyUpload");

  const uppyUploadAttrs = computed(() => ({
    ...uppyUploadRaw.value,
    class: cx([uppyUploadRaw.value.class, dragOver.value && config.dragOver]),
  }));

  const uploadSlotAttrs = getAttrs("uploadSlot");
  const filesAttrs = getAttrs("files", { isComponent: true });

  return {
    config,
    uploadAttrs,
    buttonAttrs,
    iconUploadFileAttrs,
    iconCloseAttrs,
    wrapperAttrs,
    labelAttrs,
    blockAttrs,
    descriptionAttrs,
    listAttrs,
    uppyUploadAttrs,
    uploadSlotAttrs,
    filesAttrs,
    hasSlotContent,
  };
}
