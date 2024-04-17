export default /*tw*/ {
  wrapper: {
    base: "w-fit",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
  input: "p-0 m-0 size-0 invisible peer absolute",
  label: {
    base: "font-medium w-full flex items-center justify-center cursor-pointer",
    variants: {
      variant: {
        primary: `
          bg-gray-900/5 hover:bg-gray-900/10 active:bg-gray-900/15
          peer-focus:border-gray-100 peer-focus:bg-opacity-10 peer-focus:ring-4 peer-focus:ring-gray-600/15
          focus:border-gray-100 focus:bg-opacity-10 focus:ring-4 focus:ring-gray-600/15
          peer-checked:bg-gray-900/15
        `,
        secondary: `
          bg-transparent border hover:text-opacity-80 hover:border-opacity-80
          peer-focus:text-opacity-100 peer-focus:border-opacity-100
          focus:text-opacity-100 focus:border-opacity-100
          peer-checked:text-opacity-100 peer-checked:border-opacity-100
        `,
        thirdary: `
          bg-transparent opacity-50 border-none hover:border-none hover:opacity-100 hover:ring-0
          peer-focus:border-none peer-focus:bg-gray-100 peer-focus:bg-opacity-10 peer-focus:opacity-100
          peer-focus:ring-0 peer-checked:bg-transparent peer-checked:opacity-100
          focus:border-none focus:bg-gray-100 focus:bg-opacity-10 focus:opacity-100 focus:ring-0
        `,
      },
      size: {
        sm: "gap-1.5 p-3.5",
        md: "p-[1.125rem] gap-2",
        lg: "gap-2.5 p-[1.375rem]",
      },
    },
  },
  labelText: {
    base: "font-medium text-center w-full",
    variants: {
      size: {
        sm: "text-sm",
        md: "font-base",
        lg: "text-lg",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    type: "radio",
    size: "md",
    block: false,
    disabled: false,
  },
};
