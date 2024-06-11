export default /*tw*/ {
  button: {
    base: `
      border-gray-300 font-normal
      hover:text-brand-600 hover:border-brand-600 hover:relative hover:z-10
      focus:text-brand-600 focus:border-brand-600 focus:relative focus:z-10 focus:ring-brand-600 focus-within:ring-brand-600
      active:text-brand-700 active:border-brand-700 active:relative active:z-10
      disabled:border-brand-300 disabled:z-0
    `,
    variants: {
      separated: {
        false: "rounded-none",
      },
      variant: {
        thirdary: "border-none hover:bg-brand-600 hover:bg-opacity-5",
      },
    },
  },
  input: "p-0 m-0 size-0 invisible absolute",
  selected: {
    base: "relative disabled:z-10",
    variants: {
      variant: {
        primary: "!text-white bg-brand-600 border-brand-600 disabled:border-brand-600",
        secondary: "text-brand-600 border-brand-600 disabled:border-brand-600 bg-brand-600 bg-opacity-10",
        thirdary: "text-brand-600 bg-brand-600 bg-opacity-10",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    type: "radio",
    size: "md",
    block: false,
    pill: false,
    square: false,
    disabled: false,
  },
};
