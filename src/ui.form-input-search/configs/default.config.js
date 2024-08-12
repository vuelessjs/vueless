export default /*tw*/ {
  input: {
    component: "{UInput}",
    wrapper: "relative flex items-center justify-between w-full rounded-dynamic bg-gray-900 bg-opacity-5",
    input: "w-full",
    label: "w-full",
    rightSlot: "pr-0",
    leftSlot: "pl-0",
  },
  closeIcon: "{UIcon} flex h-full items-center",
  closeIconName: "close",
  searchIcon: "{UIcon}",
  searchIconName: "search",
  button: "{UButton} rounded-l-none ml-1 !ring-0 outline outline-1 outline-gray-900",
  defaultVariants: {
    size: "md",
    labelAlign: "topInside",
    disabled: false,
    searchButton: false,
  },
};
