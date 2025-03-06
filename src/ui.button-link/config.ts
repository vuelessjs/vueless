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
      defaultSlot: {
        true: "flex items-center no-underline hover:no-underline",
      },
      dashed: {
        true: "hover:decoration-dashed decoration-dashed",
      },
      disabled: {
        true: "text-{color}-muted pointer-events-none",
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
