import { cva } from "vueless/service.ui";

export default class VariantService {
  static get(ui) {
    const { title, description } = ui;

    const titleVariants = cva({
      base: title.base,
      variants: title.variants,
    });

    const descriptionVariants = cva({
      base: description.base,
      variants: description.variants,
    });

    return {
      titleVariants,
      descriptionVariants,
    };
  }
}
