export default /*tw*/ {
  wrapper: {
    base: "border border-solid rounded-full inline-block !leading-none",
    variants: {
      variant: {
        primary: "bg-{color}-100 text-{color}-500 border-transparent",
        secondary: "border-{color}-500 text-{color}-500",
        thirdary: "text-{color}-500 border-transparent",
      },
      size: {
        sm: "px-2 py-1 text-2xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      },
    },
    compoundVariants: [
      { color: "grayscale", variant: "primary", class: "bg-gray-100 text-gray-900" },
      { color: "grayscale", variant: "secondary", class: "border-gray-900 text-gray-900" },
      { color: "grayscale", variant: "thirdary", class: "text-gray-900" },
      { color: "white", variant: "primary", class: "bg-white text-gray-900" },
      { color: "white", variant: "secondary", class: "border-white text-white" },
      { color: "white", variant: "thirdary", class: "text-white" },
    ],
  },
  body: {
    base: "flex items-center",
    variants: {
      size: {
        sm: "space-x-0.5",
        md: "space-x-1",
        lg: "space-x-1.5",
      },
    },
  },
  defaultVariants: {
    color: "brand",
    size: "md",
    weight: "medium",
    variant: "primary",
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-100` },
    { pattern: `border-(${colors})-500` },
    { pattern: `text-(${colors})-500` },
  ],
};
