export default /*tw*/ {
  button: {
    base: "",
    variants: {
      separated: {
        false: "!rounded-none",
      },
    },
  },
  input: "p-0 m-0 size-0 invisible absolute",
  selected: {
    base: "",
    variants: {
      variant: {
        primary: "!bg-{color}-800 !border-{color}-800",
        secondary: "!text-{color}-800 !border-{color}-800 bg-{color}-800 bg-opacity-10",
        thirdary: "!text-{color}-800 !bg-{color}-800 !bg-opacity-10",
      },
    },
    compoundVariants: [
      { color: "grayscale", variant: "primary", class: "!bg-brand-700 !border-brand-700" },
      { color: "grayscale", variant: "secondary", class: "!text-brand-700 !border-brand-700 !bg-brand-50 !bg-opacity-100" },
      { color: "grayscale", variant: "thirdary", class: "!text-brand-700 !bg-brand-50" },
      { color: "white", variant: "primary", class: "!text-brand-700 !border-brand-600 !bg-brand-50" },
      { color: "white", variant: "secondary", class: "!text-brand-700 !border-brand-600 !bg-brand-50" },
      { color: "white", variant: "thirdary", class: "!text-brand-700 !bg-brand-50" },
    ],
  },
  defaultVariants: {
    color: "brand",
    variant: "primary",
    type: "radio",
    size: "md",
    block: false,
    pill: false,
    square: false,
    filled: false,
    disabled: false,
  },
};
