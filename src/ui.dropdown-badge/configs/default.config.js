export default /*tw*/ {
  wrapper: "relative inline-block",
  badge: "cursor-pointer",
  icon: "transition-all duration-300",
  iconName: "keyboard_arrow_down",
  iconRotate: "rotate-180",
  listWrapper: {
    base: `
      absolute z-10
      max-h-60 overflow-y-auto overflow-x-hidden md:!w-auto
      rounded-lg border-gray-300 shadow bg-white
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
  list: "w-fit",
  defaultVariants: {
    color: "brand",
    size: "md",
    weight: "medium",
    variant: "primary",
    listYPosition: "bottom",
    listXPosition: "left",
    noIcon: false,
  },
};
