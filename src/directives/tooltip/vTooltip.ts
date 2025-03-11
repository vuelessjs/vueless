import tippy from "tippy.js";
import { merge } from "lodash-es";

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

  setUpTippy(el, bindings.value);
}

function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingContent): void;
function onUpdated(el: TippyTargetElement, bindings: DirectiveBindingProps): void;
function onUpdated(
  el: TippyTargetElement,
  bindings: DirectiveBindingProps | DirectiveBindingContent,
): void {
  if (isSSR) return;

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
  if (typeof props === "string" && props.length) {
    tippy(el, merge(settings, { content: props }));

    return;
  }

  if (typeof props !== "string" && props.content && String(props.content).length) {
    tippy(el, merge(settings, props || {}));
  }
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
