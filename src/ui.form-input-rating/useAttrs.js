import useUI from "../composables/useUI.ts";
import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  return { config, ...getKeysAttrs() };
}