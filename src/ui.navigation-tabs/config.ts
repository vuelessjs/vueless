export default /*tw*/ {
  wrapper: {
    base: "mb-6 flex gap-1",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
  tabs: {
    base: "flex border-b border-gray-200 dark:border-gray-700",
    variants: {
      scrollable: {
        true: "overflow-hidden flex-nowrap scroll-smooth",
      },
      block: {
        true: "w-full",
      },
    },
  },
  tab: "{UTab}",
  prev: "",
  next: "",
  scrollButton: {
    base: "{UButton}",
    defaults: {
      size: {
        "2xs": "xs",
        xs: "xs",
        sm: "sm",
        md: "sm",
        lg: "md",
        xl: "md",
      },
      variant: "thirdary",
      square: true,
    },
  },
  nextButton: "{>scrollButton}",
  prevButton: "{>scrollButton}",
  defaults: {
    size: "md",
    block: false,
    square: false,
    scrollable: false,
    /* icons */
    nextIcon: "chevron_right",
    prevIcon: "chevron_left",
  },
};
