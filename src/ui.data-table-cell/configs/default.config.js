export default /*tw*/ {
  tableCell: {
    base: `
      p-[1.125rem] py-5 first:p-5 group-[]/body:truncate group-[]/body:align-top
      group-[]/body:last:p-5 !overflow-visible
    `,
    variants: {
      compact: {
        true: `
          group-[]/body:px-4 group-[]/body:py-3 group-[]/body:last:px-4 group-[]/body:last:py-3
          group-[]/body:first:px-4 group-[]/body:first:py-3 group-[]/footer:p-4:
        `,
      },
    },
  },
  defaultVariants: {
    compact: false,
  },
};
