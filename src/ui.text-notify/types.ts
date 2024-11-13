import defaultConfig from "./config.ts";

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
  config?: Partial<typeof defaultConfig>;
}
