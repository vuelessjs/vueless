import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props, { isTop, isOpen, selectedLabel: selectedLabelValue }) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper, innerWrapper, searchInput, selectedLabel, caret, caretClearText } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaInnerWrapper = cva({
    base: innerWrapper.base,
    variants: innerWrapper.variants,
    compoundVariants: innerWrapper.compoundVariants,
  });

  const cvaSearchInput = cva({
    base: searchInput.base,
    variants: searchInput.variants,
    compoundVariants: searchInput.compoundVariants,
  });

  const cvaSelectedLabel = cva({
    base: selectedLabel.base,
    variants: selectedLabel.variants,
    compoundVariants: selectedLabel.compoundVariants,
  });

  const cvaCaret = cva({
    base: caret.base,
    variants: caret.variants,
    compoundVariants: caret.compoundVariants,
  });

  const cvaCaretClearText = cva({
    base: caretClearText.base,
    variants: caretClearText.variants,
    compoundVariants: caretClearText.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      size: props.size,
      error: Boolean(props.error),
      disabled: props.disabled,
      labelAlign: props.labelAlign,
      label: Boolean(props.label),
    }),
  );

  const innerWrapperClasses = computed(() =>
    cvaInnerWrapper({
      multiple: props.multiple,
      size: props.size,
    }),
  );

  const searchInputClasses = computed(() =>
    cvaSearchInput({
      size: props.size,
    }),
  );

  const selectedLabelClasses = computed(() =>
    cvaSelectedLabel({
      size: props.size,
      disabled: props.disabled,
      multiple: props.multiple,
    }),
  );

  const caretClasses = computed(() =>
    cvaCaret({
      size: props.size,
      labelAlign: props.labelAlign,
      label: Boolean(props.label),
    }),
  );

  const caretClearTextClasses = computed(() =>
    cvaCaretClearText({
      size: props.size,
    }),
  );

  const innerWrapperAttrs = getAttrs("innerWrapper", { classes: innerWrapperClasses });
  const wrapperTopAttrs = getAttrs("wrapperTop");
  const leftSlotAttrs = getAttrs("leftSlot");
  const searchInputAttrs = getAttrs("searchInput", { classes: searchInputClasses });
  const selectedLabelsAttrs = getAttrs("selectedLabels");
  const selectedLabelAttrs = getAttrs("selectedLabel", { classes: selectedLabelClasses });
  const dropdownListAttrs = getAttrs("dropdownList", { isComponent: true });
  const caretClearTextAttrs = getAttrs("caretClearText", { classes: caretClearTextClasses });
  const caretRemoveItemAttrs = getAttrs("caretRemoveItem");
  const toggleIconAttrs = getAttrs("toggleIcon", { isComponent: true });
  const clearIconAttrs = getAttrs("clearIcon", { isComponent: true });
  const removeItemIconAttrs = getAttrs("removeItemIcon", { isComponent: true });

  const wrapperAttrsRaw = getAttrs("wrapper", { classes: wrapperClasses });

  const wrapperAttrs = computed(() => ({
    ...wrapperAttrsRaw.value,
    class: cx([wrapperAttrsRaw.value.class, isOpen.value && config.value.wrapperActive]),
  }));

  const labelAttrsRaw = getAttrs("label", { isComponent: true });

  const labelAttrs = computed(() => ({
    ...labelAttrsRaw.value,
    class: cx([
      labelAttrsRaw.value.class,
      isOpen.value && config.value.labelWrapperActive,
      isTop.value && config.value.labelWrapperTop,
    ]),
  }));

  const caretToggleAttrsRaw = getAttrs("caretToggle");

  const caretToggleAttrs = computed(() => ({
    ...caretToggleAttrsRaw.value,
    class: cx([caretToggleAttrsRaw.value.class, caretClasses.value]),
  }));

  const caretClearAttrsRaw = getAttrs("caretClear");

  const caretClearAttrs = computed(() => ({
    ...caretClearAttrsRaw.value,
    class: cx([caretClearAttrsRaw.value.class, caretClasses.value]),
  }));

  const beforeCaretSlotAttrsRaw = getAttrs("beforeCaretSlot");

  const beforeCaretSlotAttrs = computed(() => ({
    ...beforeCaretSlotAttrsRaw.value,
    class: cx([beforeCaretSlotAttrsRaw.value.class, caretClasses.value]),
  }));

  const afterCaretSlotAttrsRaw = getAttrs("afterCaretSlot");

  const afterCaretSlotAttrs = computed(() => ({
    ...afterCaretSlotAttrsRaw.value,
    class: cx([afterCaretSlotAttrsRaw.value.class, caretClasses.value]),
  }));

  const searchAttrsRaw = getAttrs("search");

  const searchAttrs = computed(() => ({
    ...searchAttrsRaw.value,
    class: cx([
      searchAttrsRaw.value.class,
      Boolean(selectedLabelValue.value) && !isOpen.value && "w-0", // this is not configurable
    ]),
  }));

  return {
    config,
    hasSlotContent,
    labelAttrs,
    wrapperAttrs,
    innerWrapperAttrs,
    wrapperTopAttrs,
    leftSlotAttrs,
    beforeCaretSlotAttrs,
    afterCaretSlotAttrs,
    caretToggleAttrs,
    caretClearAttrs,
    caretClearTextAttrs,
    caretRemoveItemAttrs,
    searchAttrs,
    searchInputAttrs,
    selectedLabelsAttrs,
    selectedLabelAttrs,
    dropdownListAttrs,
    toggleIconAttrs,
    clearIconAttrs,
    removeItemIconAttrs,
  };
}
