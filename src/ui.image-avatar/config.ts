export default /*tw*/ {
  avatar: {
    base: `
      flex items-center justify-center shrink-0
      text-{color} bg-{color}/5 bg-contain bg-center bg-no-repeat
    `,
    variants: {
      bordered: {
        true: "border border-{color}/15",
      },
      size: {
        "3xs": "size-4 text-2xs",
        "2xs": "size-5 text-xs",
        xs: "size-6 text-sm",
        sm: "size-8 text-base",
        md: "size-10 text-lg",
        lg: "size-12 text-xl",
        xl: "size-14 text-2xl",
        "2xl": "size-16 text-3xl",
        "3xl": "size-20 text-4xl",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-small",
        md: "rounded-medium",
        lg: "rounded-large",
        full: "rounded-full",
      },
    },
  },
  placeholderIcon: "{UIcon}",
  defaults: {
    color: "grayscale",
    rounded: "md",
    size: "md",
    bordered: false,
    /* icons */
    placeholderIcon: "image",
  },
};
