export default /*tw*/ {
  wrapper: {
    base: `
      text-base p-3
      whitespace-nowrap text-left font-normal text-gray-900 cursor-pointer
      first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100 active:bg-gray-200 active:font-medium disabled:bg-gray-500
   `,
    variants: {
      size: {
        sm: "text-xs p-1",
        md: "text-sm p-2",
        lg: "text-base p-3",
      },
    },
  },
};
