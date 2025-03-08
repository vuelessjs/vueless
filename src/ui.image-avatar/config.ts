export default /*tw*/ {
  avatar: {
    base: `
      flex items-center justify-center shrink-0
      bg-{color}-100 bg-contain bg-center bg-no-repeat
      text-{color}
    `,
    variants: {
      bordered: {
        true: "border border-{color}-200",
      },
      size: {
        "3xs": "size-4 text-xsmall",
        "2xs": "size-5 text-xsmall",
        xs: "size-6 text-small",
        sm: "size-8 text-medium",
        md: "size-10 text-lg",
        lg: "size-12 text-2xl",
        xl: "size-14 text-3xl",
        "2xl": "size-16 text-4xl",
        "3xl": "size-20 text-5xl",
      },
      rounded: {
        default: "rounded-medium",
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      color: {
        white: "bg-default text-gray-900",
        grayscale: "bg-gray-100 text-gray-900",
      },
    },
  },
  placeholderIcon: "{UIcon}",
  defaults: {
    color: "grayscale",
    rounded: "default",
    size: "md",
    bordered: false,
    /* icons */
    placeholderIcon: "image",
  },
};
