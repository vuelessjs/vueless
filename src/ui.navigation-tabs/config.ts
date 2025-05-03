export default /*tw*/ {
  wrapper: "mb-6 flex gap-1 w-full",
  tabs: {
    base: "flex border-b border-default w-full",
    variants: {
      scrollable: {
        true: "overflow-hidden flex-nowrap scroll-smooth",
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
      variant: "ghost",
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
