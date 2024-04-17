import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);

  const wrapperAttrs = getAttrs("wrapper");
  const toggleItemAttrs = getAttrs("toggleItem", { isComponent: true });

  return {
    config,
    wrapperAttrs,
    toggleItemAttrs,
  };
}
