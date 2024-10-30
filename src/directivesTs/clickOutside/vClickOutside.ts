import { unref } from "vue";

import type { MaybeRef } from "vue";
import type {
  ClickOutsideOptions,
  ClickCallback,
  RemoveEvents,
  ClickOutsideTargetElement,
  DirectiveBindingCallback,
  DirectiveBindingOptions,
} from "./types";

function clickOutside(
  target: MaybeRef<HTMLElement | null>,
  handler: ClickCallback,
  options: ClickOutsideOptions,
): RemoveEvents {
  const { capture = true, ignore = [] } = options;

  const ignoreList = ignore.map((item) => unref(item));
  const el = unref(target);

  function onClick(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) return;

    const targetElements = event.composedPath().filter((element) => element instanceof HTMLElement);

    if (
      !el ||
      el === event.target ||
      targetElements.some((pathEl) => ignoreList.includes(pathEl)) ||
      targetElements.includes(el) ||
      ignoreList.includes(event.target)
    ) {
      return;
    }

    handler(event);
  }

  window.addEventListener("click", onClick, { passive: true, capture });
  window.addEventListener("pointerdown", onClick, { passive: true });

  function removeEvents() {
    window.removeEventListener("click", onClick, capture);
    window.removeEventListener("pointerdown", onClick);
  }

  return removeEvents;
}

function onMounted(el: ClickOutsideTargetElement, binding: DirectiveBindingCallback): void;
function onMounted(el: ClickOutsideTargetElement, binding: DirectiveBindingOptions): void;
function onMounted(
  el: ClickOutsideTargetElement,
  binding: DirectiveBindingOptions | DirectiveBindingCallback,
): void {
  const capture = !binding.modifiers.bubble;

  if (typeof binding.value === "function") {
    el._clickOutsideRemove = clickOutside(el, binding.value, { capture });
  } else {
    const [handler, options] = binding.value;

    el._clickOutsideRemove = clickOutside(el, handler, Object.assign({ capture }, options));
  }
}

function onUpdated(el: ClickOutsideTargetElement, binding: DirectiveBindingCallback): void;
function onUpdated(el: ClickOutsideTargetElement, binding: DirectiveBindingOptions): void;
function onUpdated(
  el: ClickOutsideTargetElement,
  binding: DirectiveBindingOptions | DirectiveBindingCallback,
): void {
  el._clickOutsideRemove();

  const capture = !binding.modifiers.bubble;

  if (typeof binding.value === "function") {
    el._clickOutsideRemove = clickOutside(el, binding.value, { capture });
  } else {
    const [handler, options] = binding.value;

    el._clickOutsideRemove = clickOutside(el, handler, Object.assign({ capture }, options));
  }
}

function onUnmounted(el: ClickOutsideTargetElement) {
  el._clickOutsideRemove();
}

export default {
  mounted: onMounted,
  updated: onUpdated,
  unmounted: onUnmounted,
};
