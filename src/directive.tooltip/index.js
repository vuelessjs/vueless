import tippy from "tippy.js";
import { merge } from "lodash-es";

import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";

/* Load Vueless config from the project root. */
const [vuelessConfig] = Object.values(
  import.meta.glob("/vueless.config.js", { eager: true, import: "default" }),
);

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
