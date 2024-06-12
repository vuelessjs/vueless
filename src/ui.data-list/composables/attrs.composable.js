import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { computed } from "vue";
import { cx } from "../../service.ui";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { labelCrossed } = config.value;

  const wrapperAttrs = getAttrs("wrapper");
  const dividerAttrs = getAttrs("divider", { isComponent: true });
  const emptyAttrs = getAttrs("empty", { isComponent: true });
  const draggableAttrs = getAttrs("draggable");
  const itemWrapperAttrs = getAttrs("itemWrapper");
  const itemAttrs = getAttrs("item");
  const customActionsAttrs = getAttrs("customActions");
  const deleteIconAttrs = getAttrs("deleteIcon", { isComponent: true });
  const editIconAttrs = getAttrs("editIcon", { isComponent: true });
  const dragIconAttrs = getAttrs("dragIcon", { isComponent: true });
  const nestedAttrs = getAttrs("nested", { isComponent: true });

  const labelAttrsRaw = getAttrs("label");

  const labelAttrs = computed(() => (isActive) => ({
    ...labelAttrsRaw,
    class: cx([labelAttrsRaw.value.class, isActive !== undefined && !isActive ? labelCrossed : ""]),
  }));

  return {
    config,
    hasSlotContent,
    wrapperAttrs,
    dividerAttrs,
    emptyAttrs,
    draggableAttrs,
    nestedAttrs,
    itemWrapperAttrs,
    itemAttrs,
    labelAttrs,
    customActionsAttrs,
    deleteIconAttrs,
    editIconAttrs,
    dragIconAttrs,
  };
}
