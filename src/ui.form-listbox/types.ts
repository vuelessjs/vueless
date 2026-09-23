import defaultConfig from "./config";
import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;
export type OnClickOption = (option: Omit<Option, "onClick">) => void;

export interface BaseOption {
  isSubGroup?: boolean;
  groupLabel?: string;
  level?: number;
  isHidden?: boolean;
  onClick?: OnClickOption;
}

export interface Option extends BaseOption {
  [key: string]: string | number | boolean | UnknownObject | Option[] | OnClickOption | undefined;
}

/* Any object shape is a valid option, only reserved option keys are type checked. */
export type ListboxOption = BaseOption & (object | UnknownObject);

export type SelectedValue = string | number | UnknownObject;

/* Drops `Option`'s `[key: string]` index signature so slot options only expose known keys. */
type KnownKeys<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

/**
 * Option shape exposed to slots: the caller's option plus the reserved option keys.
 *
 * `TOption`'s own keys are optional. With `groupValueKey` set, `filterGroups` flattens the
 * nested `groupValueKey` array into the same list the slots iterate, and those group members
 * are typed `Option`, not `TOption` — so a flattened child need not carry the parent's members.
 * `BaseOption`'s keys are optional already, so nothing is promised that can be absent.
 */
export type SlotOption<TOption extends ListboxOption = ListboxOption> = Partial<
  KnownKeys<TOption>
> &
  BaseOption;

export interface UListboxSlots<TOption extends ListboxOption = ListboxOption> {
  "before-option"?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  option?: (props: { option: SlotOption<TOption>; index: number }) => unknown;
  "after-option"?: (props: {
    option: SlotOption<TOption>;
    selected: boolean;
    index: number;
  }) => unknown;
  empty?: () => unknown;
}

export interface Props<TOption extends ListboxOption = ListboxOption> {
  /**
   * Selected item.
   */
  modelValue?: string | number | UnknownObject | (string | number | UnknownObject)[];

  /**
   * Search input model value.
   */
  search?: string;

  /**
   * List options.
   */
  options?: TOption[];

  /**
   * Shows input to search value in a list.
   */
  searchable?: boolean;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

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
   * Show add option button.
   */
  addOption?: boolean;

  /**
   * List size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Option highlight color.
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
   * Number of options to show without a scroll.
   */
  visibleOptions?: number;

  /**
   * Time in milliseconds before value emit.
   */
  debounce?: number | string;

  /**
   * Disable the list.
   */
  disabled?: boolean;

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
