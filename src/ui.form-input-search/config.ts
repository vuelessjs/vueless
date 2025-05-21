export default /*tw*/ {
  searchInput: "{UInput}",
  searchInputWithButton: {
    base: "{UInput} {>searchInput}",
    rightSlot: "pr-0",
  },
  inputIcon: {
    base: "{UIcon}",
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
    base: "{UButton} rounded-l-none ml-2",
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
    clearIcon: "close_small",
    searchIcon: "search",
  },
};
