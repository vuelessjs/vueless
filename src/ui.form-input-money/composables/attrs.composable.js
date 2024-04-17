import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export default function useAttrs(props) {
  const { getAttrs } = useUI(defaultConfig, () => props.config);

  const inputAttrs = getAttrs("input", { isComponent: true });

  return {
    inputAttrs,
  };
}
