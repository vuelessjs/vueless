import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { getAttrs } = useUI(defaultConfig, () => props.config);

  const filesAttrs = getAttrs("files");
  const labelAttrs = getAttrs("label");
  const bodyAttrs = getAttrs("body");
  const fileAttrs = getAttrs("file", { isComponent: true });

  return {
    filesAttrs,
    labelAttrs,
    bodyAttrs,
    fileAttrs,
  };
}
