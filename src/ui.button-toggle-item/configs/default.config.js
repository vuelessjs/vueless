export default /*tw*/ {
  toggleButton: {
    component: "{UButton}",
    base: `
      border-gray-300 font-normal
      hover:text-brand-600 hover:border-brand-600 hover:relative hover:z-10
      focus:text-brand-600 focus:border-brand-600 focus:relative focus:z-10 focus:ring-brand-700/15 focus-within:ring-brand-700/15
      active:text-brand-700 active:border-brand-700 active:relative active:z-10
      disabled:z-0
    `,
    variants: {
      separated: {
        false: "rounded-none",
      },
      variant: {
        thirdary: `
          !text-gray-900 !border-transparent bg-brand-600/10
          hover:bg-brand-600/15 focus:bg-brand-600/15 active:bg-brand-600/20
        `,
      },
    },
    compoundVariants: [
      {
        selected: true,
        class: "relative disabled:z-10",
      },
      {
        selected: true,
        variant: "primary",
        class: "!text-white bg-brand-600 border-brand-600 ",
      },
      {
        selected: true,
        variant: "secondary",
        class: "text-brand-600 border-brand-600  bg-brand-600/10",
      },
      {
        selected: true,
        variant: "thirdary",
        class: "!bg-brand-600/20",
      },
    ],
  },
  toggleInput: "p-0 m-0 size-0 invisible absolute",
  defaults: {
    variant: "primary",
    type: "radio",
    size: "md",
    block: false,
    round: false,
    square: false,
    disabled: false,
  },
};
