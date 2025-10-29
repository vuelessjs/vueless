import defaultConfig from "./config";

import type { Option } from "../ui.form-listbox/types";
import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  modelValue?: string | number | UnknownObject | (string | number | UnknownObject)[];

  label?: string;

  labelDisplayCount?: number;

  options?: Option[];

  labelKey?: string;

  valueKey?: string;

  groupLabelKey?: string;

  groupValueKey?: string;

  optionsLimit?: number;

  visibleOptions?: number;

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

  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  searchable?: boolean;

  search?: string;

  closeOnSelect?: boolean;

  multiple?: boolean;

  disabled?: boolean;

  xPosition?: "left" | "right";

  yPosition?: "top" | "bottom";

  id?: string;

  config?: ComponentConfig<Config>;

  dataTest?: string | null;
}
