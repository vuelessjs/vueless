export default /*tw*/ {
  dropdownLink: {
    base: `
      {UDropdown}
      inline-flex gap-0.5 items-center justify-between rounded-small h-max
      focus-visible:outline-offset-4
    `,
    defaults: {
      size: {
        sm: "sm",
        md: "md",
        lg: "lg",
      },
    },
  },
  toggleLink: "{ULink} focus-visible:outline-hidden",
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
  defaults: {
    color: "primary",
    size: "md",
    labelKey: "label",
    valueKey: "value",
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
