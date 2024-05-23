export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center
      text-base font-medium rounded-lg outline-none
      transition duration-100 ease-in-out
      focus:ring-4 focus:ring-opacity-10 focus:outline-none
    `,
    variants: {
      size: {
        xs: "px-2 py-1.5 text-xs leading-tight",
        sm: "px-3 py-2.5 text-sm leading-tight",
        md: "px-4 py-3.5 text-base leading-tight",
        lg: "px-5 py-[1.125rem] text-lg leading-tight",
      },
      variant: {
        primary: `
          border border-solid border-{color}-500 bg-{color}-500 text-white
          focus:border-opacity-0 focus:bg-opacity-80 focus:border-{color}-500 focus:bg-{color}-500
          focus:ring-{color}-500
          hover:border-{color}-500 hover:bg-{color}-500
          hover:border-opacity-0 hover:bg-opacity-80
          active:border-{color}-500 active:bg-{color}-500
          active:border-opacity-0 active:bg-opacity-70`,
        secondary: `
          border border-solid bg-transparent
          border-{color}-500 text-{color}-500
          focus:text-{color}-500 focus:border-{color}-500 focus:ring-{color}-500
          focus:text-opacity-80 focus:border-opacity-80
          hover:border-{color}-500 hover:text-{color}-500
          hover:text-opacity-80 hover:border-opacity-80
          active:border-{color}-500 active:text-{color}-500
          active:border-opacity-70 active:text-opacity-70`,
        thirdary: `
          border border-transparent bg-transparent text-{color}-500
          focus:text-{color}-500 focus:bg-{color}-500 focus:ring-{color}-500
          focus:text-opacity-70 focus:bg-opacity-5
          hover:text-{color}-500 hover:bg-{color}-500
          hover:text-opacity-70 hover:bg-opacity-10
          active:text-{color}-500 active:bg-{color}-500
          active:text-opacity-60 active:bg-opacity-15`,
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
        disabled: true,
        variant: "primary",
        class: `
          border-opacity-0 bg-opacity-40 cursor-no-drop text-white
          hover:bg-opacity-40
          focus:bg-opacity-40 focus:ring-0
          active:bg-opacity-40 active:ring-0
        `,
      },
      {
        disabled: true,
        variant: "secondary",
        class: `
          text-opacity-40 border-opacity-40 cursor-no-drop
          hover:text-opacity-40 hover:border-opacity-40
          focus:text-opacity-40 focus:border-opacity-40 focus:ring-0
          active:text-opacity-40 active:border-opacity-40 active:ring-0
        `,
      },
      {
        disabled: true,
        variant: "thirdary",
        class: `
          bg-opacity-5 text-opacity-40 ring-opacity-0 cursor-no-drop
          hover:bg-opacity-5 hover:text-opacity-40
          focus:ring-0 focus:bg-opacity-5 focus:text-opacity-40
          active:bg-opacity-5 active:ring-0 active:text-opacity-40
        `,
      },
      {
        color: "grayscale",
        variant: "primary",
        class: `
          border-gray-900 bg-gray-900
          hover:border-gray-900 hover:bg-gray-900
          focus:border-gray-900  focus:ring-gray-900/20
          active:border-gray-900 active:bg-gray-900`,
      },
      {
        color: "grayscale",
        variant: "secondary",
        class: `
          text-gray-900 border-gray-900
          hover:border-gray-900 hover:text-gray-900
          focus:border-gray-900 focus:text-gray-900 focus:ring-gray-900/20
          active:border-gray-900 active:text-gray-900`,
      },
      {
        color: "grayscale",
        variant: "thirdary",
        class: `
          text-gray-900
          focus:text-gray-800 focus:bg-gray-800 focus:ring-gray-800
          hover:text-gray-800 hover:bg-gray-800
          active:text-gray-800 active:bg-gray-800`,
      },
      {
        color: "white",
        variant: "primary",
        class: `
          border-white bg-white text-gray-500
          focus:ring-white focus:border-white focus:bg-white
          hover:border-white hover:bg-white
          active:border-white active:bg-white`,
      },
      {
        color: "white",
        variant: "secondary",
        class: `
          border-white bg-transparent text-white
          focus:border-white focus:ring-white
          hover:border-white
          active:border-white`,
      },
      {
        color: "white",
        variant: "thirdary",
        class: `
          border-transparent bg-transparent text-white
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
  text: "whitespace-nowrap px-1.5",
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
    { pattern: `border-(${colors})-500` /* , variants: ["hover", "focus", "active"] */ },
    { pattern: `text-(${colors})-500` /* , variants: ["hover", "focus", "active"] */ },
    { pattern: `ring-(${colors})-500`, variants: ["focus"] },
    { pattern: `bg-(${colors})-500` /* , variants: ["hover", "focus", "active"] */ },
  ],
};
