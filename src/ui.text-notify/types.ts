import defaultConfig from "./config.ts";

export interface UNotifyProps {
  /**
   * A position on the x-axis.
   * @values left, center, right
   */
  xPosition?: string;

  /**
   * A position on the y-axis.
   * @values top, bottom
   */
  yPosition?: string;

  /**
   * Use html to render you own content.
   */
  html?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;
}
