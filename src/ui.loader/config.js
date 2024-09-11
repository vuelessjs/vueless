export default /*tw*/ {
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition duration-500",
    leaveActiveClass: "transition duration-500",
    leaveToClass: "opacity-0",
  },
  loader: {
    base: "relative flex items-center",
    variants: {
      size: {
        sm: "h-1.5 w-9",
        md: "h-2.5 w-[3.625rem]",
        lg: "h-4 w-20",
      },
    },
  },
  ellipse: {
    base: "absolute rounded-full bg-{color}-600 ease-[cubic-bezier(0,1,1,0)]",
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-900",
      },
      size: {
        sm: `
          size-1.5
          [&:nth-child(1)]:left-1
          [&:nth-child(2)]:left-1
          [&:nth-child(3)]:left-4
          [&:nth-child(4)]:left-7
        `,
        md: `
          size-2.5
          [&:nth-child(1)]:left-1.5
          [&:nth-child(2)]:left-1.5
          [&:nth-child(3)]:left-6
          [&:nth-child(4)]:left-[2.625rem]
        `,
        lg: `
          size-4
          [&:nth-child(1)]:left-2
          [&:nth-child(2)]:left-2
          [&:nth-child(3)]:left-8
          [&:nth-child(4)]:left-14
        `,
      },
    },
  },
  defaults: {
    color: "brand",
    size: "md",
    loading: false,
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-600` }],
};
