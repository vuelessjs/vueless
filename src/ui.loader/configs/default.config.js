export default /*tw*/ {
  loader: {
    base: "relative mx-1 flex h-4 items-center",
    variants: {
      size: {
        sm: "w-9",
        md: "w-[3.625rem]",
        lg: "w-20",
      },
    },
  },
  ellipse: {
    base: `absolute rounded-full bg-{color}-500 ease-[cubic-bezier(0,1,1,0)]`,
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-900",
      },
      size: {
        sm: `
            h-1.5 w-1.5
            [&:nth-child(1)]:left-1
            [&:nth-child(4)]:left-7
          `,
        md: `
            h-2.5 w-2.5
            [&:nth-child(1)]:left-1.5
            [&:nth-child(2)]:left-1.5
            [&:nth-child(3)]:left-6
            [&:nth-child(4)]:left-[2.625rem]
          `,
        lg: `
            h-4 w-4
            [&:nth-child(1)]:left-2
            [&:nth-child(2)]:left-2
            [&:nth-child(3)]:left-8
            [&:nth-child(4)]:left-14
          `,
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "brand",
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-500` }],
};
