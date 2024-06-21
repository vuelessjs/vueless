import { unref } from "vue";

function clickOutside(target, handler, options) {
  const { capture = true, ignore = [] } = options;

  let shouldListen = true;

  const ignoreList = unref(ignore).map((item) => unref(item));
  const el = unref(target);

  function onClick(event) {
    if (
      !el ||
      el === event.target ||
      event.composedPath().includes(el) ||
      ignoreList.includes(event.target)
    ) {
      return;
    }

    if (!shouldListen) {
      shouldListen = true;

      return;
    }

    handler(event);
  }

  function onPointerdown(event) {
    shouldListen = !!(el && !event.composedPath().includes(el));
  }

  window.addEventListener("click", onClick, { passive: true, capture });
  window.addEventListener("pointerdown", onPointerdown, { passive: true });

  function removeEvents() {
    window.removeEventListener("click", onClick, { capture, passive: true });
    window.removeEventListener("pointerdown", onPointerdown, { passive: true });
  }

  return removeEvents;
}

export default {
  mounted(el, binding) {
    const capture = !binding.modifiers.bubble;

    if (typeof binding.value === "function") {
      el._clickOutsideRemove = clickOutside(el, binding.value, { capture });
    } else {
      const [handler, options] = binding.value;

      el._clickOutsideRemove = clickOutside(el, handler, Object.assign({ capture }, options));
    }
  },

  unmounted(el) {
    el._clickOutsideRemove();
  },
};
