export default /*tw*/ {
  breadcrumbs: "flex items-center gap-1 py-2",
  breadcrumbLink: "{ULink}",
  breadcrumbIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  dividerIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  defaults: {
    color: "grayscale",
    size: "md",
    underlined: undefined,
    dashed: false,
    target: "_self",
    dividerIcon: "arrow_right",
  },
};
