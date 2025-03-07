export default /*tw*/ {
  selectLabel: "{ULabel}",
  wrapper: {
    base: `
      flex flex-row-reverse justify-between w-full min-h-full box-border relative
      rounded-dynamic border border-gray-300 bg-white
      hover:border-gray-400 hover:transition hover:focus-within:border-primary-600 focus-within:border-primary-600
      focus-within:outline focus-within:outline-dynamic-sm focus-within:outline-primary-600
    `,
    variants: {
      error: {
        true: "!border-red-600 focus-within:outline-red-600",
      },
      disabled: {
        true: `
          focus-within:outline-0 bg-gray-100
          hover:border-gray-300 focus-within:border-gray-300 hover:focus-within:border-gray-300
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
    base: "py-2 px-3 flex min-h-full w-full overflow-hidden justify-between",
    variants: {
      multiple: {
        true: "grid grid-cols-1 grid-rows-[minmax(0, 1fr)_min-content]",
      },
    },
    compoundVariants: [{ labelAlign: "topInside", label: true, class: "pt-0" }],
  },
  selectedLabels: "flex flex-col col-span-2",
  selectedLabel: {
    base: `
        font-normal !leading-none relative truncate
        inline-flex items-center whitespace-nowrap mb-0 w-full
      `,
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "text-gray-700",
      },
      multiple: {
        true: "py-2 last:mb-2.5 flex justify-between border-b border-gray-100",
      },
    },
    compoundVariants: [
      { size: "sm", multiple: true, class: "text-xs" },
      { size: "md", multiple: true, class: "text-sm" },
      { size: "lg", multiple: true, class: "text-base" },
    ],
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
    base: "cursor-pointer flex items-center text-sm font-normal text-gray-400 hover:text-gray-500 transition",
    compoundVariants: [
      { size: "sm", class: "text-xs" },
      { size: "md", class: "text-sm" },
      { size: "lg", class: "text-base" },
    ],
  },
  search: {
    base: "flex w-full",
    compoundVariants: [
      { multiple: false, selected: true, opened: false, class: "w-0" },
      { multiple: false, selected: true, searchable: false, class: "w-0" },
    ],
  },
  searchInput: {
    base: `
        p-0 font-normal !leading-none relative w-full border-none bg-transparent
        focus:shadow-none focus:outline-hidden focus:ring-0
        placeholder:text-gray-400 placeholder:font-normal
      `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs",
        md: "text-sm placeholder:text-sm",
        lg: "text-base placeholder:text-base",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
      error: {
        true: "placeholder:text-red-300",
      },
    },
  },
  dropdownList: "{UDropdownList} group-[*]/top:bottom-full group-[*]/top:top-auto top-full w-full",
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
    optionsLimit: 0,
    visibleOptions: 8,
    multiple: false,
    disabled: false,
    searchable: true,
    clearable: true,
    addOption: false,
    /* icons */
    dropdownIcon: "expand_more",
    clearIcon: "close_small",
    clearMultipleIcon: "close_small",
  },
};
