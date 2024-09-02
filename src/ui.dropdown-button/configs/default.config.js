export default /*tw*/ {
  wrapper: "relative inline-block",
  dropdownButton: "{UButton}",
  dropdownButtonActive: "group",
  dropdownIcon: "{UIcon} transition duration-300 group-[]:rotate-180",
  dropdownList: {
    base: "{UDropdownList} w-fit",
    variants: {
      listYPosition: {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
      },
      listXPosition: {
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
    listYPosition: "bottom",
    listXPosition: "left",
    filled: false,
    round: false,
    square: false,
    noIcon: false,
    disabled: false,
    /* icons */
    dropdownIcon: "keyboard_arrow_down",
  },
};
