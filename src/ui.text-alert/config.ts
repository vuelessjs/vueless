export default /*tw*/ {
  wrapper: {
    base: "border p-4 flex flex-col rounded-medium",
    variants: {
      variant: {
        primary: "bg-{color} text-white border-transparent",
        secondary: "border-{color} text-{color}",
        thirdary: "bg-{color}-50 text-{color} border-transparent",
      },
      size: {
        xs: "text-xsmall",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
    compoundVariants: [
      { variant: "ghost", bordered: true, class: "border-{color}-100" },
      { color: "white", variant: "solid", class: "text-gray-900 bg-default" },
      { color: "white", variant: "outlined", class: "text-gray-900 border-gray-200" },
      { color: "white", variant: "ghost", class: "text-gray-900 bg-default" },
      { color: "white", variant: "ghost", bordered: true, class: "border-gray-200" },
      { color: "grayscale", variant: "solid", class: "bg-gray-900" },
      { color: "grayscale", variant: "outlined", class: "text-gray-900 border-gray-900" },
      { color: "grayscale", variant: "ghost", class: "text-gray-900 bg-gray-50" },
      { color: "grayscale", variant: "ghost", bordered: true, class: "border-gray-200" },
      { color: "gray", variant: "solid", class: "bg-gray-500" },
      { color: "gray", variant: "outlined", class: "text-gray-500 border-gray-500" },
      { color: "gray", variant: "ghost", class: "text-gray-500 bg-gray-50" },
      { color: "gray", variant: "ghost", bordered: true, class: "border-gray-500" },
    ],
  },
  body: "flex items-start justify-between",
  contentWrapper: "flex gap-2",
  content: "",
  title: {
    base: "font-bold leading-tight",
    variants: {
      size: {
        xs: "text-small",
        sm: "text-medium",
        md: "text-large",
        lg: "text-lg",
      },
    },
  },
  description: "",
  text: {
    base: "{UText}",
    defaults: {
      size: {
        xs: "sm",
        sm: "sm",
        md: "md",
        lg: "lg",
      },
    },
  },
  closeButton: "{UButton}",
  closeIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        xs: "3xs",
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  defaults: {
    variant: "solid",
    color: "primary",
    size: "md",
    timeout: 0,
    bordered: false,
    closable: false,
    /* icons */
    closeIcon: "close",
  },
};
