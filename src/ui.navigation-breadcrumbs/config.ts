export default /*tw*/ {
  breadcrumbs: "flex",
  breadcrumb: "flex items-center gap-1 py-2",
  breadcrumbLink: "{ULink}",
  componentIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  dividerIcon: "{>componentIcon}",
  breadcrumbIcon: "{>componentIcon}",
  defaults: {
    color: "grayscale",
    size: "md",
    underlined: undefined,
    dashed: false,
    target: "_self",
    dividerIcon: "arrow_right",
  },
};
