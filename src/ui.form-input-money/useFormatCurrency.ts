import { onMounted, nextTick, ref, onBeforeUnmount, toValue, watch, computed, readonly } from "vue";

import { getRawValue, getFormattedValue } from "./utilFormat.ts";

import { RAW_DECIMAL_MARK } from "./constants.ts";

import type { FormatOptions } from "./types.ts";

const digitSet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
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
    () => {
      validateOptions();
      setValue(formattedValue.value);
    },
    { deep: true },
  );

  onMounted(() => {
    validateOptions();
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

  function validateOptions() {
    const warnMessages = [];

    if (options.value.decimalSeparator.length > 1) {
      warnMessages.push(
        "[VUELESS/UInputMoney]: DecimalSeparator should not contain more than one symbol.",
      );
    }

    if (options.value.thousandsSeparator.length > 1) {
      warnMessages.push(
        "[VUELESS/UInputMoney]: ThousandsSeparator should not contain more than one symbol.",
      );
    }

    // eslint-disable-next-line no-console
    warnMessages.forEach((message) => console.warn(message));
  }

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

    if ((event.key === comma || event.key === RAW_DECIMAL_MARK) && endsWithDecimal) {
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
    if (eventData === RAW_DECIMAL_MARK || eventData === comma) {
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

    const isReservedSymbol = eventData !== RAW_DECIMAL_MARK && eventData !== comma;

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

    const currentFraction = (newRawValue.split(RAW_DECIMAL_MARK).at(1) || "").slice(
      0,
      options.value.maxFractionDigits,
    );

    const newFormattedValue = getFormattedValue(newRawValue, {
      ...options.value,
      minFractionDigits: currentFraction.length,
    });

    if (Number.isNaN(newFormattedValue) || newFormattedValue.includes("NaN")) {
      inputElement.value = prevValue.value;

      return;
    }

    formattedValue.value = newFormattedValue;
    rawValue.value = getRawValue(newFormattedValue, options.value);

    inputElement.value = formattedValue.value;

    await setInputCursor(newFormattedValue, inputElement, cursorStart, cursorEnd, eventData);

    prevValue.value = formattedValue.value;
  }

  async function setInputCursor(
    newValue: string,
    inputElement: HTMLInputElement,
    prevCursorStart: number,
    prevCursorEnd: number,
    eventData: string,
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

    if (newValue.length <= 1) return;

    // Move cursor after decimal mark
    if (newValue.length < prevValue.value.length && eventData) {
      const newChar = newValue[prevCursorEnd - 1];

      prevCursorEnd -= newChar === options.value.decimalSeparator ? 0 : 1;
      prevCursorStart -= newChar === options.value.decimalSeparator ? 0 : 1;
    }

    if (offset < 0 && inputElement && eventData) {
      inputElement.setSelectionRange(prevCursorStart, prevCursorEnd);

      return;
    }

    // Move cursor step back on backspace.
    if (offset < 0 && inputElement && !eventData) {
      inputElement.setSelectionRange(prevCursorStart - 1, prevCursorEnd - 1);

      return;
    }

    if (newValue.length === prevCursorEnd || !prevCursorStart || !prevCursorEnd) return;

    let newCursorStart = prevCursorStart + offset;
    let newCursorEnd = prevCursorEnd + offset;

    if (hasValueInputValue && prefixLength) {
      newCursorStart += prefixLength;
      newCursorEnd += prefixLength;
    }

    if (inputElement) {
      inputElement.setSelectionRange(newCursorStart, newCursorEnd);
    }
  }

  return { rawValue: readonly(rawValue), formattedValue: readonly(formattedValue), setValue };
}
