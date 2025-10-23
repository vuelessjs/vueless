export default /*tw*/ {
  wrapper: {
    base: `
      my-2 p-1 flex flex-col gap-1 w-auto absolute z-50 shadow-sm
      rounded-medium border border-solid border-default bg-default
      overflow-auto [-webkit-overflow-scrolling:touch]
      focus:outline-hidden
    `,
    variants: {
      searchable: {
        true: "pt-0",
      },
    },
  },
  listboxInput: {
    base: "{UInputSearch} sticky top-0 pt-1 bg-default z-10",
    searchInput: {
      wrapper: "px-2 rounded-small focus-within:outline-0 hover:focus-within:border-lifted focus-within:border-lifted",
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
  list: "list-none align-top w-full h-full",
  listItem: "group/item block mb-px last:mb-0",
  option: {
    base: `
      rounded-small px-2 py-2 flex gap-2 items-center align-middle whitespace-nowrap cursor-pointer
      font-normal !leading-snug
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
        true: "pointer-events-none opacity-(--vl-disabled-opacity)",
      },
    },
  },
  optionActive: "{>option} bg-{color}/10 hover:bg-{color}/10 text-{color}",
  optionHighlighted: "bg-{color}/5",
  optionDisabled: "{>option} pointer-events-none opacity-(--vl-disabled-opacity)",
  optionDisabledActive: "{>optionActive} {>optionDisabled}",
  optionContent: "w-full truncate",
  groupBase: {
    base: "px-2 pb-2.5 font-medium !leading-none text-muted truncate",
    variants: {
      size: {
        sm: "text-tiny",
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
  selectedIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  optionDivider: "{UDivider} py-2",
  i18n: {
    noDataToShow: "No data to show.",
    add: "Add",
    search: "Search...",
  },
  defaults: {
    color: "primary",
    size: "md",
    labelKey: "label",
    valueKey: "value",
    visibleOptions: undefined,
    debounce: 0,
    optionsLimit: 0,
    searchable: false,
    disabled: false,
    addOption: false,
    multiple: false,
    /* icons */
    addOptionIcon: "add",
    selectedIcon: "check",
  },
};
