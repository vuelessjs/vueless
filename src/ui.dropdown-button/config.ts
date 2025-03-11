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
    base: "{UIcon} transition duration-300 group-[*]:rotate-180 -mr-1",
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
    yPosition: "bottom",
    xPosition: "left",
    round: false,
    square: false,
    noIcon: false,
    disabled: false,
    /* icons */
    dropdownIcon: "keyboard_arrow_down",
  },
};
