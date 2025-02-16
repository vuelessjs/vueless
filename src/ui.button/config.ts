export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center font-medium !leading-snug whitespace-nowrap
      border border-transparent outline-none transition cursor-pointer
      focus-visible:outline-dynamic focus-visible:outline-offset-2
      focus-visible:outline-{color}-600 dark:focus-visible:outline-{color}-400
      disabled:cursor-not-allowed disabled:outline-0 disabled:outline-offset-0
    `,
    variants: {
      size: {
        "2xs": "px-2 py-1 text-xs gap-0.5",
        xs: "px-3 py-1.5 text-xs gap-1",
        sm: "px-4 py-2 text-sm gap-1.5",
        md: "px-5 py-2.5 text-sm gap-1.5",
        lg: "px-6 py-3 text-base gap-1.5",
        xl: "px-7 py-3.5 text-base gap-2",
      },
      variant: {
        primary: `
          text-white            dark:text-gray-900
          bg-{color}-600        dark:bg-{color}-400
          hover:bg-{color}-700  dark:hover:bg-{color}-500
          active:bg-{color}-800 dark:active:bg-{color}-600
          disabled:bg-gray-400  dark:disabled:bg-gray-600
        `,
        secondary: `
          text-{color}-600        border-{color}-600        dark:text-{color}-400        dark:border-{color}-400
          hover:text-{color}-700  hover:border-{color}-700  dark:hover:text-{color}-500  dark:hover:border-{color}-500
          active:text-{color}-800 active:border-{color}-800 dark:active:text-{color}-600 dark:active:border-{color}-600
          disabled:text-gray-400  disabled:border-gray-400  dark:disabled:text-gray-600  dark:disabled:border-gray-600
        `,
        thirdary: `
          text-{color}-600                                 dark:text-{color}-400
          hover:text-{color}-700  hover:bg-{color}-700/10  dark:hover:text-{color}-500  dark:hover:bg-{color}-500/10
          active:text-{color}-800 active:bg-{color}-800/15 dark:active:text-{color}-600 dark:active:bg-{color}-600/15
          disabled:text-gray-400  disabled:bg-transparent  dark:disabled:text-gray-600  dark:disabled:bg-transparent
        `,
      },
      round: {
        false: "rounded-dynamic",
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
      {
        color: ["grayscale", "white"],
        class: "focus-visible:outline-gray-900 dark:focus-visible:outline-gray-100",
      },
      {
        color: "grayscale",
        variant: "primary",
        class: `
          bg-gray-900        dark:bg-gray-100
          hover:bg-gray-800  dark:hover:bg-gray-200
          active:bg-gray-700 dark:active:bg-gray-300
        `,
      },
      {
        color: "grayscale",
        variant: "secondary",
        class: `
          text-gray-900        border-gray-900        dark:text-gray-100         dark:border-gray-100
          hover:text-gray-800  hover:border-gray-800  dark:hover:text-gray-200   dark:hover:border-gray-200
          active:text-gray-700 active:border-gray-700 dark:active:text-gray-300 dark:active:border-gray-300
        `,
      },
      {
        color: "grayscale",
        variant: "thirdary",
        class: `
          text-gray-900                              dark:text-gray-100
          hover:text-gray-800  hover:bg-gray-800/10   dark:hover:text-gray-200  dark:hover:bg-gray-200/10
          active:text-gray-700 active:bg-gray-700/15 dark:active:text-gray-300 dark:active:bg-gray-300/15
        `,
      },
      {
        color: "white",
        class: `
          text-gray-900        dark:text-white
          hover:text-gray-800  dark:hover:text-gray-100
          active:text-gray-700 dark:active:text-gray-200
        `,
      },
      {
        color: "white",
        variant: "primary",
        class: `
          bg-white           dark:text-gray-900
          hover:bg-gray-50   dark:hover:text-gray-800
          active:bg-gray-100 dark:active:text-gray-700
        `,
      },
      {
        color: "white",
        variant: "secondary",
        class: "border-gray-100 hover:border-gray-200 active:border-gray-300",
      },
      {
        color: "white",
        variant: "thirdary",
        class: "hover:bg-white/10 active:bg-white/15",
      },
      { filled: true, variant: "thirdary", class: "bg-{color}-700/5 dark:bg-{color}-500/5" },
      { filled: true, variant: "thirdary", color: ["grayscale", "white"], class: "bg-gray-800/5 dark:bg-gray-200/5" },
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
