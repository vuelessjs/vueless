export default /*tw*/ {
  wrapper: {
    base: "p-4 flex flex-col rounded-lg",
    variants: {
      variant: {
        primary: `bg-{color}-500 text-white`,
        secondary: `bg-transparent border border-{color}-500`,
        thirdary: `bg-{color}-50 text-{color}-700`,
      },
    },
    compoundVariants: [
      { color: "grayscale", bordered: true, class: "border-gray-200" },
      { variant: "thirdary", bordered: true, class: "border border-{color}-100" },
    ],
  },
  body: {
    base: `
      flex gap-2 items-baseline
      font-normal leading-normal
      [&_b]:font-bold [&_i]:italic [&_p]:font-normal
      [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4
      [&_a:not([class]):hover]:no-underline [&_a:not([class])]:font-bold
      [&_ul]:font-normal [&_ol]:font-normal
      [&_ul]:leading-normal [&_ol]:leading-normal
      [&_ul]:list-disc [&_ol]:list-decimal
      [&_ul]:ml-2 [&_ol]:ml-2
    `,
    variants: {
      size: {
        xs: "text-xs space-y-2",
        sm: "text-sm space-y-3",
        md: "text-base space-y-4",
        lg: "text-lg space-y-5",
      },
    },
  },
  title: "font-bold text-lg leading-tight",
  description: "text-sm",
  button: "",
  icon: "",
  iconName: "close",
  defaultVariants: {
    variant: "thirdary",
    color: "brand",
    size: "md",
    timeout: 0,
    html: undefined,
    bordered: false,
    closable: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-50` },
    { pattern: `bg-(${colors})-500` },
    { pattern: `text-(${colors})-700` },
    { pattern: `border-(${colors})-100` },
    { pattern: `border-(${colors})-500` },
  ],
};
