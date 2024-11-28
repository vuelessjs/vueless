import defaultConfig from "./config.ts";

import type { Ref } from "vue";

type UpdateSelectedValue = (value: string | number, checked: boolean) => void;

export type Config = Partial<typeof defaultConfig>;

export interface ToggleInjectValues {
  type?: string;
  size?: string;
  round?: boolean;
  block?: boolean;
  square?: boolean;
  variant?: string;
  disabled?: boolean;
}

export interface ToggleContextType {
  selectedValue: Ref<string>;
  updateSelectedValue: UpdateSelectedValue;
}

export interface UToggleItemProps {
  /**
   * Selected value.
   */
  modelValue?: string | number | Array<string | number>;

  /**
   * Value for checkbox state.
   */
  value?: string | number;

  /**
   * Toggle item label.
   */
  label?: string;

  /**
   * Make toggle item disabled.
   */
  disabled?: boolean;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
