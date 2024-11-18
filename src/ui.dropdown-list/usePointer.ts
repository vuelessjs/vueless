import { ref, computed, toValue } from "vue";
import type { Ref } from "vue";

interface Option {
  isSubGroup?: boolean;
  groupLabel?: string;
  [key: string]: unknown;
}

export default function usePointer(
  options: Option[],
  optionElements: Ref<HTMLElement[]>,
  listWrapperElement: Ref<HTMLElement | null>,
) {
  const pointer = ref<number | null>(null);
  const pointerDirty = ref<boolean>(false);

  const activeElementHeight = computed<number>(() => {
    if (pointer.value === null) return 0;
    const element = toValue(optionElements)[pointer.value];
    const isGroupLabel = element.dataset.groupLabel;
    const groupIndex = 2;

    if (isGroupLabel) {
      return toValue(optionElements)[pointer.value - groupIndex].getBoundingClientRect().height;
    }

    return element.getBoundingClientRect().height;
  });

  const pointerPosition = computed<number>(() => {
    return (pointer.value !== null ? pointer.value : 0) * activeElementHeight.value || 0;
  });

  function scrollWrapperToElement() {
    if (!listWrapperElement.value) return;
    const visibleElements =
      listWrapperElement.value.getBoundingClientRect().height / activeElementHeight.value;
    const currentElement = visibleElements - 1;
    const currentPointerPosition =
      pointerPosition.value - currentElement * activeElementHeight.value;

    if (listWrapperElement.value.scrollTop <= currentPointerPosition) {
      listWrapperElement.value.scrollTop = currentPointerPosition;
    }
  }

  function pointerForward() {
    if (pointer.value === null) pointer.value = 0;

    if (pointer.value < options.length - 1) {
      pointer.value++;

      const isGroup = options[pointer.value]?.isSubGroup || options[pointer.value]?.groupLabel;

      if (listWrapperElement.value) scrollWrapperToElement();

      if (options[pointer.value] && isGroup) {
        pointerForward();
      }
    }

    pointerDirty.value = true;
  }

  function pointerBackward() {
    if (pointer.value === null) pointer.value = 0;

    if (pointer.value > 0) {
      pointer.value--;

      const isGroup = options[pointer.value]?.isSubGroup || options[pointer.value]?.groupLabel;

      if (listWrapperElement.value && listWrapperElement.value.scrollTop >= pointerPosition.value) {
        listWrapperElement.value.scrollTop = pointerPosition.value;
      }

      if (options[pointer.value] && isGroup) {
        pointerBackward();
      }
    } else {
      if (options[0]?.groupLabel) {
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

    if (listWrapperElement.value) {
      listWrapperElement.value.scrollTop = 0;
    }
  }

  return {
    pointer,
    pointerDirty,
    pointerSet,
    pointerReset,
    pointerBackward,
    pointerForward,
  };
}
