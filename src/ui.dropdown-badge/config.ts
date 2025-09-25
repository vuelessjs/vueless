export default /*tw*/ {
  wrapper: "relative inline-block h-max",
  dropdownBadge: {
    base: "{UBadge}",
    variants: {
      disabled: {
        true: "opacity-(--vl-disabled-opacity) pointer-events-none",
      },
    },
  },
  toggleIcon: {
    base: "{UIcon} transition duration-300 -mr-0.5",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "xs",
      },
    },
    compoundVariants: [{ opened: true, class: "rotate-180" }],
  },
  listbox: {
    base: "{UListbox} w-fit",
    variants: {
      yPosition: {
        top: "bottom-full mb-1.5",
        bottom: "top-full mt-1.5",
      },
      xPosition: {
        left: "left-0",
        right: "right-0",
      },
    },
  },
  defaults: {
    color: "primary",
    size: "md",
    variant: "solid",
    labelKey: "label",
    valueKey: "id",
    groupLabelKey: "label",
    yPosition: "bottom",
    xPosition: "left",
    optionsLimit: 0,
    visibleOptions: 8,
    labelDisplayCount: 2,
    round: false,
    searchable: false,
    multiple: false,
    closeOnSelect: true,
    clearSearchOnSelect: true,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
