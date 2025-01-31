export default /*tw*/ {
  wrapper: "mb-6 flex",
  tabs: {
    base: "flex flex-nowrap border-b border-gray-200 dark:border-gray-700 overflow-hidden scroll-smooth",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
  tab: "{UTab}",
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
  scrollIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        "2xs": "xs",
        xs: "xs",
        sm: "sm",
        md: "sm",
        lg: "md",
        xl: "md",
      },
    },
  },
  nextIcon: "{>scrollIcon}",
  prevIcon: "{>scrollIcon}",
  defaults: {
    size: "md",
    block: false,
    square: false,
    /* icons */
    nextIcon: "chevron_right",
    prevIcon: "chevron_left",
  },
};
