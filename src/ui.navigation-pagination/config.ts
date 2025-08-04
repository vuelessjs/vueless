export default /*tw*/ {
  pagination: "flex",
  paginationButton: {
    base: "{UButton} font-normal",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
    defaults: {
      size: "xs",
    },
  },
  firstButton: "{>paginationButton}",
  lastButton: "{>paginationButton}",
  prevButton: "{>paginationButton}",
  nextButton: "{>paginationButton}",
  inactiveButton: "{>paginationButton}",
  activeButton: "{>paginationButton}",
  ellipsis: "{>paginationButton} {>inactiveButton}",
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
  lastIcon: "{>paginationIcon}",
  firstIcon: "{>paginationIcon}",
  prevIcon: "{>paginationIcon}",
  nextIcon: "{>paginationIcon}",
  defaults: {
    variant: "solid",
    size: "md",
    limit: 5,
    perPage: 20,
    disabled: false,
    ellipsis: true,
    showFirst: true,
    showLast: true,
    /* icons */
    firstIcon: "first_page",
    lastIcon: "last_page",
    nextIcon: "chevron_right",
    prevIcon: "chevron_left",
  },
};
