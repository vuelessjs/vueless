import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { getAttrs } = useUI(defaultConfig, () => props.config);

  const buttonAttrs = getAttrs("button");
  const inputAttrs = getAttrs("input");

  return {
    buttonAttrs,
    inputAttrs,
  };
}
