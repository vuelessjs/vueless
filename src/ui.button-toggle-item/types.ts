import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
