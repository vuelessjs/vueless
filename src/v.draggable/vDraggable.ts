import { isProxy } from "vue";
import { useDraggable } from "../composables/useDraggable.ts";

import type { ObjectDirective, Ref, MaybeRef } from "vue";
import type { UseDraggableOptions } from "../composables/useDraggable.ts";

const directiveHooks = {
  mounted: "mounted" as const,
  unmounted: "unmounted" as const,
};

type VDraggableBinding = [list: MaybeRef<any[]>, options?: MaybeRef<UseDraggableOptions<any>>];

const elementMap: WeakMap<HTMLElement, () => void> = new WeakMap();

export const vDraggable: ObjectDirective<HTMLElement, VDraggableBinding | MaybeRef<any[]>> = {
  [directiveHooks.mounted](el, binding) {
    const params = isProxy(binding.value) ? [binding.value] : binding.value;

    const [list, options] = params as VDraggableBinding;

    const state = useDraggable(el!, list as Ref, options);

    elementMap.set(el, state.destroy);
  },
  [directiveHooks.unmounted](el) {
    elementMap.get(el)?.();
    elementMap.delete(el);
  },
};
