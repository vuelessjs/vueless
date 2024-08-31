export default /*tw*/ {
  pagination: "flex",
  paginationButton: {
    base: "font-normal",
    variants: {
      size: {
        lg: "!text-base",
      },
    },
  },
  firstButton: "{UButton}",
  lastButton: "{UButton}",
  prevButton: "{UButton}",
  nextButton: "{UButton}",
  inactiveButton: "{UButton}",
  activeButton: "{UButton}",
  lastIcon: "{UIcon}",
  firstIcon: "{UIcon}",
  prevIcon: "{UIcon}",
  nextIcon: "{UIcon}",
  defaults: {
    variant: "primary",
    size: "md",
    limit: 5,
    perPage: 20,
    disabled: false,
    ellipsis: true,
    showFirst: false,
    showLast: false,
    /* icons */
    firstIcon: "first_page",
    lastIcon: "last_page",
    nextIcon: "chevron_right",
    prevIcon: "chevron_left",
  },
};
