export default /*tw*/ {
  file: {
    base: "{ULink} flex items-center",
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1.5",
      },
    },
  },
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
  removeIcon: "{UIcon}",
  defaults: {
    size: "md",
    /* icons */
    fileIcon: "description",
    removeIcon: "close",
  },
};
