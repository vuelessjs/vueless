export default /*tw*/ {
  wrapper: "flex",
  container: "flex items-center gap-1 py-2",
  breadcrumb: "{ULink}",
  leftSlotWrapper: "flex items-center",
  rightSlotWrapper: "flex items-center",
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
    dividerIcon: "arrow_right",
  },
};
