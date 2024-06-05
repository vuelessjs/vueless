import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { subGroupLabel, groupLabel, option } = config.value;

  const cvaSubGroupLabel = cva({
    base: subGroupLabel.base,
    variants: subGroupLabel.variants,
    compoundVariants: subGroupLabel.compoundVariants,
  });
  const cvaGroupLabel = cva({
    base: groupLabel.base,
    variants: groupLabel.variants,
    compoundVariants: groupLabel.compoundVariants,
  });
  const cvaOption = cva({
    base: option.base,
    variants: option.variants,
    compoundVariants: option.compoundVariants,
  });

  const optionClasses = computed(() =>
    cvaOption({
      disabled: props.disabled,
      size: props.size,
    }),
  );
  const subGroupLabelClasses = computed(() =>
    cvaSubGroupLabel({
      size: props.size,
    }),
  );
  const groupLabelClasses = computed(() =>
    cvaGroupLabel({
      size: props.size,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper");
  const listAttrs = getAttrs("list");
  const optionHighlightAttrs = getAttrs("optionHighlight");
  const optionSelectedAttrs = getAttrs("optionSelected");
  const optionItemAttrs = getAttrs("optionItem");
  const addTitleWrapperAttrs = getAttrs("addTitleWrapper");
  const addTitleAttrs = getAttrs("addTitle");
  const addTitleHotkeyAttrs = getAttrs("addTitleHotkey");
  const buttonAddAttrs = getAttrs("buttonAdd", { isComponent: true });
  const addIconAttrs = getAttrs("addIcon", { isComponent: true });
  const optionContentAttrs = getAttrs("optionContent");

  const subGroupLabelAttrsRaw = getAttrs("subGroupLabel", { classes: subGroupLabelClasses });
  const subGroupLabelAttrs = computed(() => ({
    ...subGroupLabelAttrsRaw.value,
    class: cx([optionClasses.value, subGroupLabelAttrsRaw.value.class]),
  }));

  const groupLabelAttrsRaw = getAttrs("groupLabel", { classes: groupLabelClasses });
  const groupLabelAttrs = computed(() => ({
    ...groupLabelAttrsRaw.value,
    class: cx([optionClasses.value, groupLabelAttrsRaw.value.class]),
  }));

  const optionAttrs = (classes = []) => {
    const mergedClasses = cx([optionClasses.value, ...classes]);

    return getAttrs("option", { classes: mergedClasses }).value;
  };

  return {
    hasSlotContent,
    config,
    wrapperAttrs,
    listAttrs,
    optionHighlightAttrs,
    optionSelectedAttrs,
    optionItemAttrs,
    addTitleWrapperAttrs,
    addTitleAttrs,
    addTitleHotkeyAttrs,
    buttonAddAttrs,
    addIconAttrs,
    optionAttrs,
    subGroupLabelAttrs,
    groupLabelAttrs,
    optionClasses,
    optionContentAttrs,
  };
}
