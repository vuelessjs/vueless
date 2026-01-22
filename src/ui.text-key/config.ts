export default /*tw*/ {
  key: {
    base: `
      inline-flex items-center justify-center gap-1 border border-solid
      rounded-small font-medium font-mono !leading-none outline-hidden
    `,
    variants: {
      variant: {
        solid: "border-transparent text-inverted bg-{color}",
        outlined: "border-{color} text-{color}",
        subtle: "border-{color}/15 text-{color} bg-{color}/10",
        soft: "border-transparent text-{color} bg-{color}/10",
      },
      size: {
        sm: "px-1 min-w-5 h-5 text-tiny",
        md: "px-1.5 min-w-6 h-6 text-tiny",
        lg: "px-1.5 min-w-7 h-7 text-small",
      },
    },
  },
  defaults: {
    color: "grayscale",
    variant: "outlined",
    size: "md",
  },
};
