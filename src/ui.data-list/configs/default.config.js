export default /*tw*/ {
  wrapper: "",
  draggable: "",
  draggableDrag: "bg-gray-100",
  draggableGhost: "bg-opacity-50",
  itemWrapper: "group/item-wrapper",
  item: `
    group/item
    border-b border-gray-100
    group-last/item-wrapper:border-b-0 group-[]/nested:group-last/item-wrapper:border-b
    py-4 space-x-4 flex flex-auto items-center justify-between
  `,
  dragIcon: "{UIcon} icon-drag cursor-move opacity-100 fill-gray-400 md:fill-gray-500",
  dragIconName: "drag_indicator",
  label: {
    base: "font-normal text-gray-900 flex-auto pt-px",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  labelCrossed: "line-through",
  customActions: `
    space-x-5 opacity-50 md:flex md:items-center md:opacity-0
    group-hover/item:md:block group-hover/item:opacity-100
  `,
  deleteIcon: "{UIcon} hidden md:block md:opacity-0 group-hover/item:md:opacity-100",
  deleteIconName: "delete",
  editIcon: "{UIcon} fill-gray-500 opacity-50",
  editIconName: "edit_note",
  divider: "{UDivider}",
  empty: "{UEmpty}",
  nested: "{UDataList} group/nested ml-6",
  i18n: {
    edit: "Edit",
    delete: "Delete",
    emptyTitle: "",
    emptyDescription: "There is no data in the list.",
  },
  defaultVariants: {
    size: "md",
    labelKey: "label",
    valueKey: "id",
    animationDuration: 200,
    nesting: false,
    upperlined: false,
  },
};
