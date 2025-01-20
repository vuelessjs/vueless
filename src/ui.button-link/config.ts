export default /*tw*/ {
  link: {
    base: `
      inline-block cursor-pointer !leading-none rounded transition
      text-{color}-600 decoration-{color}-600 underline-offset-4
      hover:text-{color}-700 hover:decoration-{color}-700
      focus:text-{color}-700 focus:decoration-{color}-700 focus:outline-0
      active:text-{color}-800 active:decoration-{color}-800
      focus:ring-dynamic focus:ring-offset-4 focus:ring-{color}-700/15
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
        gray: `
          text-gray-500 decoration-gray-500
          hover:text-gray-600 hover:decoration-gray-600
          focus:text-gray-600 focus:decoration-gray-600
          active:text-gray-700 active:decoration-gray-700
        `,
        grayscale: `
          text-gray-900 decoration-gray-900
          hover:text-gray-800 hover:decoration-gray-800
          focus:text-gray-800 focus:decoration-gray-800 focus:ring-gray-700/15
          active:text-gray-700 active:decoration-gray-700
        `,
        white: "decoration-white text-white focus:ring-white/15",
      },
      defaultSlot: {
        true: "flex items-center no-underline hover:no-underline",
      },
      dashed: {
        true: "hover:decoration-dashed decoration-dashed",
      },
      disabled: {
        true: "text-gray-400 pointer-events-none",
      },
      ring: {
        false: "!ring-0 !ring-offset-0",
      },
      block: {
        true: "w-full",
      },
    },
  },
  defaults: {
    color: "brand",
    type: "link",
    size: "md",
    target: "_self",
    activeClass: "",
    exactActiveClass: "",
    ariaCurrentValue: "page",
    rel: "noopener noreferrer",
    underlined: undefined,
    ring: false,
    block: false,
    dashed: false,
    custom: false,
    replace: false,
    disabled: false,
    viewTransition: false,
  },
};
