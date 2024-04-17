import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { getAttrs } = useUI(defaultConfig, () => props.config);

  const wrapperAttrs = getAttrs("wrapper");

  return {
    wrapperAttrs,
  };
}
