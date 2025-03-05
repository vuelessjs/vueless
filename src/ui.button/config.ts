export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center font-medium !leading-snug whitespace-nowrap
      border border-transparent transition cursor-pointer
      focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:outline-{color}
      disabled:cursor-not-allowed disabled:outline-0 disabled:outline-offset-0
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
          disabled:bg-gray-muted
        `,
        secondary: `
          text-{color} border-{color}
          hover:text-{color}-lifted hover:border-{color}-lifted hover:bg-{color}-lifted/10
          active:text-{color}-accented active:border-{color}-accented active:bg-{color}-accented/15
          disabled:text-gray-muted disabled:border-{color}-muted
        `,
        thirdary: `
          text-{color}
          hover:text-{color}-lifted hover:bg-{color}-lifted/10
          active:text-{color}-accented active:bg-{color}-accented/15
          disabled:text-gray-muted disabled:bg-transparent
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
      { rightIcon: true, size: "2xs", class: "pr-1" },
      { rightIcon: true, size: "xs", class: "pr-2" },
      { rightIcon: true, size: "sm", class: "pr-3" },
      { rightIcon: true, size: "md", class: "pr-4" },
      { rightIcon: true, size: "lg", class: "pr-5" },
      { rightIcon: true, size: "xl", class: "pr-6" },
      { leftIcon: true, size: "2xs", class: "pl-1" },
      { leftIcon: true, size: "xs", class: "pl-2" },
      { leftIcon: true, size: "sm", class: "pl-3" },
      { leftIcon: true, size: "md", class: "pl-4" },
      { leftIcon: true, size: "lg", class: "pl-5" },
      { leftIcon: true, size: "xl", class: "pl-6" },
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
  leftIcon: "{UIcon} {>centerIcon}",
  rightIcon: "{UIcon} {>centerIcon}",
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
    color: "brand",
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
