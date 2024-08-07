export default /*tw*/ {
  wrapper: {
    base: "p-4 flex flex-col rounded-dynamic",
    variants: {
      variant: {
        primary: `bg-{color}-500 text-white`,
        secondary: `bg-transparent border border-{color}-500 text-{color}-500`,
        thirdary: `bg-{color}-50 text-{color}-700`,
      },
    },
    compoundVariants: [
      { variant: "thirdary", bordered: true, class: "border border-{color}-100" },
      { color: "white", variant: "primary", class: "text-gray-900 bg-white" },
      { color: "white", variant: "secondary", class: "text-gray-900 bg-white border-gray-500" },
      { color: "white", variant: "thirdary", bordered: true, class: "text-gray-900 bg-white border border-gray-500" },
      { color: "grayscale", variant: "primary", class: `bg-gray-900` },
      { color: "grayscale", variant: "secondary", class: `text-gray-900 border-gray-900` },
      { color: "grayscale", variant: "thirdary", bordered: true, class: `text-gray-900 border border-gray-500` },
    ],
  },
  body: {
    base: "{UText} flex gap-2 items-baseline",
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  title: {
    base: "font-bold leading-tight",
    variants: {
      size: {
        xs: "text-sm",
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
      },
    },
  },
  description: {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  button: "{UButton}",
  icon: "{UIcon}",
  iconName: "close",
  defaultVariants: {
    variant: "thirdary",
    color: "brand",
    size: "md",
    timeout: 0,
    html: undefined,
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
