import { onMounted, nextTick, ref, onBeforeUnmount, toValue, watch } from "vue";

import FormatService from "./utilFormat.ts";

import type { FormatOptions } from "./types.ts";

export default function useFormatCurrency(elementId: string, options: () => FormatOptions) {
  let prevValue = "";
  let inputElement: HTMLInputElement | null = null;

  const formattedValue = ref("");
  const rawValue = ref("");

  // update value according to updated options
  watch(
    () => toValue(options),
    () => setValue(formattedValue.value),
    { deep: true },
  );

  onMounted(() => {
    inputElement = document.getElementById(elementId) as HTMLInputElement;

    if (inputElement) {
      inputElement.addEventListener("input", onInput as EventListener);
      onInput({ target: inputElement } as unknown as InputEvent);
    }
  });

  onBeforeUnmount(() => {
    if (inputElement) {
      inputElement.removeEventListener("input", onInput as EventListener);
    }
  });

  // Use to set input value manually
  function setValue(value: string | number) {
    const localFormattedValue = FormatService.getFormattedValue(value, toValue(options));

    formattedValue.value = localFormattedValue;
    rawValue.value = FormatService.getRawValue(localFormattedValue, toValue(options));

    prevValue = formattedValue.value;
  }

  // TODO: Discuss whether InputEvent is needed here, as it leads to problem with EventListener type
  async function onInput(event) {
    if (!event.target) return;

    await nextTick(async () => {
      if (!inputElement) return;

      let cursorStart = inputElement.selectionStart;
      let cursorEnd = inputElement.selectionEnd;

      const hasValueInputValue = cursorEnd === 1 && cursorStart === 1;
      const value = event.target ? event.target.value : "";

      const localFormattedValue = FormatService.getFormattedValue(value, toValue(options));

      const currentValueOffsetLength = localFormattedValue
        .split("")
        .filter((value: string) => value === toValue(options).thousandsSeparator).length;

      const prevValueOffsetLength = prevValue
        .split("")
        .filter((value) => value === toValue(options).thousandsSeparator).length;

      const prefixLength = toValue(options).prefix.length;
      const offset = currentValueOffsetLength - prevValueOffsetLength;

      formattedValue.value = localFormattedValue || toValue(options).prefix;
      rawValue.value = FormatService.getRawValue(localFormattedValue, toValue(options));

      await nextTick(() => {
        if (localFormattedValue.length === cursorEnd) return;

        if (hasValueInputValue && prefixLength && cursorStart && cursorEnd) {
          cursorStart += prefixLength;
          cursorEnd += prefixLength;
        }

        if (inputElement && cursorStart && cursorEnd) {
          inputElement.setSelectionRange(cursorStart + offset, cursorEnd + offset);
        }
      });

      prevValue = formattedValue.value;
    });
  }

  return { rawValue, formattedValue, setValue };
}
