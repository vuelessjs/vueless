export default /*tw*/ {
  wrapper: {
    base: `
      inline-flex gap-0.5 relative items-center justify-between rounded
      focus-visible:outline focus-visible:outline-medium focus-visible:outline-offset-4 focus-visible:outline-{color}
    `,
    variants: {
      opened: {
        true: "group",
      },
    },
  },
  dropdownLink: "{ULink} focus-visible:outline-hidden",
  toggleIcon: {
    base: "{UIcon} block transition duration-300 group-[*]:rotate-180",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  listbox: {
    base: "{UListbox} w-fit",
    variants: {
      yPosition: {
        top: "bottom-3.5 mb-2.5",
        bottom: "top-3.5 mt-2.5",
      },
      xPosition: {
        left: "left-0",
        right: "right-0",
      },
    },
  },
  defaults: {
    color: "primary",
    size: "md",
    labelKey: "label",
    valueKey: "id",
    yPosition: "bottom",
    xPosition: "left",
    underlined: undefined,
    dashed: true,
    disabled: false,
    multiple: false,
    labelDisplayCount: 2,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
