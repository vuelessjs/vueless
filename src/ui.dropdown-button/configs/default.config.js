export default /*tw*/ {
  wrapper: "relative inline-block",
  button: "{UButton}",
  buttonActive: "group",
  dropdownIcon: "{UIcon} transition duration-300 group-[]:rotate-180",
  listWrapper: {
    base: `
      absolute z-10 inline-block
      max-h-60 overflow-y-auto overflow-x-hidden md:!w-auto
      rounded-dynamic border-gray-300 shadow bg-white
    `,
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
  list: "{UDropdownList} w-fit",
  defaults: {
    dropdownIcon: "keyboard_arrow_down",
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
  },
};
