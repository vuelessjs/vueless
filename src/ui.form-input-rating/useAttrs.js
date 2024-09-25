import useUI from "../composables/useUI.js";
import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
