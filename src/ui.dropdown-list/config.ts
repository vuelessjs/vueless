export default /*tw*/ {
  wrapper: `
    my-2 p-1 flex w-auto absolute z-50 shadow-sm
    rounded-medium border border-default bg-default
    overflow-auto [-webkit-overflow-scrolling:touch]
    focus:outline-hidden
  `,
  list: "list-none align-top w-full h-full",
  listItem: "group/item block mb-px last:mb-0",
  option: {
    base: `
      rounded-small px-2 py-2.5 flex items-center align-middle whitespace-nowrap cursor-pointer
      font-normal !leading-none
      hover:bg-{color}/5 active:bg-{color}/10
      overflow-hidden text-ellipsis text-default
    `,
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      disabled: {
        true: "pointer-events-none text-muted",
      },
    },
  },
  optionActive: "{>option} bg-{color}/10 hover:bg-{color}/10 text-{color}",
  optionHighlighted: "bg-{color}/5",
  optionContent: "overflow-visible text-ellipsis",
  groupBase: {
    base: "px-2 pb-2.5 font-medium !leading-none text-muted overflow-hidden text-ellipsis",
    variants: {
      size: {
        sm: "text-xsmall",
        md: "text-small",
        lg: "text-medium",
      },
    },
  },
  group: `
    {>groupBase}
    border-t border-muted group-first/item:border-none
    mt-1.5 group-first/item:mt-0
    pt-4 group-first/item:pt-2
  `,
  subGroup: "{>groupBase} pt-2",
  addOptionLabelWrapper: "{>option} -mb-[1.375rem] active:bg-lifted",
  addOptionLabel: "leading-none font-medium",
  addOptionLabelHotkey: "text-lifted",
  addOptionButton: "{UButton} !leading-none sticky left-[calc(100%-2.15rem)] bottom-2 p-1",
  addOptionIcon: "{UIcon} bg-transparent",
  optionDivider: "{UDivider}",
  i18n: {
    noDataToShow: "No data to show.",
    add: "Add",
  },
  defaults: {
    color: "primary",
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
