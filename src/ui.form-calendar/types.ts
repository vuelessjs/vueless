import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";
import type { DateLocale } from "./utilFormatting.ts";

export type RangeDate =
  | { from: string | null; to: string | null }
  | { from: Date | null; to: Date | null };

export type DateValue = Date | string | RangeDate | null;

export type Locale = typeof defaultConfig.i18n;
export type Config = typeof defaultConfig;

export function isRangeDate(value: Date | string | RangeDate | null): value is RangeDate {
  return typeof value === "object" && value !== null && "to" in value && "from" in value;
}

export interface Props<TModelValue extends DateValue> {
  /**
   * Calendar value (JavaScript Date object or string formatted in given `dateFormat` or object when `range` enabled).
   */
  modelValue: TModelValue;

  /**
   * Calendar view variant.
   */
  view?: "day" | "month" | "year";

  /**
   * Enable date range selection.
   */
  range?: boolean;

  /**
   * Controls the keyboard “Tab” focus order of elements.
   */
  tabindex?: number | string;

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
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}

export interface UCalendarViewProps {
  selectedDate: Date | null;
  selectedDateTo: Date | null;
  activeDate: Date;
  locale: DateLocale;
  dateFormat?: string;
  range: boolean;
  isArrowKeyDirty: boolean;
  maxDate?: Date | string;
  minDate?: Date | string;
  config: Config;
}
