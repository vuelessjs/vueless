import defaultConfig from "./config.ts";

import type { DateLocale } from "./utilFormatting.ts";

export type RangeDate =
  | { from: string | null; to: string | null }
  | { from: Date | null; to: Date | null };

export type DateValue = Date | string | RangeDate | null;

export type Locale = typeof defaultConfig.i18n;
export type Config = Partial<typeof defaultConfig>;

export function isRangeDate(value: Date | string | RangeDate | null): value is RangeDate {
  return !(value instanceof Date || typeof value === "string") && value !== null;
}

export interface UCalendarProps {
  /**
   * Calendar value (JavaScript Date object or string formatted in given `dateFormat` or object when `range` enabled).
   */
  modelValue: DateValue;

  /**
   * Calendar view variant.
   */
  view?: "day" | "month" | "year";

  /**
   * Enable date range selection.
   */
  range?: boolean;

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
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}

export interface UCalendarViewProps {
  selectedDate: Date | null;
  selectedDateTo: Date | null;
  activeDate: Date | null;
  activeMonth: Date | null;
  locale: DateLocale;
  dateFormat: string | undefined;
  range: boolean;
  maxDate: Date | string | undefined;
  minDate: Date | string | undefined;
  config: Config;
}
