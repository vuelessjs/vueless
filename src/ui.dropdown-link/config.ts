export default /*tw*/ {
  wrapper: `
    inline-flex gap-0.5 relative items-center justify-between rounded h-max
    focus-visible:outline focus-visible:outline-medium focus-visible:outline-offset-4 focus-visible:outline-{color}
  `,
  dropdownLink: "{ULink} focus-visible:outline-hidden",
  toggleIcon: {
    base: "{UIcon} block transition duration-300",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
    compoundVariants: [{ opened: true, class: "rotate-180" }],
  },
  listbox: {
    base: "{UListbox} w-fit",
    variants: {
      yPosition: {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
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
    groupLabelKey: "label",
    yPosition: "bottom",
    xPosition: "left",
    optionsLimit: 0,
    visibleOptions: 8,
    labelDisplayCount: 2,
    underlined: undefined,
    dashed: false,
    disabled: false,
    searchable: false,
    multiple: false,
    closeOnSelect: true,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
