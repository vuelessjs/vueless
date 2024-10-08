export default /*tw*/ {
  icon: {
    base: "fill-current outline-0 shrink-0 grow-0",
    variants: {
      variant: {
        light: "text-{color}-400",
        default: "text-{color}-600",
        dark: "text-{color}-800",
      },
      color: {
        white: "text-white",
        grayscale: "text-gray-900",
      },
      interactive: {
        true: "cursor-pointer",
      },
      size: {
        "4xs": "size-2.5",
        "3xs": "size-3",
        "2xs": "size-3.5",
        xs: "size-4",
        sm: "size-5",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
        "2xl": "size-12",
        "3xl": "size-14",
        "4xl": "size-16",
        "5xl": "size-20",
      },
    },
  },
  defaults: {
    color: "grayscale",
    size: "md",
    variant: "default",
    interactive: false,
    /* icon library */
    library: "@material-symbols",
    style: "outlined",
    weight: 500,
  },
  safelist: (colors) => [
    { pattern: `text-(${colors})-400` },
    { pattern: `text-(${colors})-600` },
    { pattern: `text-(${colors})-800` },
  ],
};
