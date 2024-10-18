export default /*tw*/ {
  file: "{ULink}",
  body: {
    base: "flex items-center",
    variants: {
      size: {
        sm: "gap-1",
        md: "gap-1.5",
        lg: "gap-2",
      },
    },
  },
  fileImage: "rounded-sm max-w-7",
  fileIcon: "{UIcon}",
  fileLabel: "{ULink}",
  removeButton: "{UButton} ml-2",
  defaults: {
    size: "md",
    /* icons */
    fileIcon: "description",
    removeIcon: "close",
  },
};
