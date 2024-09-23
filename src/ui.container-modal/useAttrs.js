import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

import useBreakpoint from "../composables/useBreakpoint.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );
  const { isMobileBreakpoint } = useBreakpoint();

  const extendingKeys = ["footerMobileReverse"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    footer: {
      extend: computed(() => [
        props.mobileFooterReverse &&
          isMobileBreakpoint.value &&
          extendingKeysClasses.footerMobileReverse.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
