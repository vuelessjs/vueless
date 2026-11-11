export default /*tw*/ {
  wrapper: {
    base: "whitespace-nowrap flex items-center",
    variants: {
      variant: {
        default: "text-{color}",
        lifted: "text-{color}-lifted",
        accented: "text-{color}-accented",
        muted: "text-{color}/(--vl-disabled-opacity)",
        inverted: "text-{color} brightness-125 dark:brightness-75",
      },
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
    compoundVariants: [
      { color: "text", variant: "default", class: "text-default" },
      { color: "text", variant: "lifted", class: "text-lifted" },
      { color: "text", variant: "accented", class: "text-accented" },
      { color: "text", variant: "muted", class: "text-muted" },
      { color: "text", variant: "inverted", class: "text-inverted brightness-100 dark:brightness-100" },
    ],
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
    color: "text",
    variant: "default",
    size: "md",
    sign: "auto",
    align: "left",
    currencyAlign: "right",
    currencySpace: false,
    raw: false,
    minFractionDigits: 0,
    maxFractionDigits: 2,
    decimalSeparator: ",",
    thousandsSeparator: " ",
  },
};
