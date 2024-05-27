import tippy from "tippy.js";
import { merge } from "lodash-es";

import vuelessConfig from "../../vueless.config.js";

import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";

const globalSettings = vuelessConfig?.directive?.tooltip || {};
const defaultSettings = {
  arrow: true,
  theme: "light",
  animation: "shift-away",
};
const mergedSettings = merge(defaultSettings, globalSettings);

tippy.setDefaultProps(mergedSettings);

export default {
  mounted(el, bindings) {
    tippy(el, merge(mergedSettings, bindings.value || {}));
  },

  updated(el, bindings) {
    if (!el._tippy) return;

    el._tippy.setProps(merge(mergedSettings, bindings.value || {}));
  },

  unmounted(el) {
    if (!el._tippy) return;

    el._tippy.destroy();
  },
};
