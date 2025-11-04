import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface USpeedDialItem {
  icon: string;
  label?: string;
  color?: string;
  disabled?: boolean;
  command?: () => void;
}

export interface Props {
  /**
   * Open/close state control.
   */
  modelValue?: boolean;

  /**
   * List of action items.
   */
  items?: USpeedDialItem[];

  /**
   * Direction of items expansion.
   */
  direction?: "up" | "down" | "left" | "right" | "circle";

  /**
   * Trigger mode for opening the speed dial.
   */
  trigger?: "click" | "hover";

  /**
   * Transition duration in milliseconds.
   */
  transitionDuration?: number;

  /**
   * Main button icon.
   */
  icon?: string;

  /**
   * Speed dial size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Main button color.
   */
  color?: string;

  /**
   * Show overlay mask when open.
   */
  mask?: boolean;

  /**
   * Disable the speed dial.
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

