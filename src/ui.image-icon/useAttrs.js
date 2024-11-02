import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
