import { ref, computed, toValue } from "vue";

import type { MaybeRef } from "vue";
import type { Option } from "./types.ts";

export default function usePointer(
  options: MaybeRef<Option[]>,
  optionElements: MaybeRef<HTMLLIElement[] | null>,
  listWrapperElement: MaybeRef<HTMLDivElement | null>,
) {
  const pointer = ref(0);
  const pointerDirty = ref(false);

  const localOptions = computed(() => toValue(options));
  const localOptionElements = computed(() => toValue(optionElements));
  const localListWrapperElement = computed(() => toValue(listWrapperElement));

  const activeElementHeight = computed(() => {
    const isGroupLabel = localOptionElements.value?.at(pointer.value)?.dataset?.groupLabel || "";
    const groupIndex = 2;

    if (isGroupLabel) {
      const prevIndex = pointer.value - groupIndex;

      return localOptionElements.value?.at(prevIndex)?.getBoundingClientRect()?.height || 0;
    }

    return localOptionElements.value?.at(pointer.value)?.getBoundingClientRect()?.height || 0;
  });

  const pointerPosition = computed(() => {
    return pointer.value * activeElementHeight.value || 0;
  });

  function scrollWrapperToElement() {
    if (!localListWrapperElement.value) return;

    const visibleElements =
      localListWrapperElement.value.getBoundingClientRect().height / activeElementHeight.value;
    const currentElement = visibleElements - 1;
    const currentPointerPosition =
      pointerPosition.value - currentElement * activeElementHeight.value;

    if (localListWrapperElement.value.scrollTop <= currentPointerPosition) {
      localListWrapperElement.value.scrollTop = currentPointerPosition;
    }
  }

  function pointerForward() {
    if (pointer.value < localOptions.value.length - 1) {
      pointer.value++;

      const isGroup =
        localOptions.value[pointer.value].isSubGroup ||
        localOptions.value[pointer.value].groupLabel;

      if (localListWrapperElement.value) scrollWrapperToElement();

      if (localOptions.value[pointer.value] && isGroup) {
        pointerForward();
      }
    }

    pointerDirty.value = true;
  }

  function pointerBackward() {
    if (pointer.value > 0) {
      pointer.value--;

      const isGroup =
        localOptions.value[pointer.value].isSubGroup ||
        localOptions.value[pointer.value].groupLabel;

      if (
        localListWrapperElement.value &&
        localListWrapperElement.value.scrollTop >= pointerPosition.value
      ) {
        localListWrapperElement.value.scrollTop = pointerPosition.value;
      }

      if (localOptions.value[pointer.value] && isGroup) {
        pointerBackward();
      }
    } else {
      if (localOptions.value[pointer.value] && localOptions.value[0].groupLabel) {
        pointerForward();
      }
    }

    pointerDirty.value = true;
  }

  function pointerSet(index: number) {
    pointer.value = index;
    pointerDirty.value = true;
  }

  function pointerReset() {
    pointer.value = 0;

    if (localListWrapperElement.value) {
      localListWrapperElement.value.scrollTop = 0;
    }
  }

  return { pointer, pointerDirty, pointerSet, pointerReset, pointerBackward, pointerForward };
}
