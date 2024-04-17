import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { computed } from "vue";
import { cx } from "../../service.ui";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { titleCrossed } = config.value;

  const wrapperAttrs = getAttrs("wrapper");
  const dividerAttrs = getAttrs("divider", { isComponent: true });
  const emptyAttrs = getAttrs("empty", { isComponent: true });
  const draggableAttrs = getAttrs("draggable");
  const itemWrapperAttrs = getAttrs("itemWrapper");
  const itemAttrs = getAttrs("item");
  const customActionsAttrs = getAttrs("customActions");
  const iconDeleteAttrs = getAttrs("iconDelete", { isComponent: true });
  const iconEditAttrs = getAttrs("iconEdit", { isComponent: true });
  const iconDragAttrs = getAttrs("iconDrag", { isComponent: true });
  const nestedAttrs = getAttrs("nested", { isComponent: true });

  const titleRaw = getAttrs("title");

  const titleAttrs = computed(() => (isActive) => ({
    ...titleRaw,
    class: cx([titleRaw.value.class, isActive !== undefined && !isActive ? titleCrossed : ""]),
  }));

  return {
    config,
    wrapperAttrs,
    dividerAttrs,
    emptyAttrs,
    draggableAttrs,
    nestedAttrs,
    itemWrapperAttrs,
    itemAttrs,
    iconDragAttrs,
    titleAttrs,
    customActionsAttrs,
    iconDeleteAttrs,
    iconEditAttrs,
    hasSlotContent,
  };
}
