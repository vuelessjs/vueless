import { cva } from "../utils/ui.ts";
import type { Config } from "./types.ts";

export default class VariantService {
  static get(config: Config) {
    const { wrapper, circle, toggleLabel } = config;

    const wrapperVariants = cva({
      base: wrapper?.base,
      variants: wrapper?.variants,
      compoundVariants: wrapper?.compoundVariants,
    });

    const circleVariants = cva({
      base: circle?.base,
      variants: circle?.variants,
      compoundVariants: circle?.compoundVariants,
    });

    const toggleLabelVariants = cva({
      base: toggleLabel?.base,
      compoundVariants: toggleLabel?.compoundVariants,
    });

    return {
      wrapperVariants,
      circleVariants,
      toggleLabelVariants,
    };
  }
}
