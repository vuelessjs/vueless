export default /*tw*/ {
  wrapper: {
    base: "relative inline-block",
    variants: {
      opened: {
        true: "group",
      },
    },
  },
  dropdownLink: "{ULink}",
  dropdownIcon: "{UIcon} block transition duration-300 group-[]:rotate-180",
  dropdownList: {
    base: "{UDropdownList} w-fit",
    variants: {
      yPosition: {
        top: "bottom-6 mb-4",
        bottom: "top-3 mt-4",
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
    labelKey: "label",
    valueKey: "id",
    yPosition: "bottom",
    xPosition: "left",
    underlined: undefined,
    dashed: true,
    noRing: true,
    noIcon: false,
    disabled: false,
    /* icons */
    dropdownIcon: "keyboard_arrow_down",
  },
};
