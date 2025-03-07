export default /*tw*/ {
  badge: {
    base: "border rounded-medium inline-block py-1 !leading-none outline-hidden",
    variants: {
      variant: {
        solid: "border-transparent text-inverted bg-{color}",
        outlined: "border-{color} text-{color}",
        subtle: "border-{color}/15 text-{color} bg-{color}/5",
        soft: "border-transparent text-{color} bg-{color}/5",
      },
      size: {
        sm: "px-2 text-xsmall",
        md: "px-2.5 text-small",
        lg: "px-3 text-medium",
      },
      round: {
        true: "rounded-full",
      },
      tabindex: {
        true: "cursor-pointer focus-visible:outline-dynamic focus-visible:outline-offset-2 focus-visible:outline-{color}",
      },
    },
  },
  body: {
    base: "flex items-center",
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1",
      },
    },
  },
  badgeIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "3xs",
        md: "2xs",
        lg: "xs",
      },
    },
  },
  centerIcon: "{UIcon} {>badgeIcon}",
  leftIcon: "{UIcon} {>badgeIcon} -ml-0.5",
  rightIcon: "{UIcon} {>badgeIcon} -mr-0.5",
  defaults: {
    color: "primary",
    variant: "solid",
    tabindex: "-1",
    size: "md",
    round: false,
  },
};
