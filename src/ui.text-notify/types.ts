import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export type NotificationType = "success" | "warning" | "error";

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

export interface UNotifyProps {
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
  config?: Config;
}
