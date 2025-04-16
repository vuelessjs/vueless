export default /*tw*/ {
  wrapper: {
    base: "flex items-center text-default !leading-none",
    variants: {
      size: {
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-2.5",
      },
    },
  },
  starsContainer: "flex relative",
  starLabel: "",
  star: {
    base: "{UIcon}",
    variants: {
      disabled: {
        true: "text-muted pointer-events-none",
      },
    },
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  input: "absolute size-0 opacity-0",
  counter: {
    variants: {
      size: {
        sm: "text-large",
        md: "text-xl",
        lg: "text-2xl",
      },
    },
  },
  total: {
    variants: {
      size: {
        sm: "text-medium",
        md: "text-large",
        lg: "text-xl",
      },
    },
  },
  defaults: {
    size: "md",
    stars: 5,
    counter: false,
    readonly: false,
    disabled: false,
    /* icons */
    selectedIcon: "star-fill",
    unselectedIcon: "star",
  },
};
