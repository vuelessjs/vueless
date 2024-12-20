export default /*tw*/ {
  pagination: "flex",
  paginationButton: {
    base: "font-normal",
    variants: {
      size: {
        lg: "!text-base",
      },
    },
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  firstButton: "{UButton} {>paginationButton}",
  lastButton: "{UButton} {>paginationButton}",
  prevButton: "{UButton} {>paginationButton}",
  nextButton: "{UButton} {>paginationButton}",
  inactiveButton: "{UButton} {>paginationButton}",
  activeButton: "{UButton} {>paginationButton}",
  paginationIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  lastIcon: "{UIcon} {>paginationIcon}",
  firstIcon: "{UIcon} {>paginationIcon}",
  prevIcon: "{UIcon} {>paginationIcon}",
  nextIcon: "{UIcon} {>paginationIcon}",
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
