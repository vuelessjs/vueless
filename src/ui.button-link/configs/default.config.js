export default /*tw*/ {
  wrapper: {
    base: `
      w-fit inline-flex rounded transition focus-visible:outline-none
      focus-within:ring-dynamic focus-within:ring-offset-4 focus-within:ring-{color}-500 focus-within:ring-opacity-15
    `,
    variants: {
      color: {
        grayscale: "focus-within:ring-gray-900/10",
        white: "focus-within:ring-white/10",
      },
      disabled: {
        true: "pointer-events-none opacity-70",
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
      text-{color}-500 decoration-{color}-500 underline-offset-4
      hover:text-opacity-80
      active:text-opacity-70
      focus:ring-offset-0 focus:ring-0
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
        grayscale: "decoration-gray-900 text-gray-900",
        white: "decoration-white text-white",
      },
      dashed: {
        true: "hover:decoration-dashed decoration-dashed",
      },
    },
  },
  text: "w-full",
  withSlots: "flex items-center no-underline hover:no-underline focus-within:ring-offset-0 focus-within:ring-0",
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
    { pattern: `decoration-(${colors})-500` },
    { pattern: `text-(${colors})-500` },
    { pattern: `ring-(${colors})-500`, variants: ["focus-within"] },
  ],
};
