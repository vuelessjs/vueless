export default /*tw*/ {
  wrapper: "",
  draggable: "",
  draggableDrag: "bg-lifted",
  draggableGhost: "bg-lifted/50",
  itemWrapper: "group/item-wrapper",
  item: {
    base: `
      group/item
      border-b border-muted
      group-last/item-wrapper:border-b-0 group-[*]/nested:group-last/item-wrapper:border-b
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
  drag: "icon-drag cursor-move",
  dragIcon: "{UIcon} {>dataListIcon} icon-drag cursor-move opacity-100",
  label: {
    base: "font-normal flex-auto pt-px",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  labelCrossed: "{>label} line-through",
  customActions: "space-x-5 opacity-50 flex items-center md:opacity-0 group-hover/item:opacity-100",
  divider: "{UDivider}",
  empty: "{UEmpty}",
  nested: "{UDataList} group/nested ml-6",
  i18n: {
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
  },
};
