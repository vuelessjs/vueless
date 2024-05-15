export default /*tw*/ {
  wrapper: {
    base: "",
    variants: {
      pill: {
        true: "rounded-full bg-{color}-500 bg-opacity-5",
      },
    },
    compoundVariants: [
      { pill: true, size: "3xs", class: "p-1" },
      { pill: true, size: "2xs", class: "p-1" },
      { pill: true, size: "xs", class: "p-2" },
      { pill: true, size: "sm", class: "p-2" },
      { pill: true, size: "md", class: "p-3" },
      { pill: true, size: "lg", class: "p-3" },
      { pill: true, size: "xl", class: "p-4" },
      { pill: true, size: "2xl", class: "p-4" },
      { pill: true, size: "3xl", class: "p-4" },
      { pill: true, size: "4xl", class: "p-5" },
      { pill: true, size: "5xl", class: "p-5" },
      { pill: true, color: "white", class: "bg-white" },
      { pill: true, color: "grayscale", class: "bg-gray-900" },
    ],
  },
  container: {
    base: "fill-current outline-0",
    variants: {
      size: {
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
      variant: {
        light: "text-{color}-400",
        default: "text-{color}-500",
        dark: "text-{color}-700",
      },
      color: {
        white: "text-white",
        grayscale: "text-gray-900",
      },
      interactive: {
        true: "cursor-pointer hover:opacity-50, active:opacity-50",
      },
    },
  },
  icon: {
    variants: {
      size: {
        "3xs": "h-3 w-3",
        "2xs": "h-3.5 w-3.5",
        xs: " h-4 w-4",
        sm: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-10 w-10",
        "2xl": "h-12 w-12",
        "3xl": "h-14 w-14",
        "4xl": "h-16 w-16",
        "5xl": "h-20 w-20",
      },
    },
  },
  defaultVariants: {
    name: "",
    library: "@material-symbols",
    weight: 500,
    style: "outlined",
    color: "grayscale",
    size: "md",
    variant: "default",
    interactive: false,
    fill: false,
  },
  safelist: (colors) => [
    { pattern: `text-(${colors})-400` },
    { pattern: `text-(${colors})-500` },
    { pattern: `text-(${colors})-700` },
    { pattern: `bg-(${colors})-500` },
  ],
};
