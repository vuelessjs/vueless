export default /*tw*/ {
  link: {
    base: `
      inline-block cursor-pointer !leading-none rounded-dynamic-sm transition
      text-{color}-600 decoration-{color}-600 underline-offset-4
      hover:text-{color}-700 hover:decoration-{color}-700
      active:text-{color}-800 active:decoration-{color}-800
      focus-visible:outline-dynamic focus-visible:outline-offset-4 focus-visible:outline-{color}-600
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
          active:text-gray-700 active:decoration-gray-700
        `,
        grayscale: `
          text-gray-900 decoration-gray-900
          hover:text-gray-800 hover:decoration-gray-800
          active:text-gray-700 active:decoration-gray-700
          focus-visible:outline-gray-900
        `,
        white: "decoration-white text-white focus-visible:outline-white",
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
    block: false,
    dashed: false,
    custom: false,
    replace: false,
    disabled: false,
    viewTransition: false,
  },
};
