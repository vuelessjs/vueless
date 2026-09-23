import defaultConfig from "./config";

import type { BaseOption, SlotOption } from "../ui.form-listbox/types";
import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

/* Any object shape is a valid option, only reserved option keys are type checked. */
export type SelectOption = BaseOption & (object | UnknownObject);

/**
 * Shape of a selected option exposed to slots.
 *
 * `getCurrentOption` falls back to `{} as Option` when no option matches (`utilSelect.ts:15`), and
 * that empty object reaches `selected-option`, `left` and `right` verbatim — confirmed by runtime
 * probe. In `multiple` mode it is an element of the array given to `selected-options`. So no member
 * of `TOption` can be promised; `SlotOption` (Stage 2's type) already encodes exactly that.
 */
export type SelectedSlotOption<TOption extends SelectOption = SelectOption> = SlotOption<TOption>;

/**
 * What `left`, `right` and `selected-options` receive: `multiple ? selectedOptions.full : selectedOption`.
 * In `multiple` mode a non-matching `modelValue` entry contributes a `{}` element to the array.
 */
export type SelectedOptionsBinding<TOption extends SelectOption = SelectOption> =
  | SelectedSlotOption<TOption>
  | SelectedSlotOption<TOption>[];

export interface USelectSlots<TOption extends SelectOption = SelectOption> {
  label?: (props: { label: string }) => unknown;
  description?: (props: { description: string }) => unknown;
  error?: (props: { error: string | boolean }) => unknown;
  left?: (props: { iconName: string; options: SelectedOptionsBinding<TOption> }) => unknown;
  right?: (props: { iconName: string; options: SelectedOptionsBinding<TOption> }) => unknown;
  toggle?: (props: { iconName: string; opened: boolean }) => unknown;
  clear?: (props: { iconName: string; clear: (event: MouseEvent) => void }) => unknown;
  "before-toggle"?: () => unknown;
  "after-toggle"?: () => unknown;
  "selected-options"?: (props: { options: SelectedOptionsBinding<TOption> }) => unknown;
  /* All four `selected-option` sites bind a single option, never an array: the `!multiple` branch
   * binds the selected option and each `multiple` variant binds a `selectedOptions.visible` element.
   * A runtime probe records a bare `{}` here in all three variants, hence the optional members. */
  "selected-option"?: (props: {
    label: unknown;
    value: unknown;
    option: SelectedSlotOption<TOption>;
  }) => unknown;
  "selected-counter"?: (props: { count: number }) => unknown;
  "before-option"?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  option?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  "after-option"?: (props: {
    option: SlotOption<TOption>;
    selected: boolean;
    index: number;
  }) => unknown;
  empty?: () => unknown;
}

export interface Props<TOption extends SelectOption = SelectOption> {
  /**
   * Select value.
   */
  modelValue?: number | string | (number | string)[];

  /**
   * Select options.
   */
  options?: TOption[];

  /**
   * Select label.
   */
  label?: string;

  /**
   * Label placement.
   */
  labelAlign?: "topInside" | "top" | "topWithDesc" | "left" | "right";

  /**
   * Select placeholder.
   */
  placeholder?: string;

  /**
   * Select description.
   */
  description?: string;

  /**
   * Select error message.
   */
  error?: string | boolean;

  /**
   * Select size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Time in milliseconds before search value emit.
   */
  debounce?: number | string;

  /**
   * Search input model value for the dropdown list.
   */
  search?: string;

  /**
   * Close dropdown on option select.
   */
  closeOnSelect?: boolean;

  /**
   * Left icon name.
   */
  leftIcon?: string;

  /**
   * Right icon name.
   */
  rightIcon?: string;

  /**
   * Select toggle icon.
   */
  toggleIcon?: boolean | string;

  /**
   * Select open direction.
   * @extendOnly
   */
  openDirection?: "auto" | "top" | "bottom";

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Value key in the item object of options.
   */
  valueKey?: string;

  /**
   * Set a name of the property containing the group label.
   */
  groupLabelKey?: string;

  /**
   * Set a name of the property containing the group values.
   */
  groupValueKey?: string;

  /**
   * Number of options displayed in the dropdown.
   */
  optionsLimit?: number;

  /**
   * Number of options you can see without a scroll.
   */
  visibleOptions?: number;

  /**
   * Allow clearing selected value.
   */
  clearable?: boolean;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Controls multiple selection view.
   */
  multipleVariant?: "inline" | "list" | "badge";

  /**
   * Determines how many selected option labels are shown in the label.
   */
  labelDisplayCount?: number;

  /**
   * Allows to search value in a list.
   */
  searchable?: boolean;

  /**
   * Make select read-only.
   */
  readonly?: boolean;

  /**
   * Disable the select.
   */
  disabled?: boolean;

  /**
   * Show "Add new option" button in the list.
   */
  addOption?: boolean;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
