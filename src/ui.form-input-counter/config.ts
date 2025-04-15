export default /*tw*/ {
  wrapper: "flex items-stretch",
  counterInput: {
    base: "{UInput} w-fit",
    numberInput: {
      wrapper: "rounded-none focus-within:outline-none focus-within:border-neutral hover:focus-within:border-neutral",
    },
  },
  counterButton: "{UButton} rounded-none border-default",
  addButton: "{>counterButton} border-l-0 rounded-r-medium",
  removeButton: "{>counterButton} border-r-0 rounded-l-medium",
  actionIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  addIcon: "{>actionIcon}",
  removeIcon: "{>actionIcon}",
  defaults: {
    editable: false,
    size: "md",
    disabled: false,
    step: 1,
    min: 1,
    max: 999,
    /* icons */
    removeIcon: "remove",
    addIcon: "add",
  },
};
