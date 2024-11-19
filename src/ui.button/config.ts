export default /*tw*/ {
  button: {
    base: `
      flex items-center justify-center font-medium !leading-snug whitespace-nowrap
      border border-transparent outline-none transition
      disabled:cursor-not-allowed cursor-pointer
      disabled:ring-0 disabled:ring-offset-0
      focus:ring-dynamic             focus-within:ring-dynamic
      focus:ring-offset-dynamic      focus-within:ring-offset-dynamic
      focus:ring-{color}-700/15      focus-within:ring-{color}-700/15
      dark:focus:ring-{color}-500/15 dark:focus-within:ring-{color}-500/15
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
          focus:bg-{color}-700  dark:focus:bg-{color}-500
          active:bg-{color}-800 dark:active:bg-{color}-600
          disabled:bg-gray-400  dark:disabled:bg-gray-600
        `,
        secondary: `
          text-{color}-600        border-{color}-600        dark:text-{color}-400        dark:border-{color}-400
          hover:text-{color}-700  hover:border-{color}-700  dark:hover:text-{color}-500  dark:hover:border-{color}-500
          focus:text-{color}-700  focus:border-{color}-700  dark:focus:text-{color}-500  dark:focus:border-{color}-500
          active:text-{color}-800 active:border-{color}-800 dark:active:text-{color}-600 dark:active:border-{color}-600
          disabled:text-gray-400  disabled:border-gray-400  dark:disabled:text-gray-600  dark:disabled:border-gray-600
        `,
        thirdary: `
          text-{color}-600                                 dark:text-{color}-400
          hover:text-{color}-700  hover:bg-{color}-700/10  dark:hover:text-{color}-500  dark:hover:bg-{color}-500/10
          focus:text-{color}-700  focus:bg-{color}-700/10  dark:focus:text-{color}-500  dark:focus:bg-{color}-500/10
          active:text-{color}-800 active:bg-{color}-800/15 dark:active:text-{color}-600 dark:active:bg-{color}-600/15
          disabled:text-gray-400  disabled:bg-transparent  dark:disabled:text-gray-600  dark:disabled:bg-transparent
        `,
      },
      round: {
        false: "rounded-dynamic",
        true: "rounded-full",
      },
      noRing: {
        true: "!ring-0 !ring-offset-0",
      },
      loading: {
        true: "pointer-events-none gap-0",
      },
      block: {
        true: "w-full",
      },
      label: {
        false: "gap-0",
      },
    },
    compoundVariants: [
      {
        color: ["grayscale", "white"],
        class: `
          focus:ring-gray-700/15        dark:focus:ring-gray-500/15
          focus-within:ring-gray-700/15 dark:focus-within:ring-gray-500/15
        `,
      },
      {
        color: "grayscale",
        variant: "primary",
        class: `
          bg-gray-900        dark:bg-gray-100
          hover:bg-gray-800  dark:hover:bg-gray-200
          focus:bg-gray-800  dark:focus:bg-gray-200
          active:bg-gray-700 dark:active:bg-gray-300
        `,
      },
      {
        color: "grayscale",
        variant: "secondary",
        class: `
          text-gray-900        border-gray-900        dark:text-gray-100         dark:border-gray-100
          hover:text-gray-800  hover:border-gray-800  dark:hover:text-gray-200   dark:hover:border-gray-200
          focus:text-gray-800  focus:border-gray-800  dark:focus:text-gray-200   dark:focus:border-gray-200
          active:text-gray-700 active:border-gray-700 dark:active:focus-gray-300 dark:active:border-gray-300
        `,
      },
      {
        color: "grayscale",
        variant: "thirdary",
        class: `
          text-gray-900                              dark:text-gray-100
          hover:text-gray-800  hover:bg-gray-800/15  dark:hover:text-gray-200  dark:hover:bg-gray-200/15
          focus:text-gray-800  focus:bg-gray-800/15  dark:focus:text-gray-200  dark:focus:bg-gray-200/15
          active:text-gray-700 active:bg-gray-700/20 dark:active:text-gray-300 dark:active:bg-gray-300/20
        `,
      },
      {
        color: "white",
        class: `
          text-gray-900        dark:text-white
          hover:text-gray-800  dark:hover:text-gray-100
          focus:text-gray-800  dark:focus:text-gray-100
          active:text-gray-700 dark:active:text-gray-200
        `,
      },
      {
        color: "white",
        variant: "primary",
        class: `
          bg-white           dark:text-gray-900
          hover:bg-gray-50   dark:hover:text-gray-800
          focus:bg-gray-50   dark:focus:text-gray-800
          active:bg-gray-100 dark:active:text-gray-700
        `,
      },
      {
        color: "white",
        variant: "secondary",
        class: "border-gray-100 hover:border-gray-200 focus:border-gray-200 active:border-gray-300",
      },
      {
        color: "white",
        variant: "thirdary",
        class: "hover:bg-white/10 focus:bg-white/10 active:bg-white/15",
      },
      { filled: true, variant: "thirdary", class: "bg-{color}-600/10 dark:bg-{color}-400/10" },
      { filled: true, variant: "thirdary", color: ["grayscale", "white"], class: "bg-gray-900/5 dark:bg-gray-200/5" },
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
  loader: "{ULoader}",
  leftIcon: "{UIcon}",
  rightIcon: "{UIcon}",
  centerIcon: "{UIcon}",
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
    noRing: false,
    loading: false,
    disabled: false,
  },
};
