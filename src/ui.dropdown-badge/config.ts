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
    base: "{UIcon} transition duration-300 group-[*]:rotate-180 -mr-0.5",
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
        top: "bottom-5 mb-3",
        bottom: "top-5 mt-3",
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
    yPosition: "bottom",
    xPosition: "left",
    round: false,
    noIcon: false,
    /* icons */
    dropdownIcon: "keyboard_arrow_down",
  },
};
