export default /*tw*/ {
  wrapper: "relative inline-block",
  dropdownBadge: {
    base: "{UBadge}",
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
        sm: "2xs",
        md: "xs",
        lg: "xs",
      },
    },
  },
  dropdownList: {
    base: "{UDropdownList} w-fit",
    variants: {
      yPosition: {
        top: "bottom-5 mb-5",
        bottom: "top-3 mt-5",
      },
      xPosition: {
        left: "left-0",
        right: "right-0",
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
    round: false,
    noIcon: false,
    /* icons */
    dropdownIcon: "keyboard_arrow_down",
  },
};
