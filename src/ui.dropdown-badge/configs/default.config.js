export default /*tw*/ {
  wrapper: "relative inline-block",
  badge: "{UBadge} cursor-pointer",
  icon: "{UIcon} transition duration-300",
  iconName: "keyboard_arrow_down",
  iconRotate: "rotate-180",
  listWrapper: {
    base: `
      absolute z-10
      max-h-60 overflow-y-auto overflow-x-hidden md:!w-auto
      rounded-dynamic border-gray-300 shadow bg-white
    `,
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
  list: "{UDropdownList} w-fit",
  defaultVariants: {
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
