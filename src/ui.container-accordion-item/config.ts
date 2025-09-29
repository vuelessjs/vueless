export default /*tw*/ {
  wrapper: {
    base: "group cursor-pointer py-5 first:pt-0 last:pb-0",
    variants: {
      disabled: {
        true: "cursor-not-allowed text-default/(--vl-disabled-opacity)",
      },
    },
  },
  body: "",
  title: {
    base: "flex items-center justify-between font-medium",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  description: {
    base: "text-accented h-0 opacity-0 transition-all cursor-default",
    variants: {
      size: {
        sm: "text-tiny",
        md: "text-small",
        lg: "text-medium",
      },
      opened: {
        true: "pt-2 h-fit opacity-100",
      },
      disabled: {
        true: "text-accented/(--vl-disabled-opacity)",
      },
    },
  },
  content: "pt-3 cursor-default",
  toggleIcon: {
    base: "{UIcon} transition duration-300",
    variants: {
      opened: {
        true: "group-[*]:rotate-180",
      },
    },
  },
  defaults: {
    size: "md",
    disabled: false,
    /* icons */
    toggleIcon: "keyboard_arrow_down",
  },
};
