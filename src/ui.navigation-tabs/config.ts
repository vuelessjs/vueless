export default /*tw*/ {
  wrapper: "mb-6 flex gap-1",
  tabs: {
    base: "flex flex-nowrap border-b border-gray-200 dark:border-gray-700",
    variants: {
      block: {
        true: "w-full",
      },
      scrollable: {
        true: "overflow-hidden scroll-smooth",
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
    /* icons */
    nextIcon: "chevron_right",
    prevIcon: "chevron_left",
  },
};
