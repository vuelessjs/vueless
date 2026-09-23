import defaultConfig from "./config";

import type { ListboxOption, SlotOption } from "../ui.form-listbox/types";
import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

/* Option slots are forwarded through `UDropdown` to `UListbox`, inheriting its group flattening —
   a flattened member need not carry the parent's members, so `SlotOption` is `Partial`. */
export interface UDropdownButtonSlots<TOption extends ListboxOption = ListboxOption> {
  /* `label` is `UDropdown`'s `displayLabel`, a join of `option[labelKey]` lookups — `undefined`
     when the label cannot be resolved. */
  default?: (props: { label: string | undefined; opened: boolean }) => unknown;
  left?: (props: { opened: boolean }) => unknown;
  toggle?: (props: { opened: boolean }) => unknown;
  "before-option"?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  option?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  "after-option"?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  empty?: () => unknown;
}

export interface Props<TOption extends ListboxOption = ListboxOption> {
  /**
   * Selected button.
   */
  modelValue?: string | number | UnknownObject | (string | number | UnknownObject)[];

  /**
   * Button label.
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
   * Button variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft" | "ghost";

  /**
   * Button color.
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
   * Button size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Dropdown toggle icon.
   */
  toggleIcon?: boolean | string;

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
   * Make the dropdown button expand to fill the entire width of its container.
   */
  block?: boolean;

  /**
   * Set button corners rounded.
   */
  round?: boolean;

  /**
   * Set the same paddings for the button.
   */
  square?: boolean;

  /**
   * Disable the button.
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
