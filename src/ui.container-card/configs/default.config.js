export default /*tw*/ {
  wrapper: {
    base: "border rounded-dynamic border-gray-200 bg-white space-y-4 md:space-y-6 w-full",
    variants: {
      padding: {
        sm: "p-2 md:p-4",
        md: "p-4 md:p-6",
        lg: "p-6 md:p-8",
      },
    },
  },
  header: "flex justify-between",
  headerLeft: "flex items-center space-x-4 w-full",
  headerLeftFallback: "flex flex-col w-full",
  title: "{UHeader}",
  description: "mt-1.5 text-base font-normal text-gray-500",
  content: "",
  divider: "{UDivider}",
  footer: "flex justify-between",
  footerMobileReverse: "flex flex-col-reverse space-y-reverse",
  defaultVariants: {
    padding: "md",
    mobileFooterReverse: false,
  },
};
