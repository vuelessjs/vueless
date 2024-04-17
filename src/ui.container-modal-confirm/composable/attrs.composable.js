import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const modalAttrs = getAttrs("modal", { isComponent: true });
  const footerLeftFallbackAttrs = getAttrs("footerLeftFallback");
  const confirmButtonAttrs = getAttrs("confirmButton", { isComponent: true });
  const cancelButtonAttrs = getAttrs("cancelButton", { isComponent: true });

  return {
    config,
    footerLeftFallbackAttrs,
    modalAttrs,
    confirmButtonAttrs,
    cancelButtonAttrs,
    hasSlotContent,
  };
}
