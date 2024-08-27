export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center transition
      border font-medium outline-none whitespace-nowrap
      focus:ring-{color}-700/15 focus:ring-dynamic focus:ring-offset-dynamic
      focus-within:ring-{color}-700/15 focus-within:ring-dynamic focus-within:ring-offset-dynamic
      disabled:ring-0 disabled:ring-offset-0 disabled:cursor-not-allowed cursor-pointer
    `,
    variants: {
      size: {
        "2xs": "px-2 py-1 text-xs gap-0.5",
        xs: "px-3 py-1.5 text-xs gap-1",
        sm: "px-4 py-2 text-sm gap-1.5",
        md: "px-5 py-3 text-sm gap-1.5",
        lg: "px-6 py-3.5 text-base gap-1.5",
        xl: "px-7 py-4 text-base gap-2",
      },
      variant: {
        primary: `
          text-white
          bg-{color}-600 border-{color}-600
          hover:bg-{color}-700 hover:border-{color}-700
          focus:bg-{color}-700 focus:border-{color}-700
          active:bg-{color}-800 active:border-{color}-800
          disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white
        `,
        secondary: `
          text-{color}-600 border-{color}-600
          hover:text-{color}-700 hover:border-{color}-700
          focus:text-{color}-700 focus:border-{color}-700
          active:text-{color}-800 active:border-{color}-800
          disabled:text-gray-400 disabled:border-gray-400
        `,
        thirdary: `
          border-transparent
          text-{color}-600
          hover:text-{color}-700 hover:bg-{color}-700/10
          focus:text-{color}-700 focus:bg-{color}-700/10
          active:text-{color}-800 active:bg-{color}-800/15
          disabled:text-gray-400 disabled:bg-transparent
        `,
      },
      round: {
        false: "rounded-dynamic",
        true: "rounded-full",
      },
      noRing: {
        true: "focus:ring-0 focus:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0",
      },
      loading: {
        true: "pointer-events-none gap-0",
      },
      block: {
        true: "w-full",
      },
      color: {
        grayscale: "focus:ring-gray-700/15 focus-within:ring-gray-700/15",
        white: "focus:ring-gray-700/15 focus-within:ring-gray-700/15",
      },
    },
    compoundVariants: [
      {
        color: "grayscale",
        variant: "primary",
        class: `
          bg-gray-900 border-gray-900
          hover:bg-gray-800 hover:border-gray-800
          focus:bg-gray-800 focus:border-gray-800
          active:bg-gray-700 active:border-gray-700
        `,
      },
      {
        color: "grayscale",
        variant: "secondary",
        class: `
          text-gray-900 border-gray-900
          hover:text-gray-800 hover:border-gray-800
          focus:text-gray-800 focus:border-gray-800
          active:text-gray-700 active:border-gray-700
        `,
      },
      {
        color: "grayscale",
        variant: "thirdary",
        class: `
          text-gray-900
          hover:text-gray-800 hover:bg-gray-800/15
          focus:text-gray-800 focus:bg-gray-800/15
          active:text-gray-700 active:bg-gray-700/20
        `,
      },
      {
        color: "white",
        variant: "primary",
        class: `
          text-gray-900 border-white bg-white
          hover:text-gray-800 hover:border-gray-50 hover:bg-gray-50
          focus:text-gray-800 focus:border-gray-50 focus:bg-gray-50
          active:text-gray-700 active:border-gray-100 active:bg-gray-100
        `,
      },
      {
        color: "white",
        variant: "secondary",
        class: `
          text-gray-900 border-gray-200
          hover:text-gray-800 hover:border-gray-300
          focus:text-gray-800 focus:border-gray-300
          active:text-gray-700 active:border-gray-400
        `,
      },
      {
        color: "white",
        variant: "thirdary",
        class: `
          text-gray-900
          hover:text-gray-800 hover:bg-white/15
          focus:text-gray-800 focus:bg-white/15
          active:text-gray-700 active:bg-white/20
        `,
      },
      { filled: true, variant: "thirdary", class: "bg-{color}-600/10" },
      { filled: true, variant: "thirdary", color: "grayscale", class: "bg-gray-900/10" },
      { filled: true, variant: "thirdary", color: "white", class: "bg-gray-50" },
      { leftIcon: true, size: "2xs", class: "pl-1" },
      { leftIcon: true, size: "xs", class: "pl-2" },
      { leftIcon: true, size: "sm", class: "pl-3" },
      { leftIcon: true, size: "md", class: "pl-4" },
      { leftIcon: true, size: "lg", class: "pl-5" },
      { leftIcon: true, size: "xl", class: "pl-6" },
      { rightIcon: true, size: "2xs", class: "pr-1" },
      { rightIcon: true, size: "xs", class: "pr-2" },
      { rightIcon: true, size: "sm", class: "pr-3" },
      { rightIcon: true, size: "md", class: "pr-4" },
      { rightIcon: true, size: "lg", class: "pr-5" },
      { rightIcon: true, size: "xl", class: "pr-6" },
      { square: true, size: "2xs", class: "p-1" },
      { square: true, size: "xs", class: "p-1.5" },
      { square: true, size: "sm", class: "p-2" },
      { square: true, size: "md", class: "p-3" },
      { square: true, size: "lg", class: "p-3.5" },
      { square: true, size: "xl", class: "p-4" },
    ],
  },
  loader: "{ULoader}",
  leftIcon: "{UIcon}",
  rightIcon: "{UIcon}",
  centerIcon: "{UIcon}",
  defaults: {
    color: "brand",
    variant: "primary",
    tag: "button",
    size: "md",
    round: false,
    block: false,
    square: false,
    filled: false,
    noRing: false,
    loading: false,
    disabled: false,
  },
  safelist: (colors) => [
    { pattern: `border-(${colors})-600` },
    { pattern: `border-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `border-(${colors})-800`, variants: ["active"] },
    { pattern: `bg-(${colors})-600` },
    { pattern: `bg-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `bg-(${colors})-800`, variants: ["active"] },
    { pattern: `text-(${colors})-600` },
    { pattern: `text-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `text-(${colors})-800`, variants: ["active"] },
    { pattern: `ring-(${colors})-700`, variants: ["focus", "focus-within"] },
  ],
};
