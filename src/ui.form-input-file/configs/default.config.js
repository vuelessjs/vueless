export default /*tw*/ {
  label: {
    wrapper: "relative w-full",
    label: {
      compoundVariants: [
        { align: "topInside", size: "sm", class: "left-5 top-4" },
        { align: "topInside", size: "md", class: "left-5 top-5" },
        { align: "topInside", size: "lg", class: "left-5 top-6" },
      ],
    },
  },
  dropzoneWrapper: {
    base: `
      size-auto w-full rounded border border-dashed border-gray-300 bg-white
      p-4 px-5 py-6 hover:border-gray-400
    `,
    variants: {
      error: {
        true: "border-red-300 hover:border-red-400",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-8" },
      { labelAlign: "topInside", label: true, size: "md", class: "py-10" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-12" },
    ],
  },
  description: "text-gray-700",
  buttonWrapper: "relative mt-3 flex w-full gap-52 justify-between rounded bg-brand-50 p-4",
  placeholderWrapper: "flex items-center gap-2",
  placeholder: {
    base: "pr-4 shrink-0 text-ellipsis overflow-hidden text-gray-700 text-nowrap",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  iconPlaceholderName: "attach_file",
  iconPlaceholder: "-rotate-45",
  button: "hover:cursor-pointer",
  iconUploadFileName: "upload_file",
  iconCloseName: "close",
  iconClose: "",
  iconUploadFile: "",
  dropzoneWrapperHover: "border-gray-400 bg-gray-50",
  dropzoneWrapperError: "hover:border-red-400 border-red-300",
  input: "sr-only pointer-events-none size-0 opacity-0",
  i18n: {
    sizeError: "File size is too big.",
    formatError: "Format is not supported.",
    noFile: "No file selected",
    uploadFile: "Upload file",
  },
  defaultVariants: {
    size: "md",
    labelAlign: "topInside",
    allowedFileTypes: [".png", ".jpg", ".jpeg", ".pdf", ".txt", ".doc", ".docx", "xls", ".xlsx"],
    maxFileSize: 100,
  },
};
