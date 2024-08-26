export default /*tw*/ {
  avatar: {
    base: `
      flex items-center justify-center shrink-0
      bg-{color}-100 bg-contain bg-center bg-no-repeat
      text-{color}-600
    `,
    variants: {
      bordered: {
        true: "border border-{color}-200",
      },
      size: {
        "3xs": "size-4 text-2xs",
        "2xs": "size-5 text-2xs",
        xs: "size-6 text-xs",
        sm: "size-8 text-sm",
        md: "size-10 text-lg",
        lg: "size-12 text-2xl",
        xl: "size-14 text-3xl",
        "2xl": "size-16 text-4xl",
        "3xl": "size-20 text-5xl",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      color: {
        white: "bg-white text-gray-900",
        grayscale: "bg-gray-100 text-gray-900",
      },
    },
  },
  icon: "{UIcon}",
  defaults: {
    color: "grayscale",
    rounded: "md",
    size: "md",
    icon: "image",
    bordered: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-100` },
    { pattern: `text-(${colors})-600` },
    { pattern: `border-(${colors})-200` },
  ],
};
