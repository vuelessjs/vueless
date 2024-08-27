export default /*tw*/ {
  wrapper: {
    base: "border rounded-full inline-block py-1 !leading-none",
    variants: {
      variant: {
        primary: "bg-{color}-50 text-{color}-600 border-transparent",
        secondary: "border-{color}-600 text-{color}-600",
        thirdary: "text-{color}-600 border-transparent",
      },
      size: {
        sm: "px-2 text-2xs",
        md: "px-2.5 text-xs",
        lg: "px-3 text-sm",
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
        sm: "gap-0.5",
        md: "gap-x-0.5",
        lg: "gap-x-0.5",
      },
    },
  },
  leftIcon: "{UIcon}",
  rightIcon: "{UIcon}",
  defaults: {
    color: "brand",
    size: "md",
    weight: "medium",
    variant: "primary",
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-50` },
    { pattern: `border-(${colors})-600` },
    { pattern: `text-(${colors})-600` },
  ],
};
