export default /*tw*/ {
  avatar: {
    base: `
      flex h-full items-center justify-center font-medium
      bg-contain bg-center bg-no-repeat bg-{color}-100 text-{color}-600`,
    variants: {
      bordered: {
        true: "border border-{color}-200",
      },
      size: {
        "2xs": "size-4 text-2xs",
        xs: "size-5 text-2xs",
        sm: "size-6 text-xs",
        md: "size-8 text-sm",
        lg: "size-10 text-lg",
        xl: "size-12 text-2xl",
        "2xl": "size-14 text-3xl",
      },
      rounded: {
        sm: "rounded",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      color: {
        white: "bg-white text-gray-900",
        grayscale: "bg-gray-100 text-gray-900",
      },
    },
  },
  defaultVariants: {
    color: "grayscale",
    size: "md",
    rounded: "md",
    bordered: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-100` },
    { pattern: `text-(${colors})-600` },
    { pattern: `border-(${colors})-200` },
  ],
};
