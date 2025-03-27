export default /*tw*/ {
  wrapper: {
    base: "p-4 md:p-6 border rounded-large w-full text-medium",
    variants: {
      variant: {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
      },
    },
  },
  header: "flex justify-between mb-4",
  headerLeft: "flex items-center gap-2 w-fit",
  headerLeftFallback: "flex flex-col w-fit",
  title: "{UHeader}",
  description: "mt-0.5 font-normal text-lifted",
  footer: {
    base: "flex justify-between w-full border-t border-muted mt-6 pt-4 md:pt-6",
    variants: {
      variant: {
        solid: "border-muted",
        outlined: "border-muted",
        subtle: "border-default/50",
        soft: "border-default/50",
      },
    },
  },
  footerLeft: "",
  footerRight: "",
  defaults: {
    variant: "outlined",
  },
};
