import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Locale = typeof defaultConfig.i18n;
export type Config = typeof defaultConfig;

export interface Props<TModelValue> {
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
   * @extendOnly
   */
  openDirectionX?: "auto" | "left" | "right";

  /**
   * Datepicker open direction on y-axis.
   * @extendOnly
   */
  openDirectionY?: "auto" | "top" | "bottom";

  /**
   * Show timepicker.
   */
  timepicker?: boolean;

  /**
   * Date string format.
   */
  dateFormat?: string;

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
  minDate?: Date | string;

  /**
   * Max date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  maxDate?: Date | string;

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
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
