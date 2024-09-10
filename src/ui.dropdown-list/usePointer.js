import { ref, computed, toValue } from "vue";

export default function usePointer(options, optionElements, listWrapperElement) {
  const pointer = ref(null);
  const pointerDirty = ref(false);

  const activeElementHeight = computed(() => {
    const isGroupLabel = toValue(optionElements).at(pointer.value).dataset.groupLabel;
    const groupIndex = 2;

    if (isGroupLabel) {
      return toValue(optionElements)
        .at(pointer.value - groupIndex)
        .getBoundingClientRect().height;
    }

    return toValue(optionElements).at(pointer.value).getBoundingClientRect().height;
  });

  const pointerPosition = computed(() => {
    return pointer.value * activeElementHeight.value || 0;
  });

  function scrollWrapperToElement() {
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
    if (pointer.value < options.length - 1) {
      pointer.value++;

      const isGroup = options[pointer.value].isSubGroup || options[pointer.value].groupLabel;

      if (listWrapperElement) scrollWrapperToElement();

      if (options[pointer.value] && isGroup) {
        pointerForward();
      }
    }

    pointerDirty.value = true;
  }

  function pointerBackward() {
    if (pointer.value > 0) {
      pointer.value--;

      const isGroup = options[pointer.value].isSubGroup || options[pointer.value].groupLabel;

      if (listWrapperElement && listWrapperElement.value.scrollTop >= pointerPosition.value) {
        listWrapperElement.value.scrollTop = pointerPosition.value;
      }

      if (options[pointer.value] && isGroup) {
        pointerBackward();
      }
    } else {
      if (options[pointer.value] && options[0].groupLabel) {
        pointerForward();
      }
    }

    pointerDirty.value = true;
  }

  function pointerSet(index) {
    pointer.value = index;
    pointerDirty.value = true;
  }

  function pointerReset() {
    pointer.value = 0;

    if (listWrapperElement) listWrapperElement.value.scrollTop = 0;
  }

  return { pointer, pointerDirty, pointerSet, pointerReset, pointerBackward, pointerForward };
}
