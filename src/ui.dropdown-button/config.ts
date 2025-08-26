export default /*tw*/ {
  wrapper: {
    base: "relative inline-block h-max",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
  dropdownButton: "{UButton} justify-between",
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
  defaults: {
    color: "primary",
    size: "md",
    variant: "solid",
    labelKey: "label",
    valueKey: "id",
    yPosition: "bottom",
    xPosition: "left",
    searchable: false,
    round: false,
    block: false,
    square: false,
    disabled: false,
    multiple: false,
    showOptionsLabel: true,
    labelDisplayCount: 2,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
