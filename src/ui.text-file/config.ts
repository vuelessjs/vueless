export default /*tw*/ {
  file: {
    base: "flex items-center",
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1.5",
      },
    },
  },
  body: "flex items-center gap-2",
  fileImage: "rounded-sm max-w-7",
  fileIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  fileLabel: "{ULink} break-all !leading-[1.5]",
  removeIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  defaults: {
    size: "md",
    /* icons */
    fileIcon: "description",
    removeIcon: "close",
  },
};
