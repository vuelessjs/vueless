export default /*tw*/ {
  header: {
    variants: {
      variant: {
        default: "text-{color}",
        lifted: "text-{color}-lifted",
        accented: "text-{color}-accented",
        muted: "text-{color}/(--vl-disabled-opacity)",
      },
      color: {
        inherit: "text-inherit",
      },
      size: {
        xs: "text-lg",
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
        "2xl": "text-5xl",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      line: {
        true: "!leading-none",
      },
    },
    compoundVariants: [
      { color: "text", variant: "default", class: "text-default" },
      { color: "text", variant: "lifted", class: "text-lifted" },
      { color: "text", variant: "accented", class: "text-accented" },
      { color: "text", variant: "muted", class: "text-muted" },
    ],
  },
  defaults: {
    color: "text",
    variant: "default",
    weight: "medium",
    size: "md",
    tag: "div",
    line: true,
  },
};
