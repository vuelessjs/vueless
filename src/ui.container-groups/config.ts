export default /*tw*/ {
  wrapper: {
    base: "flex flex-col items-stretch",
    variants: {
      gap: {
        none: "gap-0",
        xs: "gap-8",
        sm: "gap-10",
        md: "gap-12",
        lg: "gap-14",
        xl: "gap-16",
      },
    },
  },
  defaults: {
    gap: "md",
  },
};
