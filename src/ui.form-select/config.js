export default /*tw*/ {
  selectLabel: {
    base: "{ULabel}",
    variants: {
      opened: {
        true: "group/active",
      },
      openedTop: {
        true: "group/top",
      },
    },
  },
  wrapper: {
    base: `
      py-2 flex flex-row-reverse justify-between w-full min-h-full box-border relative
      rounded-dynamic border border-gray-300 bg-white
      hover:border-gray-400 hover:transition hover:focus-within:border-brand-500
      focus-within:ring-brand-700/15 focus-within:ring-dynamic focus-within:ring-offset-dynamic
      focus-within:border-brand-500 focus-within:outline-none
    `,
    variants: {
      error: {
        true: `
          bg-red-50 border-red-300 hover:border-red-300
          focus-within:border-red-500 focus-within:ring-red-700/15
        `,
      },
      disabled: {
        true: "bg-gray-100 pointer-events-none",
      },
      opened: {
        true: "z-[inherit]",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
    ],
  },
  innerWrapper: {
    base: "px-3 flex min-h-full w-full overflow-hidden justify-between",
    variants: {
      multiple: {
        true: "grid grid-cols-1 grid-rows-[minmax(0, 1fr)_min-content]",
      },
    },
  },
  selectedLabels: "flex flex-col col-span-2",
  selectedLabel: {
    base: `
        font-normal !leading-none text-gray-900 relative truncate
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
  leftIconWrapper: "pr-1.5",
  rightIconWrapper: "{>caret} pr-3",
  leftIcon: "{UIcon}",
  rightIcon: "{UIcon}",
  beforeCaret: "{>caret}",
  afterCaret: "{>caret} mr-3",
  caret: {
    base: "flex items-center mt-0",
    compoundVariants: [
      { labelAlign: "topInside", size: "sm", label: true, class: "-mt-3" },
      { labelAlign: "topInside", size: "md", label: true, class: "-mt-4" },
      { labelAlign: "topInside", size: "lg", label: true, class: "-mt-[1.125rem]" },
    ],
  },
  toggle: "{>caret} mr-3",
  toggleIcon: "{UIcon} transition duration-300 group-[]/active:rotate-180",
  clear: "{>caret}",
  clearIcon: "{UIcon}",
  clearMultiple: "flex items-center",
  clearMultipleIcon: "{UIcon}",
  clearMultipleText: {
    base: "cursor-pointer flex items-center text-sm font-normal text-gray-400 hover:text-gray-500 transition",
    compoundVariants: [
      { size: "sm", class: "text-xs" },
      { size: "md", class: "text-sm" },
      { size: "lg", class: "text-base" },
    ],
  },
  search: {
    base: "flex w-0",
    variants: {
      selected: {
        false: "w-full",
      },
      opened: {
        true: "w-full",
      },
    },
  },
  searchInput: {
    base: `
        p-0 font-normal !leading-none text-gray-900 relative w-full border-none bg-transparent
        focus:shadow-none focus:outline-none focus:ring-0
        placeholder:text-gray-400 placeholder:font-normal
      `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs",
        md: "text-sm placeholder:text-sm",
        lg: "text-base placeholder:text-base",
      },
      error: {
        true: "placeholder:text-red-300",
      },
    },
  },
  dropdownList: "{UDropdownList} group-[]/top:bottom-full group-[]/top:top-auto top-full w-full",
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
    labelKey: "label",
    valueKey: "id",
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
