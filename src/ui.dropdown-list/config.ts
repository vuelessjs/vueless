export default /*tw*/ {
  wrapper: `
    my-2 p-1 flex w-auto absolute z-50 shadow
    rounded-dynamic border border-gray-300 bg-white
    overflow-auto [-webkit-overflow-scrolling:touch]
    focus:outline-none
  `,
  list: "list-none align-top w-full h-full",
  listItem: "group/item block mb-px last:mb-0",
  option: {
    base: `
      rounded-dynamic-sm px-2 py-2.5 flex items-center align-middle whitespace-nowrap cursor-pointer
      font-normal !leading-none text-gray-900
      hover:bg-{color}-600/5 active:bg-{color}-600/10
      overflow-hidden text-ellipsis
    `,
    variants: {
      color: {
        grayscale: "hover:bg-gray-100 active:bg-gray-200",
        white: "hover:bg-gray-100 active:bg-gray-200",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "pointer-events-none text-gray-400",
      },
    },
  },
  optionActive: "{>option} font-semibold bg-{color}-600/10 hover:bg-{color}-600/10 text-brand-600",
  optionHighlighted: "bg-{color}-50",
  optionContent: "overflow-visible text-ellipsis",
  groupBase: {
    base: "px-2 pb-2.5 font-medium !leading-none text-gray-400 overflow-hidden text-ellipsis",
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
  },
  group: `
    {>groupBase}
    border-t border-gray-100 group-first/item:border-none
    mt-1.5 group-first/item:mt-0
    pt-4 group-first/item:pt-2
  `,
  subGroup: "{>groupBase} pt-2",
  addOptionLabelWrapper: "{>option} -mb-[1.375rem] active:bg-brand-100",
  addOptionLabel: "leading-none font-medium",
  addOptionLabelHotkey: "text-gray-500",
  addOptionButton: "{UButton} !leading-none sticky left-[calc(100%-2.15rem)] bottom-2 p-1",
  addOptionIcon: "{UIcon} bg-transparent",
  optionDivider: "{UDivider}",
  i18n: {
    noDataToShow: "No data to show.",
    add: "Add",
  },
  defaults: {
    color: "brand",
    size: "md",
    labelKey: "label",
    valueKey: "id",
    visibleOptions: undefined,
    disabled: false,
    addOption: false,
    /* icons */
    addOptionIcon: "add",
  },
};
