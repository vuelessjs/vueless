import { merge } from "lodash-es";

import { vuelessConfig } from "../../utils/ui.ts";
import { isSSR } from "../../utils/helper.ts";

import type { DefaultProps } from "tippy.js";
import type {
  TippyTargetElement,
  DirectiveBindingContent,
  DirectiveBindingProps,
} from "./types.ts";

let settings: Partial<DefaultProps> = {};

const defaultSettings = {
  arrow: true,
  theme: "light",
  animation: "shift-away",
};

settings = merge(defaultSettings, vuelessConfig.directives?.tooltip || {}) as DefaultProps;

function onMounted(el: TippyTargetElement, bindings: DirectiveBindingContent): void;
function onMounted(el: TippyTargetElement, bindings: DirectiveBindingProps): void;
function onMounted(
  el: TippyTargetElement,
  bindings: DirectiveBindingProps | DirectiveBindingContent,
): void {
  if (isSSR) return;

  (async () => {
    await import("tippy.js/dist/tippy.css");
    await import("tippy.js/themes/light.css");
    await import("tippy.js/animations/shift-away.css");

    const { default: tippy } = await import("tippy.js");

    tippy.setDefaultProps(settings);

    if (typeof bindings.value === "string" && String(bindings.value).length) {
      tippy(el, merge(settings, { content: bindings.value }));

      return;
    }

    if (
      typeof bindings.value === "object" &&
      bindings.value.content &&
      String(bindings.value.content).length
    ) {
      tippy(el, merge(settings, bindings.value || {}));
    }
  })();
}

function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingContent): void;
function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingProps): void;
function onUpdated(
  el: TippyTargetElement,
  bindings: DirectiveBindingProps | DirectiveBindingContent,
): void {
  if (!el._tippy || isSSR) return;

  if (typeof bindings.value === "string") {
    el._tippy.setProps(merge(settings, { content: bindings.value }));

    return;
  }

  el._tippy.setProps(merge(settings, bindings.value || {}));
}

function onUnmounted(el: TippyTargetElement) {
  if (!el._tippy || isSSR) return;

  el._tippy.destroy();
}

export default {
  mounted: onMounted,
  updated: onUpdated,
  unmounted: onUnmounted,
};
