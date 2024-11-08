import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UDatePickerProps<TModelValue> {
  /**
   * Calendar value (JavaScript Date object or string formatted in given `dateFormat` or object when `range` enabled).
   */
  modelValue: TModelValue;

  /**
   * Datepicker label.
   */
  label?: string;

  /**
   * Datepicker label placement.
   */
  labelAlign?: "top" | "topInside" | "topWithDesc" | "left" | "right";

  /**
   * Datepicker placeholder.
   */
  placeholder?: string;

  /**
   * Datepicker description.
   */
  description?: string;

  /**
   * Datepicker error message.
   */
  error?: string;

  /**
   * Datepicker size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Datepicker open direction on x-axis.
   */
  openDirectionX?: "auto" | "left" | "right";

  /**
   * Datepicker open direction on y-axis.
   */
  openDirectionY?: "auto" | "top" | "bottom";

  /**
   * Show timepicker.
   */
  timepicker?: boolean;

  /**
   * Date string format.
   */
  dateFormat?: string | undefined;

  /**
   * Same as date format, but used when timepicker is enabled.
   */
  dateTimeFormat?: string;

  /**
   * User-friendly date format (it will be shown in UI).
   */
  userDateFormat?: string;

  /**
   * Same as user format, but used when timepicker is enabled.
   */
  userDateTimeFormat?: string;

  /**
   * Min date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  minDate?: string | Date | undefined;

  /**
   * Max date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  maxDate?: string | Date | undefined;

  /**
   * Left icon name.
   */
  leftIcon?: string;

  /**
   * Right icon name.
   */
  rightIcon?: string;

  /**
   * Make datepicker disabled.
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
