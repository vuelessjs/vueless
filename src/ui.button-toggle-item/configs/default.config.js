export default /*tw*/ {
  button: {
    base: "",
    variants: {
      separated: {
        false: "rounded-none",
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
      { color: "grayscale", variant: "primary", class: "!bg-gray-700 !border-gray-700" },
      { color: "grayscale", variant: "secondary", class: "!text-gray-700 !border-gray-700 !bg-gray-700 !bg-opacity-15" },
      { color: "grayscale", variant: "thirdary", class: "!text-gray-700 !bg-gray-700" },
      { color: "white", variant: "primary", class: "!text-gray-700 !border-gray-100 !bg-gray-100" },
      { color: "white", variant: "secondary", class: "!text-gray-700 !border-gray-400" },
      { color: "white", variant: "thirdary", class: "!text-gray-700 !bg-white" },
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
