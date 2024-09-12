export default /*tw*/ {
  badge: {
    base: `
      border rounded-dynamic inline-block py-1 !leading-none outline-none
      focus:ring-{color}-700/15 focus:ring-dynamic focus:ring-offset-dynamic
      focus-within:ring-{color}-700/15 focus-within:ring-dynamic focus-within:ring-offset-dynamic
    `,
    variants: {
      variant: {
        primary: "bg-{color}-600 text-white border-transparent",
        secondary: "border-{color}-600 text-{color}-600",
        thirdary: "bg-{color}-50 text-{color}-600 border-transparent",
      },
      size: {
        sm: "px-2 text-2xs",
        md: "px-2.5 text-xs",
        lg: "px-3 text-sm",
      },
      round: {
        true: "rounded-full",
      },
      tabindex: {
        true: `
          cursor-pointer focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-{color}-700/15
          focus:ring-dynamic focus:ring-offset-dynamic focus:ring-{color}-700/15
        `,
      },
      color: {
        grayscale: "focus:ring-gray-700/15 focus-within:ring-gray-700/15",
        white: "focus:ring-gray-700/15 focus-within:ring-gray-700/15",
      },
    },
    compoundVariants: [
      { variant: "thirdary", bordered: true, class: "border-{color}-100" },
      { color: "grayscale", variant: "primary", class: "bg-gray-900" },
      { color: "grayscale", variant: "secondary", class: "border-gray-900 text-gray-900" },
      { color: "grayscale", variant: "thirdary", class: "bg-gray-100 text-gray-900" },
      { color: "white", variant: "primary", class: "bg-white text-gray-900" },
      { color: "white", variant: "secondary", class: "border-white text-white" },
      { color: "white", variant: "thirdary", class: "text-white bg-white/15" },
      { leftIcon: true, size: "sm", class: "pl-1.5" },
      { leftIcon: true, size: "md", class: "pl-1.5" },
      { leftIcon: true, size: "lg", class: "pl-2" },
      { rightIcon: true, size: "sm", class: "pr-1.5" },
      { rightIcon: true, size: "md", class: "pr-1.5" },
      { rightIcon: true, size: "lg", class: "pr-2" },
    ],
  },
  body: {
    base: "flex items-center",
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-0.5",
        lg: "gap-0.5",
      },
    },
  },
  leftIcon: "{UIcon}",
  centerIcon: "{UIcon}",
  rightIcon: "{UIcon}",
  defaults: {
    color: "brand",
    variant: "primary",
    size: "md",
    tabindex: 0,
    round: false,
    bordered: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-50` },
    { pattern: `bg-(${colors})-600` },
    { pattern: `border-(${colors})-100` },
    { pattern: `border-(${colors})-600` },
    { pattern: `text-(${colors})-600` },
    { pattern: `ring-(${colors})-700`, variants: ["focus", "focus-within"] },
  ],
};
