export default /*tw*/ {
  wrapper: {
    base: "border p-4 flex flex-col rounded-dynamic",
    variants: {
      variant: {
        primary: "bg-{color}-600 text-white border-transparent",
        secondary: "border-{color}-600 text-{color}-600",
        thirdary: "bg-{color}-50 text-{color}-600 border-transparent",
      },
      size: {
        xs: "text-2xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    compoundVariants: [
      { variant: "thirdary", bordered: true, class: "border-{color}-100" },
      { color: "white", variant: "primary", class: "text-gray-900 bg-white" },
      { color: "white", variant: "secondary", class: "text-gray-900 border-gray-200" },
      { color: "white", variant: "thirdary", class: "text-gray-900 bg-white" },
      { color: "white", variant: "thirdary", bordered: true, class: "border-gray-200" },
      { color: "grayscale", variant: "primary", class: "bg-gray-900" },
      { color: "grayscale", variant: "secondary", class: "text-gray-900 border-gray-900" },
      { color: "grayscale", variant: "thirdary", class: "text-gray-900 bg-gray-50" },
      { color: "grayscale", variant: "thirdary", bordered: true, class: "border-gray-200" },
    ],
  },
  text: "{UText}",
  body: "flex items-start justify-between",
  content: "",
  innerWrapper: "flex gap-2",
  title: {
    base: "font-bold leading-tight",
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  description: "",
  closeButton: "{UButton}",
  closeIcon: "{UIcon}",
  defaults: {
    variant: "primary",
    color: "brand",
    size: "md",
    timeout: 0,
    bordered: false,
    closable: false,
    /* icons */
    closeIcon: "close",
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-50` },
    { pattern: `bg-(${colors})-600` },
    { pattern: `text-(${colors})-600` },
    { pattern: `border-(${colors})-100` },
    { pattern: `border-(${colors})-600` },
  ],
};
