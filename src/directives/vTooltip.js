import tippy from "tippy.js";
import { merge } from "lodash-es";

import { vuelessConfig } from "../utils/utilUI.js";
import { isCSR, isSSR } from "../utils/utilHelper.js";

let settings = {};

if (isCSR) {
  import("tippy.js/dist/tippy.css");
  import("tippy.js/themes/light.css");
  import("tippy.js/animations/shift-away.css");

  const defaultSettings = {
    arrow: true,
    theme: "light",
    animation: "shift-away",
  };

  settings = merge(defaultSettings, vuelessConfig.directive?.tooltip || {});
  tippy.setDefaultProps(settings);
}

export default {
  mounted(el, bindings) {
    if (isSSR) return;

    if (typeof bindings.value === "string" && bindings.value.length) {
      tippy(el, merge(settings, { content: bindings.value }));

      return;
    }

    if (bindings.value.content && bindings.value.content.length) {
      tippy(el, merge(settings, bindings.value || {}));
    }
  },

  updated(el, bindings) {
    if (!el._tippy || isSSR) return;

    if (typeof bindings.value === "string") {
      el._tippy.setProps(merge(settings, { content: bindings.value }));

      return;
    }

    el._tippy.setProps(merge(settings, bindings.value || {}));
  },

  unmounted(el) {
    if (!el._tippy || isSSR) return;

    el._tippy.destroy();
  },
};
