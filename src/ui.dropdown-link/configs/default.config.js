export default /*tw*/ {
  wrapper: "relative inline-block",
  trigger: "flex items-center relative space-x-0.5",
  link: "{ULink}",
  icon: "{UIcon} block transition duration-300",
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
        top: "bottom-6 mb-4",
        bottom: "top-3 mt-4",
      },
      listXPosition: {
        left: "left-0",
        right: "right-0",
      },
    },
  },
  list: "{UDropdownList} w-fit",
  defaults: {
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
