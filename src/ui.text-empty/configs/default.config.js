export default /*ui*/ {
  wrapper: "flex flex-col items-center w-full bg-center",
  header: "mb-4 flex justify-center",
  footer: "mt-4 flex justify-center",
  title: {
    base: "mb-2 font-medium text-center",
    variants: {
      size: {
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
      },
    },
  },
  description: {
    base: "text-center",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
};
