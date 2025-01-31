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
      variant: "thirdary",
      square: true,
    },
  },
  nextIcon: "{UIcon}",
  prevIcon: "{UIcon}",
  defaults: {
    size: "md",
    block: false,
    square: false,
    /* icons */
    nextIcon: "chevron_right",
    prevIcon: "chevron_left",
  },
};
