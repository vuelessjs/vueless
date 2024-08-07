export default /*tw*/ {
  wrapper: `
    my-2 flex w-full absolute right-0 z-50
    rounded-dynamic border border-gray-300 bg-white shadow
    overflow-auto [-webkit-overflow-scrolling:touch]
    focus:outline-none
  `,
  list: "m-1 inline-block list-none align-top w-full p-0 bg-white opacity-1 hover:transition",
  subGroupLabel: {
    base: "pointer-events-none bg-transparent !font-medium !leading-none !uppercase !text-gray-500/[85] pt-1",
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
  },
  groupLabel: {
    base: "pointer-events-none bg-transparent !font-medium !leading-none !uppercase !text-gray-500/[85] pt-6 group-first/item:pt-2",
    variants: {
      size: {
        sm: "text-2xs pb-1 mt-4",
        md: "text-xs pb-1",
        lg: "text-sm pb-1 mt-4",
      },
    },
  },
  option: {
    base: `
      rounded px-2 py-2.5 flex items-center align-middle whitespace-nowrap cursor-pointer
      font-normal !leading-none normal-case text-gray-900
      hover:bg-gray-100
      overflow-hidden text-ellipsis
    `,
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "pointer-events-none",
      },
    },
  },
  optionHighlight: "bg-gray-100",
  optionSelected: "font-bold",
  optionItem: "group/item block",
  optionContent: "overflow-hidden text-ellipsis",
  addTitleWrapper: `
    flex items-center justify-between cursor-pointer p-3 hover:bg-gray-100
    active:bg-gray-200 active:font-medium -mb-6
  `,
  addTitle: "text-sm font-medium text-gray-900",
  addTitleHotkey: "text-gray-500",
  buttonAdd: "{UButton} sticky left-[calc(100%-2.3rem)] bottom-2.5 p-1",
  addIconName: "add",
  addIcon: "{UIcon} bg-transparent",
  i18n: {
    noDataToShow: "No data to show.",
    add: "Add",
  },
  defaultVariants: {
    size: "md",
    labelKey: "label",
    valueKey: "id",
    optionHeight: 40,
    visibleOptions: undefined,
    disabled: false,
    addOption: false,
  },
};
