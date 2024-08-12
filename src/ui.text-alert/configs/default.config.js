export default /*tw*/ {
  wrapper: {
    base: "p-4 flex flex-col rounded-dynamic",
    variants: {
      variant: {
        primary: "bg-{color}-500 text-white",
        secondary: "bg-transparent border border-{color}-500 text-{color}-500",
        thirdary: "bg-{color}-50 text-{color}-700",
      },
      size: {
        xs: "text-2xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    compoundVariants: [
      { variant: "thirdary", bordered: true, class: "border border-{color}-100" },
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
  button: {
    component: "{UButton}",
    compoundVariants: [{ color: "grayscale", variant: "primary", closable: true, class: "hover:bg-gray-200" }],
  },
  icon: "{UIcon}",
  iconName: "close",
  defaultVariants: {
    variant: "primary",
    color: "brand",
    size: "md",
    timeout: 0,
    bordered: false,
    closable: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-50` },
    { pattern: `bg-(${colors})-500` },
    { pattern: `text-(${colors})-500` },
    { pattern: `text-(${colors})-700` },
    { pattern: `border-(${colors})-100` },
    { pattern: `border-(${colors})-500` },
  ],
};
