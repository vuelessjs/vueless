import { onMounted, nextTick, ref, onBeforeUnmount, toValue, watch } from "vue";

import { getRawValue, getFormattedValue } from "./utilFormat.ts";

import type { FormatOptions } from "./types.ts";

export default function useFormatCurrency(
  elementId: string = "",
  options: (() => FormatOptions) | FormatOptions,
) {
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
      inputElement.addEventListener("input", onInput);
      onInput(formattedValue.value as unknown as InputEvent);
    }
  });

  onBeforeUnmount(() => {
    if (inputElement) {
      inputElement.removeEventListener("input", onInput);
    }
  });

  // Use to set input value manually
  function setValue(value: string | number) {
    const localFormattedValue = getFormattedValue(value, toValue(options));

    formattedValue.value = localFormattedValue;
    rawValue.value = getRawValue(localFormattedValue, toValue(options));

    prevValue = formattedValue.value;
  }

  async function onInput(event: Event) {
    if (!event.target) return;

    await nextTick(async () => {
      if (!inputElement) return;

      let cursorStart = inputElement.selectionStart;
      let cursorEnd = inputElement.selectionEnd;

      const hasValueInputValue = cursorEnd === 1 && cursorStart === 1;
      const input = event.target as HTMLInputElement;
      const value = input.value || "";

      const localFormattedValue = getFormattedValue(value, toValue(options));

      const currentValueOffsetLength = localFormattedValue
        .split("")
        .filter((value: string) => value === toValue(options).thousandsSeparator).length;

      const prevValueOffsetLength = prevValue
        .split("")
        .filter((value) => value === toValue(options).thousandsSeparator).length;

      const prefixLength = toValue(options).prefix.length;
      const offset = currentValueOffsetLength - prevValueOffsetLength;

      formattedValue.value = localFormattedValue || toValue(options).prefix;
      rawValue.value = getRawValue(localFormattedValue, toValue(options));

      await nextTick(() => {
        if (localFormattedValue.length === cursorEnd || !cursorStart || !cursorEnd) return;

        if (hasValueInputValue && prefixLength) {
          cursorStart += prefixLength;
          cursorEnd += prefixLength;
        }

        if (inputElement) {
          inputElement.setSelectionRange(cursorStart + offset, cursorEnd + offset);
        }
      });

      prevValue = formattedValue.value;
    });
  }

  return { rawValue, formattedValue, setValue };
}
