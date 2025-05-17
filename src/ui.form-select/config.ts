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
    compoundVariants: [
      { multiple: true, multipleVariant: "list", class: "grid grid-cols-1 grid-rows-[minmax(0, 1fr)_min-content]" },
      { multiple: true, multipleVariant: "inline", class: "items-baseline flex-row" },
      { multiple: true, selected: true, multipleVariant: "badges", class: "pb-[7px]" },
      { multiple: true, selected: true, multipleVariant: "badges", size: "sm", class: "pb-1.5" },
      { labelAlign: "topInside", label: true, class: "pt-0" },
    ],
  },
  selectedLabelWrapper: "truncate",
  selectedLabels: {
    base: "max-w-full",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      disabled: {
        true: "text-accented",
      },
    },
    compoundVariants: [
      { multiple: true, multipleVariant: "list", class: "flex flex-col col-span-2" },
      { multiple: true, multipleVariant: "inline", class: "flex gap-1 order-last !leading-none" },
      { multiple: true, multipleVariant: "badges", class: "flex gap-1 flex-wrap" },
    ],
  },
  selectedLabel: {
    base: `
      font-normal !leading-none relative w-full
      inline-flex items-center whitespace-nowrap mb-0
    `,
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      disabled: {
        true: "text-accented",
      },
    },
    compoundVariants: [
      { multiple: true, multipleVariant: "list", class: "py-2 last:mb-2.5 flex justify-between border-b border-muted" },
      { multiple: true, multipleVariant: "badges", class: "w-fit" },
      { size: "sm", multiple: true, class: "text-small" },
      { size: "md", multiple: true, class: "text-medium" },
      { size: "lg", multiple: true, class: "text-large" },
    ],
  },
  badgeLabel: "{UBadge} py-0.5 rounded-small",
  badgeClearIcon: {
    base: "{>clearIcon}",
    defaults: {
      size: {
        sm: "4xs",
        md: "3xs",
        lg: "2xs",
      },
    },
  },
  selectIcon: {
    base: "{UIcon}",
    variants: {
      disabled: {
        true: "cursor-not-allowed",
      },
    },
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  leftIcon: "{UIcon} {>selectIcon}",
  rightIcon: "{UIcon} {>selectIcon}",
  leftSlot: "{>toggle} pl-2.5",
  rightSlot: "{>toggle} pr-2.5",
  beforeToggle: "{>toggle} cursor-auto",
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
  toggleIcon: "{UIcon} {>selectIcon} transition duration-300 group-[*]/active:rotate-180",
  clear: "{>toggle}",
  clearIcon: "{UIcon} {>selectIcon}",
  clearMultiple: "flex items-center",
  clearMultipleIcon: "{UIcon} {>selectIcon}",
  clearMultipleText: {
    base: "cursor-pointer flex items-center text-medium font-normal text-muted hover:text-lifted transition",
    compoundVariants: [
      { size: "sm", class: "text-small" },
      { size: "md", class: "text-medium" },
      { size: "lg", class: "text-large" },
    ],
  },
  search: {
    base: "flex w-full",
    compoundVariants: [
      { multiple: true, multipleVariant: "inline", class: "w-auto" },
      { multiple: true, multipleVariant: "badges", selected: true, class: "w-0" },
      { multiple: false, selected: true, opened: false, class: "w-0" },
      { multiple: false, selected: true, searchable: false, class: "w-0" },
    ],
  },
  searchInput: {
    base: `
        p-0 font-normal !leading-none relative w-full border-none bg-transparent
        focus:shadow-none focus:outline-hidden focus:ring-0 focus:outline-none
        placeholder:text-muted placeholder:font-normal order-first
      `,
    variants: {
      size: {
        sm: "text-small placeholder:text-small",
        md: "text-medium placeholder:text-medium",
        lg: "text-large placeholder:text-large",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
      error: {
        true: "placeholder:text-error/50",
      },
    },
    compoundVariants: [
      { multiple: true, multipleVariant: "inline", selected: true, class: "w-0" },
      { multiple: true, multipleVariant: "badges", selected: true, class: "w-0" },
    ],
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
    dropdownIcon: "keyboard_arrow_down",
    clearIcon: "close_small",
    clearMultipleIcon: "close_small",
    selectedIcon: "check",
  },
};
