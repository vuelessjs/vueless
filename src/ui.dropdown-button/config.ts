export default /*tw*/ {
  wrapper: "relative inline-block",
  dropdownButton: {
    base: "{UButton}",
    variants: {
      opened: {
        true: "group",
      },
    },
  },
  dropdownIcon: {
    base: "{UIcon} transition duration-300 group-[]:rotate-180",
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
  },
  dropdownList: {
    base: "{UDropdownList} w-fit",
    variants: {
      yPosition: {
        top: "bottom-full mb-1",
        bottom: "top-full mt-1",
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
    color: "brand",
    size: "md",
    variant: "primary",
    labelKey: "label",
    yPosition: "bottom",
    xPosition: "left",
    filled: false,
    round: false,
    square: false,
    noIcon: false,
    disabled: false,
    /* icons */
    dropdownIcon: "keyboard_arrow_down",
  },
};
