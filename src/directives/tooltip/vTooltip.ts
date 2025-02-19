import tippy from "tippy.js";
import { merge } from "lodash-es";
import { toValue, computed, watch } from "vue";

import { vuelessConfig } from "../../utils/ui.ts";
import { isCSR, isSSR } from "../../utils/helper.ts";

import type { DefaultProps, Instance as TippyInstance, Props as TippyProps } from "tippy.js";
import type {
  TippyTargetElement,
  DirectiveBindingContent,
  DirectiveBindingProps,
} from "./types.ts";

let settings: Partial<DefaultProps> = {};

if (isCSR) {
  import("tippy.js/dist/tippy.css");
  import("tippy.js/themes/light.css");
  import("tippy.js/animations/shift-away.css");

  const defaultSettings = {
    arrow: true,
    theme: "light",
    animation: "shift-away",
  };

  settings = merge(defaultSettings, vuelessConfig.directives?.tooltip || {}) as DefaultProps;
  tippy.setDefaultProps(settings);
}

function onMounted(el: TippyTargetElement, bindings: DirectiveBindingContent): void;
function onMounted(el: TippyTargetElement, bindings: DirectiveBindingProps): void;
function onMounted(
  el: TippyTargetElement,
  bindings: DirectiveBindingProps | DirectiveBindingContent,
): void {
  if (isSSR) return;

  if (typeof bindings.value === "string" && bindings.value.length) {
    tippy(el, merge(settings, { content: bindings.value }));

    return;
  }

  if (
    typeof bindings.value !== "string" &&
    bindings.value.content &&
    String(bindings.value.content).length
  ) {
    tippy(el, merge(settings, bindings.value || {}));
  }

  const localBindings = computed(() => toValue(bindings));

  watch(
    localBindings,
    () => {
      updateTippyProps(el._tippy, localBindings.value.value);
    },
    { deep: true },
  );
}

function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingContent): void;
function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingProps): void;
function onUpdated(
  el: TippyTargetElement,
  bindings: DirectiveBindingProps | DirectiveBindingContent,
): void {
  if (!el._tippy || isSSR) return;

  updateTippyProps(el._tippy, bindings.value);
}

function onUnmounted(el: TippyTargetElement) {
  if (!el._tippy || isSSR) return;

  el._tippy.destroy();
}

function updateTippyProps(tippyInstance: TippyInstance | undefined, props: string | TippyProps) {
  if (!tippyInstance || isSSR) return;

  if (typeof props === "string") {
    tippyInstance.setProps(merge(settings, { content: props }));

    return;
  }

  tippyInstance.setProps(merge(settings, props || {}));
}

export default {
  mounted: onMounted,
  updated: onUpdated,
  unmounted: onUnmounted,
};
