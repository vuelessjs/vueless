export default /*tw*/ {
  wrapper: "relative inline-block",
  dropdownBadge: {
    base: "{UBadge} transition",
    variants: {
      opened: {
        true: "group ring-dynamic ring-offset-dynamic ring-{color}-700/15",
      },
    },
    compoundVariants: [{ opened: true, color: ["grayscale", "white"], class: "ring-gray-700/15" }],
  },
  dropdownIcon: {
    base: "{UIcon} transition duration-300 group-[]:rotate-180",
    defaults: {
      size: {
        sm: "sm",
        md: "md",
        lg: "md",
      },
    },
  },
  dropdownList: {
    base: "{UDropdownList} w-fit",
    variants: {
      yPosition: {
        top: "bottom-6 mb-6",
        bottom: "top-3 mt-6",
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
