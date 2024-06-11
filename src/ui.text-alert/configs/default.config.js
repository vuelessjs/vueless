export default /*tw*/ {
  wrapper: {
    base: "p-4 space-x-4 flex justify-start items-start rounded-lg bg-{color}-50 text-{color}-700",
    variants: {
      variant: {
        primary: `
          text-black
          bg-{color}-600 border-{color}-600
          hover:bg-{color}-700 hover:border-{color}-700
          focus:bg-{color}-700 focus:border-{color}-700
          active:bg-{color}-800 active:border-{color}-800
          disabled:bg-{color}-300 disabled:border-{color}-300 disabled:text-white
        `,
        secondary: `
          text-{color}-600 border-{color}-600
          hover:text-{color}-700 hover:border-{color}-700
          focus:text-{color}-700 focus:border-{color}-700
          active:text-{color}-800 active:border-{color}-800
          disabled:text-{color}-300 disabled:border-{color}-300
        `,
        thirdary: `
          border-transparent
          text-{color}-600
          hover:text-{color}-700 hover:bg-{color}-700 hover:bg-opacity-10
          focus:text-{color}-700 focus:bg-{color}-700 focus:bg-opacity-10
          active:text-{color}-800 active:bg-{color}-800 active:bg-opacity-15
          disabled:text-{color}-300
        `,
      },
      bordered: {
        true: "border border-{color}-100",
      },
    },
    compoundVariants: [
      { color: "grayscale", bordered: true, class: "border-gray-200" },
      { variant: "thirdary", bordered: true, class: "border-{color}-100" },
    ],
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
  title: "font-bold text-lg leading-tight",
  description: "text-sm",
  button: "",
  icon: "",
  iconName: "close",
  defaultVariants: {
    color: "grayscale",
    size: "md",
    timeout: 0,
    html: undefined,
    bordered: false,
    closable: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-50` },
    { pattern: `text-(${colors})-700` },
    { pattern: `border-(${colors})-100` },
    { pattern: `bg-(${colors})-100` },
    { pattern: `text-(${colors})-800` },
  ],
};
