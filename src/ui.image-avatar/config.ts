export default /*tw*/ {
  avatar: {
    base: `
      flex items-center justify-center shrink-0 border
      text-{color} bg-{color}/10 bg-contain bg-center bg-no-repeat
    `,
    variants: {
      variant: {
        solid: "border-transparent text-inverted bg-{color}",
        outlined: "border-{color} text-{color}",
        subtle: "border-{color}/15 text-{color} bg-{color}/10",
        soft: "border-transparent text-{color} bg-{color}/10",
      },
      size: {
        "3xs": "size-4 text-tiny",
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
      src: {
        true: "bg-transparent",
      },
    },
  },
  placeholderIcon: "{UIcon}",
  defaults: {
    color: "grayscale",
    variant: "solid",
    rounded: "md",
    size: "md",
    /* icons */
    placeholderIcon: "image",
  },
};
