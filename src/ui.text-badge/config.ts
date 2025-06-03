export default /*tw*/ {
  badge: {
    base: `
      inline-flex items-center justify-between py-1
      border rounded-medium !leading-none outline-hidden
    `,
    variants: {
      variant: {
        solid: "border-transparent text-inverted bg-{color}",
        outlined: "border-{color} text-{color}",
        subtle: "border-{color}/15 text-{color} bg-{color}/10",
        soft: "border-transparent text-{color} bg-{color}/10",
      },
      size: {
        sm: "gap-0.5 px-2 text-tiny",
        md: "gap-1 px-2.5 text-small",
        lg: "gap-1 px-3 text-medium",
      },
      round: {
        true: "rounded-full",
      },
      tabindex: {
        true: "cursor-pointer focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:outline-{color}",
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
