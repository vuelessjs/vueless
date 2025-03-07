export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center font-medium !leading-snug whitespace-nowrap
      border border-transparent transition cursor-pointer
      focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:outline-{color}
      disabled:pointer-events-none disabled:outline-0 disabled:outline-offset-0
    `,
    variants: {
      size: {
        "2xs": "px-2 py-1 text-small gap-0.5",
        xs: "px-3 py-1.5 text-small gap-1",
        sm: "px-4 py-2 text-medium gap-1.5",
        md: "px-5 py-2.5 text-medium gap-1.5",
        lg: "px-6 py-3 text-large gap-1.5",
        xl: "px-7 py-3.5 text-large gap-2",
      },
      variant: {
        primary: `
          text-inverted
          bg-{color}
          hover:bg-{color}-lifted
          active:bg-{color}-accented
          disabled:bg-{color}-muted
        `,
        secondary: `
          text-{color} border-{color}
          hover:text-{color}-lifted hover:border-{color}-lifted hover:bg-{color}-lifted/10
          active:text-{color}-accented active:border-{color}-accented active:bg-{color}-accented/15
          disabled:text-{color}-muted disabled:border-{color}-muted
        `,
        thirdary: `
          text-{color}
          hover:text-{color}-lifted hover:bg-{color}-lifted/10
          active:text-{color}-accented active:bg-{color}-accented/15
          disabled:text-{color}-muted
        `,
      },
      round: {
        false: "rounded-medium",
        true: "rounded-full",
      },
      loading: {
        true: "gap-0 pointer-events-none",
      },
      label: {
        false: "gap-0",
      },
      block: {
        true: "w-full",
      },
    },
    compoundVariants: [
      { filled: true, variant: "thirdary", class: "bg-{color}-lifted/5" },
      { filled: true, disabled: true, variant: "thirdary", class: "bg-{color}-muted/5" },
      { square: true, size: "2xs", class: "p-1" },
      { square: true, size: "xs", class: "p-1.5" },
      { square: true, size: "sm", class: "p-2" },
      { square: true, size: "md", class: "p-2.5" },
      { square: true, size: "lg", class: "p-3" },
      { square: true, size: "xl", class: "p-3.5" },
    ],
  },
  loader: {
    base: "{ULoader}",
    defaults: {
      size: {
        "2xs": "sm",
        xs: "sm",
        sm: "md",
        md: "md",
        lg: "lg",
        xl: "lg",
      },
    },
  },
  leftIcon: "{UIcon} {>centerIcon} -ml-1",
  rightIcon: "{UIcon} {>centerIcon} -mr-1",
  centerIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        "2xs": "2xs",
        xs: "xs",
        sm: "sm",
        md: "sm",
        lg: "sm",
        xl: "sm",
      },
    },
  },
  defaults: {
    color: "primary",
    variant: "primary",
    tag: "button",
    size: "md",
    tabindex: 0,
    round: false,
    block: false,
    square: false,
    filled: false,
    loading: false,
    disabled: false,
  },
};
