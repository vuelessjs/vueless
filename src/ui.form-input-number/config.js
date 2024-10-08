export default /*tw*/ {
  wrapper: "flex items-center space-x-6",
  number: "flex items-center flex-col",
  removeButton: "{UButton}",
  removeIcon: "{UIcon}",
  addButton: "{UButton}",
  addIcon: "{UIcon}",
  value: {
    base: "font-bold select-none !leading-none",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  label: {
    base: "pt-1 !leading-none text-gray-500",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  defaults: {
    size: "md",
    /* icons */
    removeIcon: "remove",
    addIcon: "add",
  },
};
