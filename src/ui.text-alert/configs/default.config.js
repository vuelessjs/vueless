export default /*tw*/ {
  wrapper: {
    base: "p-4 space-x-4 flex justify-between items-start rounded-lg bg-{color}-50 text-{color}-700",
    variants: {
      color: {
        grayscale: "bg-gray-100 text-gray-900",
      },
      bordered: {
        true: "border border-{color}-100",
      },
    },
    compoundVariants: [{ color: "grayscale", bordered: true, class: "border-gray-200" }],
  },
  body: {
    base: `
      space-y-4 font-normal leading-normal
      [&_b]:font-bold [&_i]:italic [&_p]:font-normal
      [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4
      [&_a:not([class]):hover]:no-underline [&_a:not([class])]:font-bold
      [&_ul]:font-normal [&_ol]:font-normal
      [&_ul]:leading-[1.125rem] [&_ol]:leading-[1.125rem]
      [&_ul]:list-inside [&_ol]:list-inside
      [&_ul]:list-disc [&_ol]:list-decimal
      [&_ul]:ml-2 [&_ol]:ml-2
    `,
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  button: "",
  icon: "",
  iconName: "close",
  defaultVariants: {
    color: "grayscale",
    size: "md",
    timeout: 0,
    html: undefined,
    bordered: false,
    closeIcon: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-50` },
    { pattern: `text-(${colors})-700` },
    { pattern: `border-(${colors})-100` },
  ],
};
