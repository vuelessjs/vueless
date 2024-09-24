export default /*tw*/ {
  wrapper: "group cursor-pointer",
  body: "",
  title: {
    base: "flex items-center justify-between font-medium text-gray-900",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  description: {
    base: "text-gray-600 h-0 opacity-0 transition-all",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  isOpened: "pt-2 h-full opacity-100",
  toggleIcon: "{UIcon}",
  divider: "{UDivider} group-last:hidden",
  defaults: {
    size: "md",
    /* icons */
    expandIcon: "add",
    collapseIcon: "remove",
  },
};
