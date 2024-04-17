export default /*tw*/ {
  wrapper: "flex items-center space-x-6",
  number: "flex items-center flex-col",
  removeButton: "",
  removeIcon: "",
  removeIconName: "remove",
  addButton: "",
  addIcon: "",
  addIconName: "add",
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
  text: {
    base: "pt-1 !leading-none text-gray-500",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
};
