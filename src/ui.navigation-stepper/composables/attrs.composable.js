import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { getAttrs } = useUI(defaultConfig, () => props.config);

  const wrapperAttrs = getAttrs("wrapper");
  const stepperAttrs = getAttrs("stepper");
  const titleAttrs = getAttrs("title", { isComponent: true });
  const ringAttrs = getAttrs("ring");
  const countAttrs = getAttrs("count");
  const gradientAttrs = getAttrs("gradient");
  const svgAttrs = getAttrs("svg");

  return {
    wrapperAttrs,
    titleAttrs,
    stepperAttrs,
    ringAttrs,
    countAttrs,
    gradientAttrs,
    svgAttrs,
  };
}
