export default /*tw*/ {
  label: "{ULabel} w-full relative",
  labelWrapperTop: "group/top", // applies when an open direction is top
  labelWrapperActive: "group/active",
  wrapper: {
    base: `
      pb-2 pt-2 flex flex-row-reverse justify-between w-full min-h-full box-border relative
      rounded-lg border border-gray-300 bg-white
      hover:border-gray-400 hover:transition hover:focus-within:border-brand-500
      focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-600/[.15] focus-within:outline-none
    `,
    variants: {
      size: {
        sm: "pt-2 pb-1.5",
        md: "pt-2.5 pb-1.5",
        lg: "pt-3 pb-2",
      },
      error: {
        true: `
          border-red-300 hover:border-red-300
          focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100
        `,
      },
      disabled: {
        true: `
          border-gray-100 bg-gray-100 text-gray-900 hover:border-gray-100
          focus-within:border-gray-100 focus-within:ring-0
        `,
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
    ],
  },
  wrapperActive: "z-[inherit]", // applies when select active
  innerWrapper: {
    base: "flex px-4 min-h-full w-full overflow-hidden justify-between",
    variants: {
      multiple: {
        true: "grid grid-cols-1 grid-rows-[minmax(0, 1fr)_min-content]",
      },
    },
  },
  selectedLabels: "flex flex-col col-span-2",
  selectedLabel: {
    base: `
        font-normal leading-none text-gray-900 relative truncate
        inline-flex items-center whitespace-nowrap mb-0 w-full
      `,
    variants: {
      size: {
        sm: "text-sm min-h-4",
        md: "text-base min-h-5",
        lg: "text-lg min-h-6",
      },
      disabled: {
        true: "bg-gray-100",
      },
      multiple: {
        true: "py-2 last:mb-2.5 flex justify-between border-b border-gray-100",
      },
    },
    compoundVariants: [
      { size: "sm", multiple: true, class: "text-sm" },
      { size: "md", multiple: true, class: "text-base" },
      { size: "lg", multiple: true, class: "text-lg" },
    ],
  },
  leftIcon: "pr-3 flex items-center",
  rightIcon: "pl-3 flex items-center",
  beforeCaret: "",
  afterCaret: "mr-3",
  caret: {
    base: "flex items-center mt-0",
    compoundVariants: [
      { labelAlign: "topInside", size: "sm", label: true, class: "-mt-3" },
      { labelAlign: "topInside", size: "md", label: true, class: "-mt-3" },
      { labelAlign: "topInside", size: "lg", label: true, class: "-mt-4" },
    ],
  },
  toggle: "mr-3",
  toggleIcon: "{UIcon} transform transition duration-300 group-[]/active:rotate-180",
  toggleIconName: "expand_more",
  clear: "",
  clearIcon: "{UIcon}",
  clearIconName: "close_small",
  clearMultiple: "flex items-center",
  clearMultipleIcon: "{UIcon}",
  clearMultipleIconName: "close_small",
  clearMultipleTextAll: {
    // TODO: clearMultiple is better
    base: "cursor-pointer flex items-center text-sm font-normal text-gray-400 hover:text-gray-500 transition",
    compoundVariants: [
      { size: "sm", class: "text-sm" },
      { size: "md", class: "text-base" },
      { size: "lg", class: "text-lg" },
    ],
  },
  search: "flex w-fit",
  searchInput: {
    base: `
        p-0 font-normal leading-none text-gray-900 relative w-full border-none bg-transparent
        focus:shadow-none focus:outline-none focus:ring-0
        placeholder:text-gray-400 placeholder:font-normal
      `,
    variants: {
      size: {
        sm: "text-sm placeholder:text-sm",
        md: "text-base placeholder:text-base",
        lg: "text-lg placeholder:text-lg",
      },
    },
  },
  dropdownList: "{UDropdownList} group-[]/top:bottom-full group-[]/top:top-auto top-full",
  i18n: {
    listIsEmpty: "List is empty.",
    noDataToShow: "No data to show.",
    clear: "clear",
    addMore: "Add more...",
  },
  defaultVariants: {
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
    noClear: false,
    addOption: false,
  },
};
