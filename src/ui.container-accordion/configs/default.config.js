export default /*tw*/ {
  wrapper: {
    base: "group cursor-pointer [&:not(:first-child)]:pt-6",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  info: "leading-6",
  title: "flex items-center justify-between font-medium text-gray-800",
  description: {
    base: "text-gray-600 leading-normal h-0 overflow-hidden opacity-0",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      isOpened: {
        true: "h-full pt-3 opacity-100 transition-all",
      },
    },
  },
  icon: "",
  expandIconName: "add",
  collapseIconName: "remove",
  separator: "mt-2 h-px w-full lg:mt-6 bg-gray-100 mt-2.5 group-last:hidden",
  defaultVariants: {
    size: "md",
  },
};
