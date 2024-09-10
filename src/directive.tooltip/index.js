import tippy from "tippy.js";
import { merge } from "lodash-es";

// Fix for SSR
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";

import { vuelessConfig } from "../service.ui/index.js";
import { isCSR, isSSR } from "../service.helper/index.js";

const globalSettings = vuelessConfig?.directive?.tooltip || {};
const defaultSettings = {
  arrow: true,
  theme: "light",
  animation: "shift-away",
};

const mergedSettings = merge(defaultSettings, globalSettings);

isCSR && tippy.setDefaultProps(mergedSettings);

export default {
  mounted(el, bindings) {
    isCSR && tippy(el, merge(mergedSettings, bindings.value || {}));
  },

  updated(el, bindings) {
    if (!el._tippy || isSSR) return;

    el._tippy.setProps(merge(mergedSettings, bindings.value || {}));
  },

  unmounted(el) {
    if (!el._tippy || isSSR) return;

    el._tippy.destroy();
  },
};
