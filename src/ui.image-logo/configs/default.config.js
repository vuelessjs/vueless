export default /*tw*/ {
  wrapper: "flex items-center",
  logo: {
    base: "relative",
    variants: {
      size: {
        "2xs": "size-3.5",
        xs: "size-4",
        sm: "size-5",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
        "2xl": "size-12",
        "3xl": "size-14",
      },
    },
  },
  label: "bg-red-500 text-xs font-medium text-white rounded-full absolute -right-7 -top-1.5 px-2 py-0.5",
  image: "h-full w-full bg-contain bg-center bg-no-repeat",
  title: {
    base: "whitespace-nowrap px-3.5 font-bold text-gray-900",
    variants: {
      size: {
        "2xs": "text-xs",
        xs: "text-sm",
        sm: "text-base",
        md: "text-lg",
        lg: "text-2xl",
        xl: "text-3xl",
        "2xl": "text-4xl",
      },
    },
  },
  defaultVariants: {
    size: "md",
    titleSize: "md",
  },
};
