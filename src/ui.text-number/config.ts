export default /*tw*/ {
  wrapper: {
    base: "whitespace-nowrap flex items-center text-{color}",
    variants: {
      size: {
        xs: "text-tiny",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      align: {
        left: "justify-start",
        right: "justify-end",
      },
    },
  },
  number: "",
  currency: {
    compoundVariants: [
      { currencySpace: true, currencyAlign: "left", class: "mr-1" },
      { currencySpace: true, currencyAlign: "right", class: "ml-1" },
    ],
  },
  mathSign: "",
  integer: "",
  fraction: "",
  defaults: {
    color: "grayscale",
    size: "md",
    sign: "auto",
    align: "left",
    currencyAlign: "right",
    currencySpace: false,
    minFractionDigits: 0,
    maxFractionDigits: 2,
    decimalSeparator: ",",
    thousandsSeparator: " ",
  },
};
