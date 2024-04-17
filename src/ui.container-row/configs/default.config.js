export default /*tw*/ {
  wrapper: {
    base: "flex items-start w-full",
    variants: {
      noMobile: {
        true: "flex-row space-x-4",
        false: "flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4",
      },
    },
  },
  defaultVariants: {
    noMobile: false,
  },
};
