export default /*tw*/ {
  wrapper: {
    base: "relative inline-flex items-center rounded",
    variants: {
      opened: {
        true: "group",
      },
    },
  },
  dropdownLink: "{ULink}",
  toggleIcon: {
    base: "{UIcon} block transition duration-300 group-[]:rotate-180",
    variants: {
      disabled: {
        true: "text-gray-400 pointer-events-none",
      },
    },
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  dropdownList: {
    base: "{UDropdownList} w-fit",
    variants: {
      yPosition: {
        top: "bottom-3 mb-3",
        bottom: "top-3 mt-3",
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
    yPosition: "bottom",
    xPosition: "left",
    underlined: undefined,
    dashed: true,
    noIcon: false,
    disabled: false,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
