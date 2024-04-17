import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { tableCell } = config.value;

  const cvaTableCell = cva({
    base: tableCell.base,
    variants: tableCell.variants,
    compoundVariants: tableCell.compoundVariants,
  });

  const tableCellClasses = computed(() => cvaTableCell({ compact: props.compact }));

  const tableCellAttrs = getAttrs("tableCell", { classes: tableCellClasses });

  return {
    tableCellAttrs,
  };
}
