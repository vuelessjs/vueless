import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const inputAttrs = getAttrs("input", { isComponent: true });
  const searchIconAttrs = getAttrs("searchIcon", { isComponent: true });
  const closeIconAttrs = getAttrs("closeIcon", { isComponent: true });
  const buttonAttrs = getAttrs("button", { isComponent: true });

  return {
    config,
    inputAttrs,
    searchIconAttrs,
    closeIconAttrs,
    buttonAttrs,
    hasSlotContent,
  };
}
