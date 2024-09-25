import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs({}, [], {
    ellipse: {
      extend: computed(() => ["vueless-loader-ellipse", `vueless-loader-ellipse-${props.size}`]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
