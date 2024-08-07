export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center
      text-base font-medium outline-none
      border border-solid transition
      focus:ring-opacity-20 focus:ring-4 focus:ring-{color}-700
      focus-within:ring-opacity-20 focus-within:ring-4 focus-within:ring-{color}-700
      disabled:ring-0 disabled:cursor-no-drop
    `,
    variants: {
      size: {
        "2xs": "px-2 py-1 text-xs leading-tight gap-0.5",
        xs: "px-3 py-1.5 text-xs leading-tight gap-0.5",
        sm: "px-4 py-2 text-sm leading-tight gap-1",
        md: "px-5 py-3 text-sm leading-tight gap-1",
        lg: "px-6 py-3.5 text-base leading-tight gap-1.5",
        xl: "px-7 py-4 text-base leading-tight gap-1.5",
      },
      variant: {
        primary: `
          text-white
          bg-{color}-600 border-{color}-600
          hover:bg-{color}-700 hover:border-{color}-700
          focus:bg-{color}-700 focus:border-{color}-700
          active:bg-{color}-800 active:border-{color}-800
          disabled:bg-{color}-300 disabled:border-{color}-300 disabled:text-white
        `,
        secondary: `
          text-{color}-600 border-{color}-600
          hover:text-{color}-700 hover:border-{color}-700
          focus:text-{color}-700 focus:border-{color}-700
          active:text-{color}-800 active:border-{color}-800
          disabled:text-{color}-300 disabled:border-{color}-300
        `,
        thirdary: `
          border-transparent
          text-{color}-600
          hover:text-{color}-700 hover:bg-{color}-700 hover:bg-opacity-10
          focus:text-{color}-700 focus:bg-{color}-700 focus:bg-opacity-10
          active:text-{color}-800 active:bg-{color}-800 active:bg-opacity-15
          disabled:text-{color}-300
        `,
      },
      loading: {
        true: "pointer-events-none gap-0",
      },
      pill: {
        false: "rounded-dynamic",
        true: "rounded-full",
      },
      block: {
        true: "w-full",
      },
      color: {
        grayscale: "focus:ring-gray-800 focus-within:ring-gray-800 disabled:text-gray-400",
        white: "focus:ring-gray-800 focus-within:ring-gray-800 disabled:text-gray-400",
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
          disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white
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
          disabled:border-gray-400
        `,
      },
      {
        color: "grayscale",
        variant: "thirdary",
        class: `
          text-gray-900
          hover:text-gray-800 hover:bg-gray-800
          focus:text-gray-800 focus:bg-gray-800
          active:text-gray-700 active:bg-gray-700
          disabled:bg-transparent
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
          hover:text-gray-800 hover:bg-white
          focus:text-gray-800 focus:bg-white
          active:text-gray-700 active:bg-white
          disabled:bg-transparent
        `,
      },
      { filled: true, variant: "thirdary", class: "bg-{color}-700 bg-opacity-10" },
      {
        filled: true,
        variant: "thirdary",
        color: "grayscale",
        class: "bg-gray-800 bg-opacity-10 hover:bg-opacity-15 focus:bg-opacity-15 active:bg-opacity-20",
      },
      { filled: true, variant: "thirdary", color: "white", class: "bg-gray-50" },
      { iconLeft: true, size: "2xs", class: "pl-1" },
      { iconLeft: true, size: "xs", class: "pl-1.5" },
      { iconLeft: true, size: "sm", class: "pl-2" },
      { iconLeft: true, size: "md", class: "pl-4" },
      { iconLeft: true, size: "lg", class: "pl-3.5" },
      { iconLeft: true, size: "xl", class: "pl-4" },
      { iconRight: true, size: "2xs", class: "pr-1" },
      { iconRight: true, size: "xs", class: "pr-2" },
      { iconRight: true, size: "sm", class: "pr-3" },
      { iconRight: true, size: "md", class: "pr-4" },
      { iconRight: true, size: "lg", class: "pr-5" },
      { iconRight: true, size: "xl", class: "pr-6" },
      { square: true, size: "2xs", class: "p-1" },
      { square: true, size: "xs", class: "p-1.5" },
      { square: true, size: "sm", class: "p-2" },
      { square: true, size: "md", class: "p-3" },
      { square: true, size: "lg", class: "p-3.5" },
      { square: true, size: "xl", class: "p-4" },
    ],
  },
  text: "whitespace-nowrap focus-visible:outline-none",
  defaultVariants: {
    color: "brand",
    variant: "primary",
    tag: "button",
    size: "md",
    pill: false,
    block: false,
    square: false,
    filled: false,
    loading: false,
    disabled: false,
  },
  safelist: (colors) => [
    { pattern: `border-(${colors})-600` },
    { pattern: `border-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `border-(${colors})-800`, variants: ["active"] },
    { pattern: `border-(${colors})-300`, variants: ["disabled"] },
    { pattern: `bg-(${colors})-600` },
    { pattern: `bg-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `bg-(${colors})-800`, variants: ["active"] },
    { pattern: `bg-(${colors})-300`, variants: ["disabled"] },
    { pattern: `text-(${colors})-600` },
    { pattern: `text-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `text-(${colors})-800`, variants: ["active"] },
    { pattern: `text-(${colors})-300`, variants: ["disabled"] },
    { pattern: `ring-(${colors})-700`, variants: ["focus", "focus-within"] },
  ],
};
