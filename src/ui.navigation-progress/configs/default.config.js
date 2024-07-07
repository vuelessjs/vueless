export default /*tw*/ {
  wrapper: {
    base: "",
    variants: {
      variant: {
        progress: "w-full h-auto flex flex-col gap-1.5",
        stepper: "flex items-center justify-between",
      },
    },
  },
  stepper: {
    base: "",
    variants: {
      size: {
        "2xs": "h-8 w-8",
        xs: "h-8 w-8",
        sm: "h-10 w-10",
        md: "h-12 w-12",
        lg: "h-14 w-14",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
  },
  stepperRing: "stroke-current text-gray-100",
  stepperCount: "text-xl font-bold text-gray-900 translate-y-2 transform",
  stepperGradient: "",
  stepperSvg: "",
  progress: {
    base: `
      text-{color}-500 w-full block appearance-none border-none overflow-hidden
      indeterminate:relative indeterminate:after:rounded-full
      [&:indeterminate::-webkit-progress-value]:rounded-full [&:indeterminate::-moz-progress-bar]:rounded-full
      [&::-webkit-progress-bar]:w-full [&::-webkit-progress-bar]:rounded-full
      [&::-webkit-progress-bar]:bg-gray-100 [@supports(selector(&::-moz-progress-bar))]:bg-gray-100
      [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full
      [&::-webkit-progress-value]:transition [&::-moz-progress-bar]:transition
      [&::-webkit-progress-value]:bg-current [&::-moz-progress-bar]:bg-current
    `,
    variants: {
      color: {
        white: "text-gray-200",
        grayscale: "text-gray-900",
      },
      size: {
        "2xs": "h-px",
        xs: "h-0.5",
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
        "2xl": "h-5",
      },
    },
  },
  indicator: {
    base: "text-{color}-500 flex justify-end w-full min-w-fit font-medium transition",
    variants: {
      color: {
        white: "text-gray-200",
        grayscale: "text-gray-900",
      },
      size: {
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
    },
  },
  firstStep: "text-gray-500",
  step: {
    base: "text-{color}-500 flex justify-end w-full transition",
    variants: {
      variant: {
        progress: "justify-end",
        stepper: "justify-start",
      },
      color: {
        white: "text-gray-200",
        grayscale: "text-gray-900",
      },
      size: {
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
    },
  },
  defaultVariants: {
    color: "brand",
    size: "md",
    variant: "progress",
    indicator: false,
  },
  safelist: (colors) => [{ pattern: `text-(${colors})-500` }],
};
