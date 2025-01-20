export default /*tw*/ {
  wrapper: {
    base: "relative inline-flex items-center rounded",
    variants: {
      opened: {
        true: "group",
      },
      ring: {
        true: "focus-within:ring-dynamic focus-within:ring-offset-4 focus-within:ring-{color}-700/15",
      },
    },
  },
  dropdownLink: "{ULink} focus:ring-0 focus:ring-offset-0",
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
