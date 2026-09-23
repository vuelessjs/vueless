import defaultConfig from "./config";

import type { ListboxOption, SlotOption } from "../ui.form-listbox/types";
import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

/**
 * The option slots are forwarded verbatim to `UListbox`, so they inherit its flattening: with
 * `groupValueKey` set, `filterGroups` concats nested group members into the list the slots iterate
 * and those members need not carry the parent's members. Hence `SlotOption`, which is `Partial`.
 *
 * `selectedOptions` is different — it is a `filter`ed subset of `props.options` (`UDropdown.vue:91`)
 * with no synthetic entry, so it keeps the full `TOption` guarantee.
 */
export interface UDropdownSlots<TOption extends ListboxOption = ListboxOption> {
  default?: (props: {
    /* `displayLabel` joins `option[labelKey]` lookups, which yield `undefined` for an option
       without that key — so it is only `string` when the label is resolvable. */
    opened: boolean;
    displayLabel: string | undefined;
    fullLabel: string;
    selectedOptions: TOption[];
  }) => unknown;
  dropdown?: (props: { opened: boolean; contentClasses: string | undefined }) => unknown;
  "before-option"?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  option?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  "after-option"?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  empty?: () => unknown;
}

export interface Props<TOption extends ListboxOption = ListboxOption> {
  /**
   * Selected dropdown value.
   */
  modelValue?: string | number | UnknownObject | (string | number | UnknownObject)[];

  /**
   * Dropdown label.
   */
  label?: string;

  /**
   * Determines how many selected option labels are shown in the label.
   */
  labelDisplayCount?: number;

  /**
   * Options list.
   */
  options?: TOption[];

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
   * Dropdown color.
   */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "notice"
    | "neutral"
    | "grayscale";

  /**
   * Dropdown size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Shows input to search value in a list.
   */
  searchable?: boolean;

  /**
   * Search input model value for the dropdown list.
   */
  search?: string;

  /**
   * Close dropdown on option select.
   */
  closeOnSelect?: boolean;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Disable the dropdown.
   */
  disabled?: boolean;

  /**
   * The position of a dropdown list on the x-axis.
   */
  xPosition?: "left" | "right";

  /**
   * The position of a dropdown list on the y-axis.
   */
  yPosition?: "top" | "bottom";

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
