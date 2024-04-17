import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { getAttrs } = useUI(defaultConfig, () => props.config);

  const labelAttrs = getAttrs("label", { isComponent: true });
  const listAttrs = getAttrs("list");
  const checkboxAttrs = getAttrs("checkbox", { isComponent: true });

  return {
    labelAttrs,
    checkboxAttrs,
    listAttrs,
  };
}
