export default /*tw*/ {
  wrapper: "group cursor-pointer",
  body: "",
  title: {
    base: "flex items-center justify-between font-medium",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  description: {
    base: "text-accented h-0 opacity-0 transition-all",
    variants: {
      size: {
        sm: "text-tiny",
        md: "text-small",
        lg: "text-medium",
      },
      opened: {
        true: "pt-2 h-fit opacity-100",
      },
    },
  },
  toggleIcon: "{UIcon}",
  accordionDivider: {
    base: "{UDivider} group-last:hidden",
    variants: {
      size: {
        sm: "py-4",
        md: "py-5",
        lg: "py-6",
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
