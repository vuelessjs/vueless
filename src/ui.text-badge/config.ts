export default /*tw*/ {
  badge: {
    base: "border rounded-medium inline-block py-1 !leading-none outline-hidden",
    variants: {
      variant: {
        primary: "bg-{color} text-inverted border-transparent",
        secondary: "border-{color} text-{color}",
        thirdary: "bg-{color}/5 text-{color} border-transparent",
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
    compoundVariants: [{ variant: "thirdary", bordered: true, class: "border-{color}/10" }],
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
    variant: "primary",
    tabindex: "-1",
    size: "md",
    round: false,
    bordered: false,
  },
};
