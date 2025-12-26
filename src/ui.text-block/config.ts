export default /*tw*/ {
  text: {
    base: `
      font-normal leading-normal
      [&_b]:font-bold [&_i]:italic [&_p]:font-normal
      [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4
      [&_a:not([class]):hover]:no-underline
      [&_ul]:font-normal [&_ol]:font-normal
      [&_ul]:leading-normal [&_ol]:leading-normal
      [&_ul]:list-inside [&_ol]:list-inside
      [&_ul]:list-disc [&_ol]:list-decimal
      [&_ul]:ml-2 [&_ol]:ml-2
    `,
    variants: {
      variant: {
        default: "text-{color}",
        lifted: "text-{color}-lifted",
        accented: "text-{color}-accented",
        muted: "text-{color}/(--vl-disabled-opacity)",
        inverted: "text-{color} brightness-125 dark:brightness-75",
      },
      color: {
        inherit: "text-inherit",
      },
      size: {
        xs: "text-tiny",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      line: {
        true: "leading-none",
      },
      wrap: {
        true: "text-wrap wrap-anywhere",
        false: "text-nowrap",
      },
    },
    compoundVariants: [
      { color: "text", variant: "default", class: "text-default" },
      { color: "text", variant: "lifted", class: "text-lifted" },
      { color: "text", variant: "accented", class: "text-accented" },
      { color: "text", variant: "muted", class: "text-muted" },
      { color: "text", variant: "inverted", class: "text-inverted brightness-100 dark:brightness-100" },
    ],
  },
  defaults: {
    color: "text",
    variant: "default",
    size: "md",
    align: "left",
    weight: "normal",
    tag: "div",
    line: false,
    wrap: true,
  },
};
