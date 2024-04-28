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
  iconDrag: "icon-drag cursor-move opacity-100 fill-gray-400 md:fill-gray-500",
  iconDragName: "drag_indicator",
  title: "text-base font-normal text-gray-900 flex-auto pt-px",
  titleCrossed: "line-through",
  customActions: `
    space-x-5 opacity-50 md:flex md:items-center md:opacity-0
    group-hover/item:md:block group-hover/item:opacity-100
  `,
  iconDelete: "hidden md:block md:opacity-0 group-hover/item:md:opacity-100",
  iconDeleteName: "delete",
  iconEdit: "fill-gray-500 opacity-50",
  iconEditName: "edit_note",
  nested: "group/nested ml-6",
  i18n: {
    delete: "Delete",
    edit: "Edit",
  },
  defaultVariants: {
    animationDuration: 200,
    nesting: false,
    upperlined: false,
    hideEmptyStateForNesting: false,
  },
};
