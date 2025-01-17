export default /*tw*/ {
  wrapper: {
    base: "relative inline-flex",
    variants: {
      opened: {
        true: "group",
      },
    },
  },
  dropdownLink: "{ULink}",
  toggleIcon: {
    base: "{UIcon} block transition duration-300 group-[]:rotate-180",
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
        top: "bottom-6 mb-4",
        bottom: "top-3 mt-4",
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
    ring: false,
    noIcon: false,
    disabled: false,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
