export default /*tw*/ {
  wrapper: {
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
      },
      color: {
        inherit: "text-inherit",
      },
      size: {
        xs: "text-tiny space-y-1",
        sm: "text-small space-y-2",
        md: "text-medium space-y-3",
        lg: "text-large space-y-4",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      line: {
        true: "leading-none",
      },
    },
    compoundVariants: [
      { color: "text", variant: "default", class: "text-default" },
      { color: "text", variant: "lifted", class: "text-lifted" },
      { color: "text", variant: "accented", class: "text-accented" },
      { color: "text", variant: "muted", class: "text-muted" },
    ],
  },
  label: "",
  defaults: {
    color: "text",
    variant: "default",
    size: "md",
    align: "left",
    line: false,
  },
};
