import { unref } from "vue";

function clickOutside(target, handler, options) {
  const { capture = true, ignore = [] } = options;

  const ignoreList = unref(ignore).map((item) => unref(item));
  const el = unref(target);

  function onClick(event) {
    if (
      !el ||
      el === event.target ||
      event.composedPath().some((pathEl) => ignoreList.includes(pathEl)) ||
      event.composedPath().includes(el) ||
      ignoreList.includes(event.target)
    ) {
      return;
    }

    handler(event);
  }

  window.addEventListener("click", onClick, { passive: true, capture });
  window.addEventListener("pointerdown", onClick, { passive: true });

  function removeEvents() {
    window.removeEventListener("click", onClick, { capture, passive: true });
    window.removeEventListener("pointerdown", onClick, { passive: true });
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

  updated(el, binding) {
    el._clickOutsideRemove();

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
