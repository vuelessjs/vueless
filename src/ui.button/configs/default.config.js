export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center
      text-base font-medium rounded-lg outline-none
      transition duration-100 ease-in-out
      focus:ring-4 focus:outline-none
      disabled:ring-0 disabled:cursor-no-drop
    `,
    variants: {
      size: {
        xs: "px-2 py-1.5 text-xs leading-tight gap-0.5",
        sm: "px-3 py-2.5 text-sm leading-tight gap-1",
        md: "px-4 py-3.5 text-base leading-tight gap-1.5",
        lg: "px-5 py-[1.125rem] text-lg leading-tight gap-2",
      },
      variant: {
        primary: `
          border border-solid border-{color}-600 bg-{color}-600 text-white
          focus:border-{color}-700 focus:bg-{color}-700 focus:ring-{color}-100
          hover:border-{color}-700 hover:bg-{color}-700 hover:border-transparent
          active:bg-{color}-800 active:border-{color}-800
          disabled:bg-{color}-300 disabled:text-white disabled:border-{color}-300
        `,
        secondary: `
          border border-solid bg-transparent
          border-{color}-600 text-{color}-600
          focus:text-{color}-700 focus:border-{color}-700 focus:ring-{color}-100
          hover:border-{color}-700 hover:text-{color}-700
          active:border-{color}-800 active:text-{color}-800
          disabled:text-{color}-300 disabled:border-{color}-300
        `,
        thirdary: `
          border border-transparent bg-transparent text-{color}-600
          focus:text-{color}-700 focus:bg-{color}-50 focus:ring-{color}-100
          hover:text-{color}-700 hover:bg-{color}-150
          active:text-{color}-800 active:bg-{color}-100
          disabled:text-{color}-300
        `,
      },
      loading: {
        true: "pointer-events-none",
      },
      pill: {
        true: "rounded-full",
      },
      block: {
        true: "w-full",
      },
    },
    compoundVariants: [
      {
        color: "grayscale",
        variant: "primary",
        class: `
          border-gray-900 bg-gray-900
          hover:border-gray-800 hover:bg-gray-800
          focus:ring-gray-100 focus:ring-gray-100
          active:border-gray-700 active:bg-gray-700
          disabled:bg-gray-500 disabled:border-gray-500
        `,
      },
      {
        color: "grayscale",
        variant: "secondary",
        class: `
          text-gray-900 border-gray-900
          hover:border-gray-800 hover:text-gray-800
          focus:border-gray-800 focus:text-gray-800 focus:ring-gray-100
          active:border-gray-700 active:text-gray-700
          disabled:border-gray-500 disabled:text-gray-500
        `,
      },
      {
        color: "grayscale",
        variant: "thirdary",
        class: `
          text-gray-800
          focus:text-gray-800 focus:bg-gray-800 focus:ring-gray-100
          hover:text-gray-800 hover:bg-gray-800
          active:text-gray-700 active:bg-gray-700 disabled:text-gray-500
        `,
      },
      {
        color: "white",
        variant: "primary",
        class: `
          border-white bg-white text-gray-500
          hover:text-gray-800 focus:text-gray-800
          focus:ring-white focus:border-white focus:bg-white
          hover:border-white hover:bg-white
          active:border-white active:bg-white`,
      },
      {
        color: "white",
        variant: "secondary",
        class: `
          border-white bg-white text-gray-900
          focus:border-white focus:ring-white
          hover:border-white hover:text-gray-800
          focus:text-gray-800
          active:text-gray-700 active:border-white`,
      },
      {
        color: "white",
        variant: "thirdary",
        class: `
          border-transparent bg-transparent text-gray-500
          hover:text-gray-800 focus:text-gray-800
          focus:bg-white focus:ring-white
          hover:bg-white
          active:bg-white`,
      },
      { filled: true, variant: "thirdary", class: "bg-{color}-500 bg-opacity-5" },
      { filled: true, variant: "thirdary", color: "white", class: "bg-white" },
      { filled: true, variant: "thirdary", color: "grayscale", class: "bg-gray-900" },
      { square: true, size: "xs", class: "p-1" },
      { square: true, size: "sm", class: "p-2" },
      { square: true, size: "md", class: "p-3" },
      { square: true, size: "lg", class: "py-4" },
    ],
  },
  text: "whitespace-nowrap",
  defaultVariants: {
    color: "brand",
    variant: "primary",
    size: "md",
    tag: "button",
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
    { pattern: `ring-(${colors})-100`, variants: ["focus"] },
  ],
};
