export default /*tw*/ {
  wrapper: {
    base: `
      font-normal leading-normal
      [&_b]:font-bold [&_i]:italic [&_p]:font-normal
      [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4
      [&_a:not([class]):hover]:no-underline [&_a:not([class])]:font-bold
      [&_ul]:font-normal [&_ol]:font-normal
      [&_ul]:leading-normal [&_ol]:leading-normal
      [&_ul]:list-disc [&_ol]:list-decimal
      [&_ul]:ml-2 [&_ol]:ml-2
    `,
    variants: {
      size: {
        sm: "text-xs space-y-2",
        md: "text-sm space-y-3",
        lg: "text-base space-y-4",
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
  },
  html: "",
  defaults: {
    size: "md",
    align: "left",
    line: false,
  },
};
