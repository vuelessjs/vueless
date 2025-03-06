export default /*tw*/ {
  link: {
    base: `
      inline-block cursor-pointer !leading-none rounded-dynamic-sm transition
      text-{color} decoration-{color} underline-offset-4
      hover:text-{color}-lifted hover:decoration-{color}-lifted
      active:text-{color}-accented active:decoration-{color}-accented
      focus-visible:outline-medium focus-visible:outline-offset-4 focus-visible:outline-{color}
    `,
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      underlined: {
        undefined: "hover:decoration-solid hover:underline",
        true: "decoration-solid underline",
        false: "no-underline",
      },
      color: {
        gray: `
          text-grayscale-500 decoration-grayscale-500 dark:text-grayscale-400 dark:decoration-grayscale-400
          hover:text-grayscale-600 hover:decoration-grayscale-600 dark:hover:text-grayscale-500 dark:hover:decoration-grayscale-500
          active:text-grayscale-700 active:decoration-grayscale-700 dark:active:text-grayscale-600 dark:active:decoration-grayscale-600
        `,
      },
      defaultSlot: {
        true: "flex items-center no-underline hover:no-underline",
      },
      dashed: {
        true: "hover:decoration-dashed decoration-dashed",
      },
      disabled: {
        true: "text-muted pointer-events-none",
      },
      block: {
        true: "w-full",
      },
    },
  },
  defaults: {
    color: "primary",
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
