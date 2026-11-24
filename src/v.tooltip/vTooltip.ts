import tippy from "tippy.js";
import { merge } from "lodash-es";

import { vuelessConfig } from "../utils/ui";
import { isCSR, isSSR } from "../utils/helper";

import type { DefaultProps, Instance as TippyInstance, Props as TippyProps } from "tippy.js";
import type { TippyTargetElement, DirectiveBindingContent, DirectiveBindingProps } from "./types";

let settings: Partial<DefaultProps> = {};

if (isCSR) {
  import("tippy.js/dist/tippy.css");
  import("tippy.js/animations/shift-away.css");

  const defaultSettings = {
    arrow: true,
    theme: "vueless",
    animation: "shift-away",
  };

  settings = merge({}, defaultSettings, vuelessConfig.directives?.tooltip || {}) as DefaultProps;
  tippy.setDefaultProps(settings);
}

function onMounted(el: TippyTargetElement, bindings: DirectiveBindingContent): void;
function onMounted(el: TippyTargetElement, bindings: DirectiveBindingProps): void;
function onMounted(
  el: TippyTargetElement,
  bindings: DirectiveBindingProps | DirectiveBindingContent,
): void {
  if (isSSR) return;

  setUpTippy(el, bindings.value);
}

function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingContent): void;
function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingProps): void;
function onUpdated(
  el: TippyTargetElement,
  bindings: DirectiveBindingProps | DirectiveBindingContent,
): void {
  if (isSSR) return;

  if (!hasContent(bindings.value)) {
    el._tippy?.destroy();

    return;
  }

  if (!el._tippy) {
    setUpTippy(el, bindings.value);

    return;
  }

  updateTippyProps(el._tippy, bindings.value);
}

function onUnmounted(el: TippyTargetElement) {
  if (!el._tippy || isSSR) return;

  el._tippy.destroy();
}

function setUpTippy(el: HTMLElement, props: string | TippyProps) {
  if (!hasContent(props)) return;

  if (typeof props === "string") {
    tippy(el, merge({}, settings, { content: props }));

    return;
  }

  tippy(el, merge({}, settings, props));
}

function hasContent(props: string | TippyProps) {
  const content = typeof props === "string" ? props : props?.content;

  return Boolean(content);
}

function updateTippyProps(tippyInstance: TippyInstance | undefined, props: string | TippyProps) {
  if (!tippyInstance || isSSR) return;

  if (typeof props === "string") {
    tippyInstance.setProps(merge({}, settings, { content: props }));

    return;
  }

  tippyInstance.setProps(merge({}, settings, props || {}));
}

export default {
  mounted: onMounted,
  updated: onUpdated,
  unmounted: onUnmounted,
};
