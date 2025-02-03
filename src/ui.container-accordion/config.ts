export default /*tw*/ {
  wrapper: "group cursor-pointer",
  body: "",
  title: {
    base: "flex items-center justify-between font-medium",
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
      opened: {
        true: "pt-2 h-fit opacity-100",
      },
    },
  },
  toggleIcon: "{UIcon}",
  accordionDivider: {
    base: "{UDivider} group-last:hidden",
    defaults: {
      size: {
        sm: "md",
        md: "lg",
        lg: "xl",
      },
    },
  },
  defaults: {
    size: "md",
    /* icons */
    expandIcon: "add",
    collapseIcon: "remove",
  },
};
