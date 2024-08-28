export default /*tw*/ {
  wrapper: "relative inline-block",
  badge: {
    component: "{UBadge}",
    base: "cursor-pointer",
    variants: {
      size: {
        sm: "pr-1",
        md: "pr-1.5",
        lg: "pr-1.5",
      },
    },
  },
  badgeActive: "group",
  dropdownIcon: "{UIcon} transition duration-300 group-[]:rotate-180",
  list: {
    base: "{UDropdownList} w-fit",
    variants: {
      listYPosition: {
        top: "bottom-6 mb-6",
        bottom: "top-3 mt-6",
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
    weight: "medium",
    variant: "primary",
    labelKey: "label",
    valueKey: "id",
    listYPosition: "bottom",
    listXPosition: "left",
    noIcon: false,
  },
};
