import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, hasSlotContent, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { money, sum, penny } = config.value;

  const cvaMoney = cva({
    base: money.base,
    variants: money.variants,
    compoundVariants: money.compoundVariants,
  });

  const cvaSum = cva({
    base: sum.base,
    variants: sum.variants,
    compoundVariants: sum.compoundVariants,
  });

  const cvaPenny = cva({
    base: penny.base,
    variants: penny.variants,
    compoundVariants: penny.compoundVariants,
  });

  const moneyClasses = computed(() =>
    setColor(
      cvaMoney({
        align: props.align,
        color: props.color,
        weight: props.weight,
      }),
      props.color,
    ),
  );

  const sumClasses = computed(() =>
    cvaSum({
      planned: props.planned,
      size: props.size,
    }),
  );

  const pennyClasses = computed(() => cvaPenny({ size: props.size }));

  const moneyAttrs = getAttrs("money", { classes: moneyClasses });
  const slotLeftAttrs = getAttrs("slotLeft");
  const slotRightAttrs = getAttrs("slotRight");
  const sumAttrs = getAttrs("sum", { classes: sumClasses });
  const pennyAttrs = getAttrs("penny", { classes: pennyClasses });
  const symbolAttrs = getAttrs("symbol");

  return {
    sumAttrs,
    pennyAttrs,
    moneyAttrs,
    slotLeftAttrs,
    symbolAttrs,
    slotRightAttrs,
    hasSlotContent,
  };
}
