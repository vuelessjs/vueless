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
  firstButton: {
    base: "{UButton} {>paginationButton}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  lastButton: {
    base: "{UButton} {>paginationButton}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  prevButton: {
    base: "{UButton} {>paginationButton}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  nextButton: {
    base: "{UButton} {>paginationButton}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  inactiveButton: {
    base: "{UButton} {>paginationButton}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  activeButton: {
    base: "{UButton} {>paginationButton}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  lastIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  firstIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  prevIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  nextIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
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
