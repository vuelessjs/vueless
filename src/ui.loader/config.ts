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
    base: "absolute rounded-full bg-{color} ease-[cubic-bezier(0,1,1,0)] vueless-loader-ellipse",
    variants: {
      color: {
        white: "bg-default",
        black: "bg-gray-900",
        grayscale: "bg-gray-900 dark:bg-default",
        inherit: "bg-current",
      },
      size: {
        sm: `
          size-1.5
          [&:nth-child(1)]:left-1
          [&:nth-child(2)]:left-1
          [&:nth-child(3)]:left-4
          [&:nth-child(4)]:left-7
          vueless-loader-ellipse-sm
        `,
        md: `
          size-2.5
          [&:nth-child(1)]:left-1.5
          [&:nth-child(2)]:left-1.5
          [&:nth-child(3)]:left-6
          [&:nth-child(4)]:left-[2.625rem]
          vueless-loader-ellipse-md
        `,
        lg: `
          size-4
          [&:nth-child(1)]:left-2
          [&:nth-child(2)]:left-2
          [&:nth-child(3)]:left-8
          [&:nth-child(4)]:left-14
          vueless-loader-ellipse-lg
        `,
      },
    },
  },
  defaults: {
    color: "primary",
    size: "md",
    loading: false,
  },
};
