export default /*tw*/ {
  selectLabel: "{ULabel}",
  wrapper: {
    base: `
      flex flex-row-reverse justify-between w-full min-h-full box-border relative
      rounded-medium border border-default bg-default outline-transparent
      hover:border-lifted hover:transition hover:focus-within:border-primary focus-within:border-primary
      focus-within:outline focus-within:outline-small focus-within:outline-primary focus-within:transition
    `,
    variants: {
      error: {
        true: "!border-error focus-within:outline-error",
      },
      disabled: {
        true: `
          focus-within:outline-0 bg-lifted
          hover:border-default focus-within:border-default hover:focus-within:border-default
        `,
      },
      opened: {
        true: "z-[inherit] group/active",
      },
      openedTop: {
        true: "group/top",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
    ],
  },
  innerWrapper: {
    base: "py-2 px-3 flex min-h-full w-full overflow-hidden justify-start",
    compoundVariants: [{ labelAlign: "topInside", label: true, class: "pt-0" }],
  },
  selectedLabels: {
    base: "w-full !leading-none items-center whitespace-nowrap",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      disabled: {
        true: "opacity-(--vl-disabled-opacity)",
      },
    },
    compoundVariants: [
      { multiple: true, multipleVariant: "list", class: "flex flex-col col-span-2" },
      { multiple: true, multipleVariant: "inline", class: "flex gap-1 order-last" },
      { multiple: true, multipleVariant: "badge", class: "flex gap-1 flex-wrap" },
    ],
  },
  selectedLabel: {
    base: "truncate",
    compoundVariants: [
      {
        multiple: true,
        multipleVariant: "list",
        class: "py-2 flex justify-between items-center border-b border-muted w-full",
      },
    ],
  },
  badgeLabel: "{UBadge} py-0.5 px-1.5 gap-0.5 rounded-small",
  badgeClearIcon: {
    base: "{>clearIcon} -mr-1",
    defaults: {
      size: {
        sm: "4xs",
        md: "3xs",
        lg: "2xs",
      },
    },
  },
  listClearIcon: "{UIcon} {>selectIcon}",
  listFooter: "flex items-center justify-between w-full mt-2.5",
  listAddMore: "{>placeholder}",
  listClearAll: "{ULink}",
  selectIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  afterToggle: {
    base: "{>toggle} mr-2.5 items-start cursor-auto",
    variants: {
      size: {
        sm: "pt-0.5",
        md: "pt-1",
        lg: "pt-1.5",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", size: "sm", class: "pt-2" },
      { labelAlign: "topInside", size: "md", class: "pt-3" },
      { labelAlign: "topInside", size: "lg", class: "pt-4" },
    ],
  },
  toggle: {
    base: "flex items-center",
    compoundVariants: [
      { labelAlign: "topInside", size: "sm", label: true, class: "-mt-5" },
      { labelAlign: "topInside", size: "md", label: true, class: "-mt-6" },
      { labelAlign: "topInside", size: "lg", label: true, class: "-mt-7" },
    ],
  },
  toggleWrapper: "{>toggle} mr-3",
  toggleIcon: "{UIcon} {>selectIcon} -mr-1 transition duration-300 group-[*]/active:rotate-180",
  leftIcon: "{UIcon} {>selectIcon}",
  rightIcon: "{UIcon} {>selectIcon}",
  leftSlot: "{>toggle} pl-2.5",
  rightSlot: "{>toggle} pr-2.5",
  beforeToggle: "{>toggle} cursor-auto",
  clear: "{>toggle}",
  clearIcon: "{UIcon} {>selectIcon}",
  placeholder: {
    base: "flex items-center text-muted !leading-none",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  listbox: "{UListbox} group-[*]/top:bottom-full group-[*]/top:top-auto top-full w-full",
  i18n: {
    listIsEmpty: "List is empty.",
    noDataToShow: "No data to show.",
    clear: "clear",
    addMore: "Add more...",
  },
  defaults: {
    size: "md",
    labelAlign: "topInside",
    openDirection: "auto",
    valueKey: "id",
    labelKey: "label",
    groupLabelKey: "label",
    multipleVariant: "inline",
    optionsLimit: 0,
    visibleOptions: 8,
    labelDisplayCount: 2,
    multiple: false,
    disabled: false,
    searchable: true,
    clearable: true,
    addOption: false,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
    clearIcon: "close_small",
    listClearIcon: "close_small",
    badgeClearIcon: "close",
    selectedIcon: "check",
  },
};
