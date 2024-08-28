export default /*tw*/ {
  wrapper: "relative inline-block",
  trigger: "flex items-center relative space-x-0.5",
  link: "{ULink}",
  linkActive: "group",
  dropdownIcon: "{UIcon} block transition duration-300 group-[]:rotate-180",
  list: {
    base: "{UDropdownList} w-fit",
    variants: {
      listYPosition: {
        top: "bottom-6 mb-4",
        bottom: "top-3 mt-4",
      },
      listXPosition: {
        left: "left-0",
        right: "right-0",
      },
    },
  },
  defaults: {
    dropdownIcon: "keyboard_arrow_down",
    color: "brand",
    size: "md",
    labelKey: "label",
    valueKey: "id",
    listYPosition: "bottom",
    listXPosition: "left",
    underlined: undefined,
    dashed: true,
    noRing: true,
    noIcon: false,
    disabled: false,
  },
};
