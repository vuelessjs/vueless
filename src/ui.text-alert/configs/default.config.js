export default /*tw*/ {
  wrapper: {
    base: "p-4 flex flex-col rounded-lg",
    variants: {
      variant: {
        primary: `bg-{color}-500 text-white`,
        secondary: `bg-transparent border border-{color}-500 text-{color}-500`,
        thirdary: `bg-{color}-50 text-{color}-700`,
      },
    },
    compoundVariants: [
      { color: "white", class: "text-black" },
      { variant: "thirdary", bordered: true, class: "border border-{color}-100" },
    ],
  },
  body: {
    base: `
      flex gap-2 items-baseline
      font-normal leading-normal
      [&_b]:font-bold [&_i]:italic [&_em]:italic [&_p]:font-normal
      [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4
      [&_a:not([class]):hover]:no-underline [&_a:not([class])]:font-bold
      [&_ul]:font-normal [&_ol]:font-normal
      [&_ul]:leading-normal [&_ol]:leading-normal
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
  title: {
    base: "font-bold leading-tight",
    compoundVariants: [
      { size: "xs", class: "text-sm" },
      { size: "sm", class: "text-base" },
      { size: "md", class: "text-lg" },
      { size: "lg", class: "text-xl" },
    ],
  },
  description: {
    compoundVariants: [
      { size: "xs", class: "text-xs" },
      { size: "sm", class: "text-xs" },
      { size: "md", class: "text-sm" },
      { size: "lg", class: "text-base" },
    ],
  },
  button: "{UButton}",
  icon: "{UIcon}",
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
    { pattern: `text-(${colors})-500` },
    { pattern: `text-(${colors})-700` },
    { pattern: `border-(${colors})-100` },
    { pattern: `border-(${colors})-500` },
  ],
};
