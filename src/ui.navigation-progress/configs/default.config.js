export default /*tw*/ {
  wrapper: "h-auto flex flex-col gap-1.5 w-full",
  progress: {
    base: `
      block appearance-none border-none overflow-hidden w-full
      [&::-webkit-progress-bar]:w-full h-2 rounded-full [&::-webkit-progress-bar]:rounded-full
      [&::-webkit-progress-bar]:bg-{color}-200 [@supports(selector(&::-moz-progress-bar))]:bg-{color}-200
      [&::-webkit-progress-value]:rounded-full  [&::-webkit-progress-value]:transition-all
      [&::-webkit-progress-value]:ease-in-out [&::-moz-progress-bar]:rounded-full text-{color}-500
      [&::-webkit-progress-value]:bg-current [&::-moz-progress-bar]:bg-current indeterminate:relative
      indeterminate:after:rounded-full [&:indeterminate::-webkit-progress-value]:rounded-full
      [&:indeterminate::-moz-progress-bar]:rounded-full
    `,
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-900",
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
    base: "w-full flex justify-end font-medium text-brand-500 min-w-fit",
    variants: {
      color: {
        white: "text-white",
        grayscale: "text-gray-900",
      },
      size: {
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
    base: "flex w-full justify-end text-brand-500",
    variants: {
      size: {
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
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-200` }, { pattern: `text-(${colors})-500` }],
};
