import { onMounted, nextTick, ref, onBeforeUnmount, toValue, watch, computed, readonly } from "vue";

import { getRawValue, getFormattedValue } from "./utilFormat.ts";

import type { FormatOptions } from "./types.ts";

const digitSet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const rawDecimalMark = ".";
const comma = ",";
const minus = "-";

export default function useFormatCurrency(
  elementId: string = "",
  formatOptions: (() => FormatOptions) | FormatOptions,
) {
  let inputElement: HTMLInputElement | null = null;

  const formattedValue = ref("");
  const rawValue = ref("");
  const prevValue = ref("");

  const options = computed(() => toValue(formatOptions));

  watch(
    () => options,
    () => setValue(formattedValue.value),
    { deep: true },
  );

  onMounted(() => {
    inputElement = document.getElementById(elementId) as HTMLInputElement;

    if (inputElement) {
      inputElement.addEventListener("input", onInput);
      inputElement.addEventListener("keydown", onKeydown);
    }
  });

  onBeforeUnmount(() => {
    if (inputElement) {
      inputElement.removeEventListener("input", onInput);
    }
  });

  /**
   * Set input value manually.
   * @param {Intl.StringNumericLiteral} value
   * @returns {void}
   */
  function setValue(value: string) {
    const newFormattedValue = getFormattedValue(value, options.value);

    formattedValue.value = newFormattedValue;
    rawValue.value = getRawValue(newFormattedValue, options.value);

    prevValue.value = formattedValue.value;
  }

  function onKeydown(event: KeyboardEvent) {
    if (!event.target || !inputElement) return;

    const cursorStart = inputElement.selectionStart || 0;
    const cursorEnd = inputElement.selectionEnd || 0;
    const isSelection = cursorEnd !== cursorStart;

    if (event.key === "Backspace" && !isSelection) {
      const charToRemove = inputElement.value[cursorStart - 1];
      const isFormatChar = [
        options.value.thousandsSeparator,
        options.value.prefix,
        options.value.decimalSeparator,
      ].includes(charToRemove);

      // Skip unremovable character and put cursor one step back.
      if (isFormatChar && !inputElement.value.endsWith(options.value.decimalSeparator)) {
        event.preventDefault();

        inputElement.setSelectionRange(cursorStart - 1, cursorEnd - 1);
      }

      return;
    }

    const endsWithDecimal = formattedValue.value.endsWith(options.value.decimalSeparator);

    if ((event.key === comma || event.key === rawDecimalMark) && endsWithDecimal) {
      event.preventDefault();

      return;
    }
  }

  async function onInput(event: Event) {
    if (!event.target || !inputElement) return;

    await nextTick();

    const cursorStart = inputElement.selectionStart || 0;
    const cursorEnd = inputElement.selectionEnd || 0;

    const input = event.target as HTMLInputElement;

    let value = input.value || "";

    const prevCursorPosition = cursorEnd - 1;
    const eventData = (event as InputEvent).data || "";

    if (value === minus) {
      formattedValue.value = minus;
      rawValue.value = "";

      return;
    }

    if (!value || value.startsWith(`${options.value.decimalSeparator}0`)) {
      formattedValue.value = options.value.prefix;
      rawValue.value = "";

      return;
    }

    // Replace dot with decimal separator
    if (eventData === rawDecimalMark || eventData === comma) {
      value = [
        ...prevValue.value.slice(0, prevCursorPosition),
        options.value.decimalSeparator,
        ...prevValue.value.slice(prevCursorPosition),
      ].join("");
    }

    if (value.split(options.value.decimalSeparator).length > 2) {
      value = value.split("").with(value.lastIndexOf(options.value.decimalSeparator), "").join("");
    }

    const decimalSeparatorIndex = value.indexOf(options.value.decimalSeparator);
    const newRawValue = getRawValue(value, options.value);

    const isEventDataDecimal =
      value.endsWith(options.value.decimalSeparator) ||
      value.endsWith(`${options.value.decimalSeparator}0`);

    if (
      isEventDataDecimal &&
      cursorStart > decimalSeparatorIndex &&
      !options.value.minFractionDigits
    ) {
      formattedValue.value = value;

      rawValue.value = newRawValue;

      return;
    }

    const isNumericValue = eventData && digitSet.includes(eventData);
    const isMinus = cursorEnd === 1 && cursorStart === 1 && eventData === minus;
    const isDoubleMinus = isMinus && prevValue.value.startsWith(minus);
    const isMinusWithin = newRawValue.includes(minus) && !newRawValue.startsWith(minus);

    const isReservedSymbol = eventData !== rawDecimalMark && eventData !== comma;

    if (
      (!isNumericValue && isReservedSymbol && !isMinus && eventData.length === 1) ||
      isDoubleMinus ||
      isMinusWithin
    ) {
      inputElement.value = formattedValue.value;

      await nextTick();

      inputElement.setSelectionRange(cursorStart, cursorEnd);

      return;
    }

    const newFormattedValue = getFormattedValue(newRawValue, options.value);

    if (Number.isNaN(newFormattedValue) || newFormattedValue.includes("NaN")) {
      inputElement.value = prevValue.value;

      return;
    }

    formattedValue.value = newFormattedValue;
    rawValue.value = getRawValue(newFormattedValue, options.value);

    inputElement.value = formattedValue.value;

    await setInputCursor(newFormattedValue, inputElement, cursorStart, cursorEnd);

    prevValue.value = formattedValue.value;
  }

  async function setInputCursor(
    newValue: string,
    inputElement: HTMLInputElement,
    prevCursorStart: number | null,
    prevCursorEnd: number | null,
  ) {
    const hasValueInputValue = prevCursorStart === 1 && prevCursorEnd === 1;

    const currentValueOffsetLength = newValue
      .split("")
      .filter((value: string) => value === options.value.thousandsSeparator).length;

    const prevValueOffsetLength = prevValue.value
      .split("")
      .filter((value) => value === options.value.thousandsSeparator).length;

    const prefixLength = options.value.prefix.length;
    const offset = currentValueOffsetLength - prevValueOffsetLength;

    await nextTick();

    if (offset < 0 && inputElement) {
      inputElement.setSelectionRange(prevCursorStart, prevCursorEnd);

      return;
    }

    if (newValue.length === prevCursorEnd || !prevCursorStart || !prevCursorEnd) return;

    let newCursorStart = prevCursorStart;
    let newCursorEnd = prevCursorEnd;

    if (hasValueInputValue && prefixLength) {
      newCursorStart += prefixLength;
      newCursorEnd += prefixLength;
    }

    if (inputElement) {
      inputElement.setSelectionRange(newCursorStart + offset, newCursorEnd + offset);
    }
  }

  return { rawValue: readonly(rawValue), formattedValue: readonly(formattedValue), setValue };
}
