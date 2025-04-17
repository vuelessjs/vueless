export default /*tw*/ {
  wrapper: "flex items-stretch gap-1",
  counterInput: "{UInput} w-fit",
  addButton: "{UButton}",
  subtractButton: "{UButton}",
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
  subtractIcon: "{>actionIcon}",
  defaults: {
    size: "md",
    step: 1,
    min: 1,
    max: 999,
    editable: false,
    disabled: false,
    /* icons */
    subtractIcon: "remove",
    addIcon: "add",
  },
};
