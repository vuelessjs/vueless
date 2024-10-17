import { onMounted, nextTick, ref, onBeforeUnmount, toValue, watch } from "vue";

import FormatService from "./utilFormat";

export default function useFormatCurrency(elementId, options) {
  let prevValue = "";
  let inputElement = null;

  const formattedValue = ref("");
  const rawValue = ref("");

  // update value according to updated options
  watch(
    () => toValue(options),
    () => setValue(formattedValue.value),
    { deep: true },
  );

  onMounted(() => {
    inputElement = document.getElementById(elementId);
    inputElement.addEventListener("input", onInput);

    onInput(formattedValue.value);
  });

  onBeforeUnmount(() => {
    inputElement.removeEventListener("input", onInput);
  });

  // Use to set input value manually
  function setValue(value) {
    const localFormattedValue = FormatService.getFormattedValue(value, toValue(options));

    formattedValue.value = localFormattedValue;
    rawValue.value = FormatService.getRawValue(localFormattedValue, toValue(options));

    prevValue = formattedValue.value;
  }

  async function onInput(event) {
    if (!event.target) return;

    await nextTick(async () => {
      let cursorStart = inputElement.selectionStart;
      let cursorEnd = inputElement.selectionEnd;

      const hasValueInputValue = cursorEnd === 1 && cursorStart === 1;
      const value = event.target ? event.target.value : "";

      const localFormattedValue = FormatService.getFormattedValue(value, toValue(options));

      const currentValueOffsetLength = localFormattedValue
        .split("")
        .filter((value) => value === toValue(options).thousandsSeparator).length;

      const prevValueOffsetLength = prevValue
        .split("")
        .filter((value) => value === toValue(options).thousandsSeparator).length;

      const prefixLength = toValue(options).prefix.length;
      const offset = currentValueOffsetLength - prevValueOffsetLength;

      formattedValue.value = localFormattedValue || toValue(options).prefix;
      rawValue.value = FormatService.getRawValue(localFormattedValue, toValue(options));

      await nextTick(() => {
        if (localFormattedValue.length === cursorEnd) return;

        if (hasValueInputValue && prefixLength) {
          cursorStart += prefixLength;
          cursorEnd += prefixLength;
        }

        inputElement.setSelectionRange(cursorStart + offset, cursorEnd + offset);
      });

      prevValue = formattedValue.value;
    });
  }

  return { rawValue, formattedValue, setValue };
}
