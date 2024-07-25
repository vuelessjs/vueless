export default /*tw*/ {
  file: "{UFile}",
  info: "flex items-center gap-2 ",
  icon: "{UIcon}",
  iconName: "description",
  image: "rounded-sm max-w-7",
  label: {
    base: "text-gray-700 whitespace-normal hover:underline hover:decoration-dashed hover:underline-offset-4",
    variants: {
      focus: {
        true: "underline decoration-dashed underline-offset-4",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
};
