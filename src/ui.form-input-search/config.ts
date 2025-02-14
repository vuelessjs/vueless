export default /*tw*/ {
  searchInput: "{UInput}",
  searchInputWithButton: {
    base: "{UInput} {>searchInput}",
    rightSlot: "pr-0",
  },
  inputIcon: {
    base: "{UIcon}",
    variants: {
      disabled: {
        true: "text-gray-400 pointer-events-none",
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
  clearIcon: "{>inputIcon}",
  searchIcon: "{>inputIcon}",
  searchButton: {
    base: "{UButton} rounded-l-none ml-1 outline outline-1 outline-gray-900",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  defaults: {
    size: "md",
    labelAlign: "topInside",
    debounce: 300,
    minLength: 0,
    disabled: false,
    readonly: false,
    /* icons */
    clearIcon: "close",
    searchIcon: "search",
  },
};
