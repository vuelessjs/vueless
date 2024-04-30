import tippy from "tippy.js";

import vuelessConfig from "../../vueless.config";

import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";

tippy.setDefaultProps(vuelessConfig.directive.tooltip);

export default {
  mounted(el, bindings) {
    tippy(el, bindings.value);
  },
  updated(el, bindings) {
    if (!el._tippy) return;

    el._tippy.setProps(bindings);
  },
  unmounted(el) {
    if (!el._tippy) return;

    el._tippy.destroy();
  },
};
