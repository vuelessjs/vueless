export default /*tw*/ {
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
  defaultVariants: {
    color: "green",
    size: "md",
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-200` }, { pattern: `text-(${colors})-500` }],
};
