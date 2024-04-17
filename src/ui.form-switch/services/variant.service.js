import { cva } from "../../service.ui";

export default class VariantService {
  static get(config) {
    const { wrapper, circle, toggleLabel } = config;

    const wrapperVariants = cva({
      base: wrapper.base,
      variants: wrapper.variants,
      compoundVariants: wrapper.compoundVariants,
    });

    const circleVariants = cva({
      base: circle.base,
      variants: circle.variants,
      compoundVariants: circle.compoundVariants,
    });

    const toggleLabelVariants = cva({
      base: toggleLabel.base,
      variants: toggleLabel.variants,
      compoundVariants: toggleLabel.compoundVariants,
    });

    return {
      wrapperVariants,
      circleVariants,
      toggleLabelVariants,
    };
  }
}
