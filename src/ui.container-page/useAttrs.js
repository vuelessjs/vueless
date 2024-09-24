import { computed } from "vue";
import useUI from "../composables/useUI.js";
import { isMobileApp } from "../utils/utilPlatform.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { isMobileBreakpoint }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["wrapperMobile", "footerMobileReverse"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    wrapper: {
      extend: computed(() => [
        isMobileBreakpoint.value && !isMobileApp && extendingKeysClasses.wrapperMobile.value,
      ]),
    },
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
