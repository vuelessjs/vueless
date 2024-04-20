export default /*tw*/ {
  wrapper: "w-full relative",
  label: "group/label mb-2 font-normal text-gray-500",
  block: {
    base: "mb-4 space-x-2 flex",
    variants: {
      label: {
        true: "mt-4",
      },
    },
  },
  description: "group/description font-normal text-gray-700",
  list: "mb-4 space-y-4",
  button: "w-full",
  iconUploadFileName: "upload_file",
  iconDescriptionName: "description",
  iconCloseName: "close",
  iconClose: "ml-1.5",
  iconUploadFile: "",
  itemClose: "z-20",
  uploadSlot: "w-fit",
  files: "mt-4",
  fileUploadHover: "border-gray-400 bg-gray-50",
  dragOver: "h-full w-full",
  uppyUpload: "opacity-0 absolute left-0 top-0 h-0 w-0 [&_.uppy-Root]:h-full [&_.uppy-Root]:w-full",
  errorFileUpload: "hover:border-red-400 border-red-300",
  upload: {
    base: `
      relative rounded-lg border border-dashed border-gray-300 bg-white h-auto w-auto p-4
      hover:border-gray-400 hover:bg-gray-50
    `,
    variants: {
      size: {
        sm: "group/label:text-xs group/description:text-xs group/image:h-8 group/image:w-8 group/title:text-sm",
        md: "group/text-sm group/description:text-sm group/image:h-10 group/image:w-10 group/title:text-base",
        ld: "group/label:text-base group/description:text-base group/image:h-12 group/image:w-12 group/title:text-lg",
      },
      error: {
        true: "border-red-300 hover:border-red-400",
      },
    },
  },
  i18n: {
    selectOrDragImage: "Select or drag file in this area.",
    canAttachFilesFormat: "You can attach files in the format:",
    cannotAttachFilesStart: "Attaching files in",
    cannotAttachFilesEnd: "format is not supported.",
    selectFile: "Select file",
  },
  defaultVariants: {
    size: "md",
    labelAlign: "topInside",
    allowedFileTypes: [".png", ".jpg", ".jpeg", ".pdf", ".txt", ".doc", ".docx", "xls", ".xlsx"],
    maxFileSize: 1,
    maxFiles: 3,
    local: false,
    multiple: false,
  },
};
