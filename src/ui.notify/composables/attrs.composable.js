import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);

  const wrapperAttrs = getAttrs("wrapper");
  const bodyAttrs = getAttrs("body");
  const contentAttrs = getAttrs("content");
  const labelAttrs = getAttrs("label");
  const descriptionAttrs = getAttrs("description");
  const iconSuccessAttrs = getAttrs("iconSuccess");
  const iconWarningAttrs = getAttrs("iconWarning");
  const iconErrorAttrs = getAttrs("iconError");
  const iconCloseAttrs = getAttrs("iconClose");

  return {
    config,
    wrapperAttrs,
    bodyAttrs,
    contentAttrs,
    labelAttrs,
    descriptionAttrs,
    iconSuccessAttrs,
    iconWarningAttrs,
    iconCloseAttrs,
    iconErrorAttrs,
  };
}
