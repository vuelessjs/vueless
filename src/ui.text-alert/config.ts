export default /*tw*/ {
  wrapper: {
    base: "border p-4 flex flex-col rounded-dynamic",
    variants: {
      variant: {
        primary: "bg-{color}-600 text-white border-transparent",
        secondary: "border-{color}-600 text-{color}-600",
        thirdary: "bg-{color}-50 text-{color}-600 border-transparent",
      },
      size: {
        xs: "text-2xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    compoundVariants: [
      { variant: "thirdary", bordered: true, class: "border-{color}-100" },
      { color: "white", variant: "primary", class: "text-gray-900 bg-white" },
      { color: "white", variant: "secondary", class: "text-gray-900 border-gray-200" },
      { color: "white", variant: "thirdary", class: "text-gray-900 bg-white" },
      { color: "white", variant: "thirdary", bordered: true, class: "border-gray-200" },
      { color: "grayscale", variant: "primary", class: "bg-gray-900" },
      { color: "grayscale", variant: "secondary", class: "text-gray-900 border-gray-900" },
      { color: "grayscale", variant: "thirdary", class: "text-gray-900 bg-gray-50" },
      { color: "grayscale", variant: "thirdary", bordered: true, class: "border-gray-200" },
      { color: "gray", variant: "primary", class: "bg-gray-500" },
      { color: "gray", variant: "secondary", class: "text-gray-500 border-gray-500" },
      { color: "gray", variant: "thirdary", class: "text-gray-500 bg-gray-50" },
      { color: "gray", variant: "thirdary", bordered: true, class: "border-gray-500" },
    ],
  },
  body: "flex items-start justify-between",
  contentWrapper: "flex gap-2",
  content: "",
  title: {
    base: "font-bold leading-tight",
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
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
    variant: "primary",
    color: "brand",
    size: "md",
    timeout: 0,
    bordered: false,
    closable: false,
    /* icons */
    closeIcon: "close",
  },
};
