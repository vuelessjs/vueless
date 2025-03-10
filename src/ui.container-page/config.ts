export default /*tw*/ {
  htmlBody: "bg-muted group/body",
  wrapper: {
    base: "min-h-screen UNotifyPage",
    variants: {
      size: {
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
      muted: {
        false: "bg-default",
        true: "bg-muted",
      },
      rounding: {
        relative: "md:relative md:pr-4 md:rounded-r-large",
        fixed: "md:bg-transparent md:relative md:pr-4 md:rounded-r-large",
      },
    },
  },
  page: {
    base: "p-4 md:py-6 md:pl-8 md:pr-8 mx-auto min-h-screen w-full",
    compoundVariants: [{ rounding: ["fixed", "relative"], class: "md:pr-4" }],
  },
  header: "flex items-start justify-between mb-4 md:mb-6",
  headerLeft: "flex items-center gap-4",
  headerLeftFallback: "flex flex-col gap-0.5",
  backLinkWrapper: "flex items-center gap-0.5",
  backLink: "{ULink}",
  backLinkIcon: "{UIcon}",
  title: "{UHeader}",
  description: "mt-1.5 text-large font-normal text-lifted",
  headerRight: "",
  body: "",
  footer: "mb-0 mt-14 justify-between pt-8 md:flex md:items-baseline space-y-4 md:space-y-0 border-t border-muted",
  footerLeft: "md:flex space-y-4 md:space-x-4 md:space-y-0",
  footerRight: "md:flex space-y-4 md:space-x-4 md:space-y-0",
  rightRoundingWrapper: {
    base: "absolute right-4",
    variants: {
      rounding: {
        none: "hidden",
      },
    },
  },
  rightRounding: {
    base: "fixed top-0 w-4 rounded-r-large h-screen",
    variants: {
      muted: {
        false: "bg-default",
        true: "bg-muted",
      },
    },
  },
  defaults: {
    rounding: "none",
    titleSize: "md",
    size: "wide",
    muted: false,
    /* icons */
    backIcon: "arrow_back",
  },
};
