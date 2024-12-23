export default /*tw*/ {
  wrapper: "",
  draggable: "",
  draggableDrag: "bg-gray-100",
  draggableGhost: "bg-gray-100/50",
  itemWrapper: "group/item-wrapper",
  item: `
    group/item
    border-b border-gray-100
    group-last/item-wrapper:border-b-0 group-[]/nested:group-last/item-wrapper:border-b
    py-4 space-x-4 flex flex-auto items-center justify-between
  `,
  dataListIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  dragIcon: "{UIcon} {>dataListIcon} icon-drag cursor-move opacity-100",
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
  labelCrossed: "{>label} line-through",
  customActions: `
    space-x-5 opacity-50 md:flex md:items-center md:opacity-0
    group-hover/item:md:block group-hover/item:opacity-100
  `,
  deleteIcon: "{UIcon} {>dataListIcon} hidden md:block md:opacity-0 group-hover/item:md:opacity-100",
  editIcon: "{UIcon} {>dataListIcon} fill-gray-500 opacity-50",
  divider: "{UDivider}",
  empty: "{UEmpty}",
  nested: "{UDataList} group/nested ml-6",
  i18n: {
    edit: "Edit",
    delete: "Delete",
    emptyTitle: "",
    emptyDescription: "There is no data in the list.",
  },
  defaults: {
    size: "md",
    labelKey: "label",
    valueKey: "id",
    animationDuration: 200,
    nesting: false,
    /* icons */
    dragIcon: "drag_indicator",
    deleteIcon: "delete",
    editIcon: "edit_note",
  },
};
