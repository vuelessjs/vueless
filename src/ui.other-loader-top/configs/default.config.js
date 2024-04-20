export default /*tw*/ {
  progress: {
    base: "top-0 left-0 right-0 fixed h-[3px] transition-all ease-linear bg-{color}-500",
    variants: {
      position: {
        fixed: "fixed",
        absolute: "absolute",
      },
      error: {
        true: "bg-red-500",
      },
    },
  },
  progressMobile: "mt-safe-top mx-3 rounded max-w-[calc(100%-1.5rem)]",
  defaultVariants: {
    color: "blue",
    position: "fixed",
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-500` }],
};
