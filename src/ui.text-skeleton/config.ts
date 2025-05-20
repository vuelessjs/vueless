export default /*tw*/ {
  wrapper: "flex flex-col gap-4 w-full",
  headerWrapper: "flex flex-col gap-2 w-full",
  textWrapper: "flex flex-col gap-2 w-full",
  header: {
    base: "{USkeleton} rounded-small last:max-w-3/5 max-w-4/5 last-mb-4",
    variants: {
      size: {
        xs: "h-4.5",
        sm: "h-5",
        md: "h-6",
        lg: "h-7.5",
        xl: "h-9",
        "2xl": "h-11.5",
      },
    },
  },
  text: {
    base: "{USkeleton} rounded-small last:max-w-4/5",
    variants: {
      size: {
        xs: "h-3.5",
        sm: "h-4.5",
        md: "h-5",
        lg: "h-6",
        xl: "h-6",
        "2xl": "h-6",
      },
    },
  },
  body: "{USkeleton} rounded-small",
  defaults: {
    size: "md",
    variant: "default",
    headerLines: 0,
    textLines: 4,
  },
};
