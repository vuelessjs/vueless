export default /*tw*/ {
  file: "{UFile}",
  info: {
    base: "flex items-center",
    variants: {
      size: {
        sm: "gap-1",
        md: "gap-1.5",
        lg: "gap-2",
      },
    },
  },
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
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  defaults: {
    size: "md",
  },
};
