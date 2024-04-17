import { cva } from "../service.ui";

export default class VariantService {
  static get(config) {
    const { radio } = config;

    const radioVariants = cva({
      base: radio.base,
      variants: radio.variants,
      compoundVariants: radio.compoundVariants,
    });

    return { radioVariants };
  }
}
