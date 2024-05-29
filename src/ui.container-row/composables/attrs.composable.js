import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { cva } from "../../service.ui";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      gap: props.gap,
      align: props.align,
      noMobile: props.noMobile,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });

  return {
    wrapperAttrs,
  };
}
