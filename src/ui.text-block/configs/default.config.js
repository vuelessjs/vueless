export default /*tw*/ {
  wrapper: {
    base: `
      space-y-4 font-normal leading-normal
      [&_b]:font-bold [&_i]:italic [&_p]:font-normal
      [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4
      [&_a:not([class]):hover]:no-underline [&_a:not([class])]:font-bold
      [&_ul]:font-normal [&_ol]:font-normal
      [&_ul]:leading-[1.125rem] [&_ol]:leading-[1.125rem]
      [&_ul]:list-inside [&_ol]:list-inside
      [&_ul]:list-disc [&_ol]:list-decimal
      [&_ul]:ml-2 [&_ol]:ml-2
    `,
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
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
  defaultVariants: {
    size: "md",
    align: "left",
  },
};
