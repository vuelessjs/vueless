import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);

  const wrapperAttrs = getAttrs("wrapper");
  const bodyAttrs = getAttrs("body");
  const contentAttrs = getAttrs("content");
  const labelAttrs = getAttrs("label");
  const descriptionAttrs = getAttrs("description");
  const successIconAttrs = getAttrs("successIcon");
  const warningIconAttrs = getAttrs("warningIcon");
  const errorIconAttrs = getAttrs("errorIcon");
  const closeIconAttrs = getAttrs("closeIcon");

  return {
    config,
    wrapperAttrs,
    bodyAttrs,
    contentAttrs,
    labelAttrs,
    descriptionAttrs,
    successIconAttrs,
    warningIconAttrs,
    errorIconAttrs,
    closeIconAttrs,
  };
}
