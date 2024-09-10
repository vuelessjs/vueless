export default /*tw*/ {
  wrapper: "relative inline-block",
  dropdownBadge: "{UBadge}",
  dropdownBadgeActive: "group",
  dropdownIcon: "{UIcon} transition duration-300 group-[]:rotate-180",
  dropdownList: {
    component: "{UDropdownList}",
    base: "w-fit",
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
    valueKey: "id",
    yPosition: "bottom",
    xPosition: "left",
    round: false,
    noIcon: false,
    /* icons */
    dropdownIcon: "keyboard_arrow_down",
  },
};
