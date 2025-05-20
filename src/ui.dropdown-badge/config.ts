export default /*tw*/ {
  wrapper: {
    base: "relative inline-block",
    variants: {
      disabled: {
        true: "cursor-not-allowed",
      },
    },
  },
  dropdownBadge: {
    base: "{UBadge}",
    variants: {
      opened: {
        true: "group",
      },
      disabled: {
        true: "opacity-(--vl-disabled-opacity) pointer-events-none",
      },
    },
  },
  toggleIcon: {
    base: "{UIcon} transition duration-300 group-[*]:rotate-180 -mr-0.5",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "xs",
      },
    },
  },
  listbox: {
    base: "{UListbox} w-fit",
    variants: {
      yPosition: {
        top: "bottom-full mb-1.5",
        bottom: "top-full mt-1.5",
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
    variant: "solid",
    labelKey: "label",
    valueKey: "id",
    yPosition: "bottom",
    xPosition: "left",
    round: false,
    searchable: false,
    multiple: false,
    labelDisplayCount: 2,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
