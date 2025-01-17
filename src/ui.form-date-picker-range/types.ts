import defaultConfig from "./config.ts";
import { ShiftAction } from "./constants.ts";

import type { Ref } from "vue";
import type { UnknownObject, ComponentConfig } from "../types.ts";
import type { DatePeriodRange } from "./utilDateRange.ts";

export type Locale = typeof defaultConfig.i18n;
export type Config = typeof defaultConfig;
export type IsDatePeriodOutOfRange = (datePeriod: DatePeriodRange) => boolean;
export type ShiftActions = `${ShiftAction}`;

export interface SortedLocale extends Omit<Locale, "weekdays" | "months"> {
  months: {
    shorthand: string[];
    longhand: string[];
  };
  weekdays: {
    shorthand: string[];
    longhand: string[];
  };
  today: string;
  tomorrow: string;
  yesterday: string;
}

export interface IsPeriod {
  week: boolean;
  month: boolean;
  quarter: boolean;
  year: boolean;
  ownRange: boolean;
  custom: boolean;
}

export interface UDatePickerRangePeriodMenuAttrs {
  periodRowAttrs: Ref<UnknownObject>;
  periodButtonAttrs: Ref<UnknownObject>;
  periodButtonActiveAttrs: Ref<UnknownObject>;
  periodDateAttrs: Ref<UnknownObject>;
  periodDateCurrentAttrs: Ref<UnknownObject>;
  periodDateSelectedAttrs: Ref<UnknownObject>;
  periodDateCurrentSelectedAttrs: Ref<UnknownObject>;
  periodDateListAttrs: Ref<UnknownObject>;
  rangeSwitchButtonAttrs: Ref<UnknownObject>;
  rangeSwitchTitleAttrs: Ref<UnknownObject>;
  rangeSwitchWrapperAttrs: Ref<UnknownObject>;
  customRangeDescriptionAttrs: Ref<UnknownObject>;
}

export interface UDatePickerRangePeriodMenuProps {
  locale: SortedLocale;
  dateFormat: string | undefined;
  isPeriod: IsPeriod;
  maxDate: string | Date | undefined;
  minDate: string | Date | undefined;
  customRangeButton: CustomRangeButton;
  config: Config;
  attrs: UDatePickerRangePeriodMenuAttrs;
}

export interface UDatePickerRangeInputsAttrs {
  rangeInputFirstAttrs: Ref<UnknownObject>;
  rangeInputLastAttrs: Ref<UnknownObject>;
}

export interface UDatePickerRangeInputsProps {
  locale: SortedLocale;
  dateFormat: string | undefined;
  rangeInputName: string;
  maxDate: string | Date | undefined;
  minDate: string | Date | undefined;
  config: Config;
  attrs: UDatePickerRangeInputsAttrs;
}

export interface CustomRangeButton {
  range: {
    from: Date | null;
    to: Date | null;
  };
  label?: string;
  description?: string;
}

export interface UDatePickerRangeProps<TModelValue> {
  /**
   * Datepicker range value (JavaScript Date objects or strings formatted in given `dateFormat`).
   */
  modelValue: TModelValue;

  /**
   * Custom range button.
   */
  customRangeButton?: CustomRangeButton;

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
   * The variant of the date picker.
   */
  variant?: "button" | "input";

  /**
   * Min date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  minDate?: Date | string;

  /**
   * Max date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  maxDate?: Date | string;

  /**
   * Date string format.
   */
  dateFormat?: string;

  /**
   * User-friendly date format (it will be shown in UI).
   */
  userDateFormat?: string;

  /**
   * Datepicker size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Left icon name.
   */
  leftIcon?: string;

  /**
   * Right icon name.
   */
  rightIcon?: string;

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
  dataTest?: string | null;
}
