export default /*tw*/ {
  badge: {
    base: "border rounded-dynamic inline-block py-1 !leading-none outline-none",
    variants: {
      variant: {
        primary: "bg-{color}-600 text-white border-transparent",
        secondary: "border-{color}-600 text-{color}-600",
        thirdary: "bg-{color}-50 text-{color}-600 border-transparent",
      },
      size: {
        sm: "px-2 text-2xs",
        md: "px-2.5 text-xs",
        lg: "px-3 text-sm",
      },
      round: {
        true: "rounded-full",
      },
      tabindex: {
        true: "cursor-pointer focus-visible:ring-dynamic focus-visible:ring-offset-2 focus-visible:ring-{color}-600",
      },
      color: {
        grayscale: "focus-visible:ring-gray-900",
        white: " focus-visible:ring-gray-900",
      },
    },
    compoundVariants: [
      { variant: "thirdary", bordered: true, class: "border-{color}-100" },
      { color: "grayscale", variant: "primary", class: "bg-gray-900" },
      { color: "grayscale", variant: "secondary", class: "border-gray-900 text-gray-900" },
      { color: "grayscale", variant: "thirdary", class: "bg-gray-100 text-gray-900" },
      { color: "white", variant: "primary", class: "bg-white text-gray-900" },
      { color: "white", variant: "secondary", class: "border-white text-white" },
      { color: "white", variant: "thirdary", class: "text-white bg-white/15" },
      { leftIcon: true, size: "sm", class: "pl-1.5" },
      { leftIcon: true, size: "md", class: "pl-1.5" },
      { leftIcon: true, size: "lg", class: "pl-2" },
      { rightIcon: true, size: "sm", class: "pr-1.5" },
      { rightIcon: true, size: "md", class: "pr-1.5" },
      { rightIcon: true, size: "lg", class: "pr-2" },
    ],
  },
  body: {
    base: "flex items-center",
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-0.5",
        lg: "gap-0.5",
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
  leftIcon: "{UIcon} {>badgeIcon}",
  rightIcon: "{UIcon} {>badgeIcon}",
  defaults: {
    color: "brand",
    variant: "primary",
    tabindex: "-1",
    size: "md",
    round: false,
    bordered: false,
  },
};
