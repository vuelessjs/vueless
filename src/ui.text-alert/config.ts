export default /*tw*/ {
  wrapper: {
    base: "p-4 border-box flex flex-col border rounded-medium",
    variants: {
      variant: {
        solid: "text-inverted bg-{color} border-transparent",
        outlined: "text-{color} border-{color}",
        subtle: "text-{color} bg-{color}/10 border-{color}/15",
        soft: "text-{color} bg-{color}/10 border-transparent",
      },
      size: {
        xs: "text-tiny",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  body: "flex items-center justify-between",
  contentWrapper: "flex gap-2",
  content: "",
  title: "font-semibold leading-tight",
  description: "mt-0.5",
  text: "{UText}",
  closeButton: "{UButton}",
  icon: {
    base: "{UIcon}",
    variants: {
      variant: {
        solid: "text-inverted",
      },
    },
    defaults: {
      size: {
        xs: "3xs",
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  closeIcon: "{>icon}",
  alertIcon: "{>icon}",
  defaults: {
    variant: "subtle",
    color: "primary",
    size: "md",
    timeout: 0,
    closable: false,
    /* icons */
    alertIcon: "priority_high",
    closeIcon: "close",
  },
};
