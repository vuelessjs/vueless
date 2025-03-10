export default /*tw*/ {
  wrapper: {
    base: "p-4 flex flex-col rounded-medium",
    variants: {
      variant: {
        solid: "text-inverted bg-{color}",
        outlined: "text-{color} border-{color}",
        subtle: "text-{color} bg-{color}/5 border-{color}/15",
        soft: "text-{color} bg-{color}/5",
      },
      size: {
        xs: "text-xsmall",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  body: "flex items-start justify-between",
  contentWrapper: "flex gap-2",
  content: "",
  title: {
    base: "font-bold leading-tight",
    variants: {
      size: {
        xs: "text-small",
        sm: "text-medium",
        md: "text-large",
        lg: "text-lg",
      },
    },
  },
  description: "",
  text: {
    base: "{UText}",
    defaults: {
      size: {
        xs: "sm",
        sm: "sm",
        md: "md",
        lg: "lg",
      },
    },
  },
  closeButton: "{UButton}",
  closeIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        xs: "3xs",
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  defaults: {
    variant: "solid",
    color: "primary",
    size: "md",
    timeout: 0,
    closable: false,
    /* icons */
    closeIcon: "close",
  },
};
