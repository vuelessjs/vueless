export default /*tw*/ {
  dropdownButton: {
    base: "{UDropdown}",
    variants: {
      block: {
        true: "!block w-full",
      },
    },
    defaults: {
      size: {
        "2xs": "sm",
        xs: "sm",
        sm: "md",
        md: "md",
        lg: "lg",
        xl: "lg",
      },
    },
  },
  toggleButton: {
    base: "{UButton} justify-between",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
  toggleIcon: {
    base: "{UIcon} transition duration-300 -mr-1",
    defaults: {
      size: {
        "2xs": "2xs",
        xs: "xs",
        sm: "sm",
        md: "sm",
        lg: "sm",
        xl: "sm",
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
    searchable: false,
    round: false,
    block: false,
    square: false,
    disabled: false,
    multiple: false,
    closeOnSelect: true,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
