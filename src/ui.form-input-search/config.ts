export default /*tw*/ {
  searchInput: "{UInput}",
  clearIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  searchIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  searchButton: {
    base: "{UButton} rounded-l-none ml-1 outline outline-1 outline-gray-900",
    defaults: {
      size: {
        sm: "xs",
        md: "md",
        lg: "lg",
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
