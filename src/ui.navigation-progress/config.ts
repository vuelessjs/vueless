export default /*tw*/ {
  wrapper: {
    base: "",
    variants: {
      variant: {
        progress: "w-full h-auto flex flex-col gap-1.5",
        stepper: "flex items-center justify-between gap-4",
      },
    },
  },
  stepper: {
    base: "shrink-0 grow-0",
    variants: {
      size: {
        "2xs": "size-6",
        xs: "size-8",
        sm: "size-10",
        md: "size-12",
        lg: "size-14",
        xl: "size-16",
        "2xl": "size-20",
      },
    },
  },
  stepperSvg: "",
  stepperGradient: "",
  stepperCircle: {
    base: "stroke-{color}-100 text-{color}-100",
    variants: {
      color: {
        grayscale: "stroke-gray-100",
      },
    },
  },
  stepperCount: "text-md font-bold text-gray-900 translate-y-2 transform",
  indicator: {
    base: "text-{color}-600 flex justify-end w-full min-w-fit font-medium transition",
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
  progress: {
    base: `
      text-{color}-600 w-full block appearance-none border-none overflow-hidden
      indeterminate:relative indeterminate:after:rounded-full
      [&:indeterminate::-webkit-progress-value]:rounded-full [&:indeterminate::-moz-progress-bar]:rounded-full
      [&::-webkit-progress-bar]:w-full [&::-webkit-progress-bar]:rounded-full
      [&::-webkit-progress-bar]:bg-{color}-50 [@supports(selector(&::-moz-progress-bar))]:bg-{color}-50
      [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full
      [&::-webkit-progress-value]:transition [&::-moz-progress-bar]:transition
      [&::-webkit-progress-value]:bg-current [&::-moz-progress-bar]:bg-current
    `,
    variants: {
      color: {
        white: "text-gray-300 [&::-webkit-progress-bar]:bg-gray-100 [@supports(selector(&::-moz-progress-bar))]:bg-gray-100",
        grayscale: "text-gray-900 [&::-webkit-progress-bar]:bg-gray-100 [@supports(selector(&::-moz-progress-bar))]:bg-gray-100",
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
  step: {
    base: "text-{color}-600 flex justify-end w-full transition",
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
      value: {
        false: "text-gray-500",
      },
    },
  },
  defaults: {
    max: 100,
    color: "brand",
    size: "md",
    variant: "progress",
    indicator: false,
  },
};
