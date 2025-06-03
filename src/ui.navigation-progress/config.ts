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
  indicator: "text-{color} flex justify-end w-full min-w-fit text-medium font-medium transition",
  progress: {
    base: `
      text-{color} w-full block appearance-none border-none overflow-hidden
      indeterminate:relative indeterminate:after:rounded-full
      [&:indeterminate::-webkit-progress-value]:rounded-full [&:indeterminate::-moz-progress-bar]:rounded-full
      [&::-webkit-progress-bar]:w-full [&::-webkit-progress-bar]:rounded-full
      [&::-webkit-progress-bar]:bg-{color}/10 [@supports(selector(&::-moz-progress-bar))]:bg-{color}/10
      [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full
      [&::-webkit-progress-value]:transition [&::-moz-progress-bar]:transition
      [&::-webkit-progress-value]:bg-current [&::-moz-progress-bar]:bg-current
    `,
    variants: {
      size: {
        xs: "h-0.5",
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
  },
  step: {
    base: "text-{color} text-medium flex justify-end w-full transition",
    variants: {
      variant: {
        progress: "justify-end",
        stepper: "justify-start",
      },
      value: {
        false: "text-lifted",
      },
    },
  },
  stepper: {
    base: "shrink-0 grow-0",
    variants: {
      size: {
        xs: "size-8",
        sm: "size-10",
        md: "size-12",
        lg: "size-14",
        xl: "size-16",
      },
    },
  },
  stepperSvg: "",
  stepperGradient: "",
  stepperCircle: "stroke-{color}/10 text-{color}/10",
  stepperCount: "text-medium fill-(--vl-text) font-bold translate-y-2 transform",
  header: {
    base: "{UHeader}",
    defaults: {
      size: {
        xs: "xs",
        sm: "sm",
        md: "sm",
        lg: "lg",
        xl: "xl",
      },
    },
  },
  defaults: {
    max: 100,
    color: "primary",
    size: "md",
    variant: "progress",
    indicator: false,
  },
};
