export default /*tw*/ {
  wrapper: "relative inline-block",
  dropdownButton: "{UButton}",
  dropdownButtonActive: {
    base: "group ring-dynamic ring-offset-dynamic ring-{color}-700/15",
    variants: {
      color: {
        grayscale: "ring-gray-700/15",
        white: "ring-gray-700/15",
      },
    },
  },
  dropdownIcon: "{UIcon} transition duration-300 group-[]:rotate-180",
  dropdownList: {
    base: "{UDropdownList} w-fit",
    variants: {
      yPosition: {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
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
    valueKey: "id",
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
  safelist: (colors) => [{ pattern: `ring-(${colors})-700` }],
};
