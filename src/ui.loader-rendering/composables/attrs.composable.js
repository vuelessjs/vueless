import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { getAttrs, config } = useUI(defaultConfig, () => props.config);

  const wrapperAttrs = getAttrs("wrapper");
  const loaderAttrs = getAttrs("loader");
  const rippleAttrs = getAttrs("ripple");
  const rippleElementAttrs = getAttrs("rippleElement");

  return {
    wrapperAttrs,
    loaderAttrs,
    rippleAttrs,
    rippleElementAttrs,
    config,
  };
}
