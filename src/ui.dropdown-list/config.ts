export default /*tw*/ {
  wrapper: `
    my-2 flex w-full absolute right-0 z-50
    rounded-dynamic border border-gray-300 bg-white shadow
    overflow-auto [-webkit-overflow-scrolling:touch]
    focus:outline-none
  `,
  list: "m-1 inline-block list-none align-top w-full p-0 bg-white opacity-1 hover:transition",
  listItem: "group/item block",
  option: {
    base: `
      rounded px-2 py-2.5 flex items-center align-middle whitespace-nowrap cursor-pointer
      font-normal !leading-none normal-case text-gray-900
      hover:bg-brand-50
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
  optionContent: "overflow-visible text-ellipsis",
  optionSelected: "font-bold",
  optionHighlighted: "bg-brand-50",
  group: {
    base: `pointer-events-none bg-transparent font-medium !leading-none uppercase text-gray-400 pt-4 pb-1
      group-first/item:pt-2`,
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
  },
  subGroup: {
    base: "pointer-events-none bg-transparent font-medium !leading-none uppercase text-gray-400 pt-2",
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
  },
  addOptionLabelWrapper: "-mb-[1.375rem] active:bg-brand-100",
  addOptionLabel: "text-sm leading-none font-medium text-gray-900",
  addOptionLabelHotkey: "text-gray-500",
  addOptionButton: "{UButton} !leading-none sticky left-[calc(100%-2.15rem)] bottom-2 p-1",
  addOptionIcon: "{UIcon} bg-transparent",
  i18n: {
    noDataToShow: "No data to show.",
    add: "Add",
  },
  defaults: {
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
