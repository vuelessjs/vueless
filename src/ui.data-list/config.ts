export default /*tw*/ {
  wrapper: "",
  draggable: "",
  draggableDrag: "bg-gray-100",
  draggableGhost: "bg-gray-100/50",
  itemWrapper: "group/item-wrapper",
  item: {
    base: `
      group/item
      border-b border-gray-100
      group-last/item-wrapper:border-b-0 group-[]/nested:group-last/item-wrapper:border-b
      flex flex-auto items-center justify-between
    `,
    variants: {
      size: {
        sm: "gap-2.5 py-2.5",
        md: "gap-3 py-3",
        lg: "gap-3.5 py-3.5",
      },
    },
  },
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
  dragIconWrapper: "icon-drag cursor-move",
  dragIcon: "{UIcon} {>dataListIcon} icon-drag cursor-move opacity-100",
  label: {
    base: "font-normal flex-auto pt-px",
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
