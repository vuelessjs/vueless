export default /*tw*/ {
  htmlBody: "bg-gray-50 group/body-gray",
  wrapperMobile: "overflow-x-hidden mb-[theme('spacing.mobile-menu-height')]",
  wrapper: {
    base: "min-h-screen UNotifyPage",
    variants: {
      width: {
        xs: "md:w-[25rem] md:max-[500px]:!w-full",
        sm: "md:w-[31.25rem] md:max-[600px]:!w-full",
        md: "md:w-[37.5rem] md:max-[700px]:!w-full",
        lg: "md:w-[43.75rem] md:max-[800px]:!w-full",
        xl: "md:w-[50rem] md:max-[900px]:!w-full",
        "2xl": "md:w-[56.25rem] md:max-[1000px]:!w-full",
        "3xl": "md:w-[62.5rem] md:max-[1100px]:!w-full",
        "4xl": "md:w-[68.75rem] md:max-[1200px]:!w-full",
        "5xl": "md:w-[75rem] md:max-[1300px]:!w-full",
        wide: "md:w-full",
      },
      fixedRounding: {
        true: "relative pr-0 md:pr-4 md:rounded-none",
        false: "md:rounded-r-2xl",
      },
    },
  },
  page: {
    base: "p-4 md:py-6 md:pl-8 mx-auto min-h-screen w-full",
    variants: {
      gray: {
        false: "bg-white",
        true: "bg-gray-50",
      },
      fixedRounding: {
        true: "md:pr-4",
        false: "md:pr-8",
      },
    },
  },
  header: "flex items-start justify-between mb-4 md:mb-6",
  headerLeft: "flex items-center space-x-4",
  headerLeftFallback: "flex flex-col",
  backLink: "flex items-center gap-0.5",
  backLinkIcon: "",
  backLinkIconName: "arrow_back",
  title: "",
  description: "mt-1.5 text-base font-normal text-gray-600",
  headerRight: "",
  footer: `mb-0 mt-14 justify-between pt-8 md:flex md:items-baseline space-y-4 md:space-y-0 border-t border-gray-200`,
  footerLeft: "md:flex space-y-4 md:space-x-4 md:space-y-0",
  footerRight: `
    md:flex space-y-4 md:space-x-4 md:space-y-0 group-[]/reversed-footer:flex
    group-[]/reversed-footer:flex-col-reverse group-[]/reversed-footer:space-y-reverse
  `,
  footerMobileReverse: "flex flex-col-reverse space-y-reverse group/reversed-footer",
  rightRoundingWrapper: "absolute right-4",
  rightRounding: {
    base: "fixed top-0 w-4 rounded-r-2xl bg-white h-screen",
    variants: {
      gray: {
        false: "bg-white",
        true: "bg-gray-50",
      },
    },
  },
  defaultVariants: {
    titleSize: "lg",
    width: "wide",
    gray: false,
    fixedRounding: false,
    mobileFooterReverse: false,
  },
};
