import { ref, computed } from "vue";

export default function usePointer(options, optionHeight, listWrapperElement) {
  const pointer = ref(null);
  const pointerDirty = ref(false);

  const pointerPosition = computed(() => {
    return pointer.value * optionHeight || 0;
  });

  function scrollWrapperToElement() {
    const visibleElements = listWrapperElement.value.getBoundingClientRect().height / optionHeight;
    const currentElement = visibleElements - 1;
    const currentPointerPosition = pointerPosition.value - currentElement * optionHeight;

    if (listWrapperElement.value.scrollTop <= currentPointerPosition) {
      listWrapperElement.value.scrollTop = currentPointerPosition;
    }
  }

  function pointerForward() {
    if (pointer.value < options.length - 1) {
      pointer.value++;

      const isGroup =
        options[pointer.value].$isLabel ||
        options[pointer.value].isSubGroup ||
        options[pointer.value].$groupLabel;

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

      const isGroup =
        options[pointer.value].$isLabel ||
        options[pointer.value].isSubGroup ||
        options[pointer.value].$groupLabel;

      if (listWrapperElement && listWrapperElement.value.scrollTop >= pointerPosition.value) {
        listWrapperElement.value.scrollTop = pointerPosition.value;
      }

      if (options[pointer.value] && isGroup) {
        pointerBackward();
      }
    } else {
      if (options[pointer.value] && options[0].$isLabel) {
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
