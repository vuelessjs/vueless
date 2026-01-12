export default /*tw*/ {
  dropdownBadge: {
    base: "{UDropdown}",
    defaults: {
      size: {
        sm: "sm",
        md: "md",
        lg: "lg",
      },
    },
  },
  toggleBadge: {
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
  defaults: {
    color: "primary",
    size: "md",
    variant: "solid",
    labelKey: "label",
    valueKey: "value",
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
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
