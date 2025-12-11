import defaultConfig from "./config";
import type { ComponentConfig } from "../types";
import { NotificationType } from "./constants";

export type Config = typeof defaultConfig;

export type Notification = {
  id: string;
  type: NotificationType;
  label: string;
  description: string;
  notifyId?: string;
};

export interface NotifyEvent extends Event {
  detail: Notification;
}

export interface NotifyClearAllEvent extends Event {
  detail: {
    notifyId?: string;
  };
}

export interface NotificationsWrapperRef {
  $el: HTMLElement;
}

declare global {
  interface WindowEventMap {
    notifyStart: NotifyEvent;
    notifyEnd: NotifyEvent;
    notifyClearAll: NotifyClearAllEvent;
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
   * Notification instance id.
   */
  notifyId?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
