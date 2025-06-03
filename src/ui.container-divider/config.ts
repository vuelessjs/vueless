export default /*tw*/ {
  wrapper: {
    base: "flex items-center justify-center",
    variants: {
      vertical: {
        true: "h-auto flex-col",
        false: "w-full flex-row",
      },
    },
  },
  divider: {
    base: "border-{color}",
    variants: {
      color: {
        neutral: "border-muted",
      },
      vertical: {
        true: "h-full",
        false: "w-full",
      },
      dashed: {
        true: "border-dashed",
      },
      dotted: {
        true: "border-dotted",
      },
    },
    compoundVariants: [
      { vertical: true, size: "xs", class: "border-l" },
      { vertical: true, size: "sm", class: "border-l-[2px]" },
      { vertical: true, size: "md", class: "border-l-[3px]" },
      { vertical: true, size: "lg", class: "border-l-[4px]" },
      { vertical: true, size: "xl", class: "border-l-[5px]" },
      { vertical: false, size: "xs", class: "border-t" },
      { vertical: false, size: "sm", class: "border-t-[2px]" },
      { vertical: false, size: "md", class: "border-t-[3px]" },
      { vertical: false, size: "lg", class: "border-t-[4px]" },
      { vertical: false, size: "xl", class: "border-t-[5px]" },
    ],
  },
  dividerIcon: "{UIcon}",
  label: {
    base: "px-3 w-fit rounded-medium text-medium text-{color} shrink-0",
    variants: {
      color: {
        neutral: "text-lifted",
      },
      vertical: {
        true: "[writing-mode:vertical-lr]",
      },
    },
  },
  defaults: {
    color: "neutral",
    size: "xs",
    dashed: false,
    dotted: false,
    vertical: false,
  },
};
