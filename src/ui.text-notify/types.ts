import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";
import { NotificationType } from "./constants.ts";

export type Config = typeof defaultConfig;

export type Notification = {
  id: string;
  type: NotificationType;
  label: string;
  description: string;
};

export interface NotifyEvent extends Event {
  detail: Notification;
}

export interface NotificationsWrapperRef {
  $el: HTMLElement;
}

declare global {
  interface WindowEventMap {
    notifyStart: NotifyEvent;
    notifyEnd: NotifyEvent;
  }
}

export interface Props {
  /**
   * A position on the x-axis.
   */
  xPosition?: "left" | "center" | "right";

  /**
   * A position on the y-axis.
   */
  yPosition?: "top" | "bottom";

  /**
   * Use html to render you own content.
   */
  html?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
