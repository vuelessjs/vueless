export default /*tw*/ {
  wrapper: {
    base: `
      w-fit inline-flex rounded transition focus-visible:outline-none
      focus-within:ring-dynamic focus-within:ring-offset-4 focus-within:ring-{color}-700/15
    `,
    variants: {
      color: {
        grayscale: "focus-within:ring-gray-700/15",
        white: "focus-within:ring-white/15",
      },
      disabled: {
        true: "focus-within:ring-0 cursor-not-allowed",
      },
      noRing: {
        true: "focus-within:ring-0 focus-within:ring-offset-0",
      },
      block: {
        true: "w-full",
      },
    },
  },
  link: {
    base: `
      w-full inline-block cursor-pointer !leading-none transition
      text-{color}-600 decoration-{color}-600 underline-offset-4
      hover:text-{color}-700 hover:decoration-{color}-700
      focus:text-{color}-700 focus:decoration-{color}-700 focus:outline-0
      active:text-{color}-800 active:decoration-{color}-800
    `,
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      underlined: {
        undefined: "hover:decoration-solid hover:underline",
        true: "decoration-solid underline",
        false: "no-underline",
      },
      color: {
        grayscale: `
          text-gray-900 decoration-gray-900
          hover:text-gray-800 hover:decoration-gray-800
          focus:text-gray-800 focus:decoration-gray-800
          active:text-gray-700 active:decoration-gray-700
        `,
        white: "decoration-white text-white",
      },
      dashed: {
        true: "hover:decoration-dashed decoration-dashed",
      },
      disabled: {
        true: "text-gray-400 pointer-events-none",
      },
    },
  },
  text: "w-full",
  withSlots: "flex items-center no-underline hover:no-underline focus-within:ring-0 focus-within:ring-offset-0",
  leftSlot: "mr-1",
  rightSlot: "ml-1",
  defaultVariants: {
    color: "brand",
    type: "link",
    size: "md",
    ariaCurrentValue: "page",
    activeClass: "",
    exactActiveClass: "",
    wrapperActiveClass: "",
    wrapperExactActiveClass: "",
    underlined: undefined,
    block: false,
    noRing: false,
    dashed: false,
    disabled: false,
    targetBlank: false,
    custom: false,
    replace: false,
  },
  safelist: (colors) => [
    { pattern: `text-(${colors})-600` },
    { pattern: `text-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `text-(${colors})-800`, variants: ["active"] },
    { pattern: `decoration-(${colors})-600` },
    { pattern: `decoration-(${colors})-700`, variants: ["hover", "focus"] },
    { pattern: `decoration-(${colors})-800`, variants: ["active"] },
    { pattern: `ring-(${colors})-700`, variants: ["focus-within"] },
  ],
};
