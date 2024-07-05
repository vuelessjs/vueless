export default /*tw*/ {
  wrapper: "relative inline-block",
  button: "",
  icon: "transition duration-300",
  iconName: "keyboard_arrow_down",
  iconRotate: "rotate-180",
  listWrapper: {
    base: `
      absolute z-10 inline-block
      max-h-60 overflow-y-auto overflow-x-hidden md:!w-auto
      rounded-lg border-gray-300 shadow bg-white
    `,
    variants: {
      listYPosition: {
        top: "bottom-full mb-4",
        bottom: "top-full mt-4",
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
    variant: "primary",
    labelKey: "label",
    valueKey: "id",
    listYPosition: "bottom",
    listXPosition: "left",
    filled: false,
    pill: false,
    square: false,
    noIcon: false,
    disabled: false,
  },
};
