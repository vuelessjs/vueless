import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDataList from "../UDataList.vue";
import UEmpty from "../../ui.text-empty/UEmpty.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import draggable from "vuedraggable";

import type { Props, DataListItem } from "../types";

describe("UDataList.vue", () => {
  const defaultList: DataListItem[] = [
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2", crossed: true },
    { id: 3, label: "Item 3", actions: false },
  ];

  const nestedList: DataListItem[] = [
    {
      id: 1,
      label: "Parent 1",
      children: [
        { id: 11, label: "Child 1.1" },
        { id: 12, label: "Child 1.2" },
      ],
    },
    { id: 2, label: "Parent 2" },
  ];

  describe("Props", () => {
    it("List – renders all list items correctly", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
      });

      const items = component.findAll('[vl-key="itemWrapper"]');

      expect(items).toHaveLength(defaultList.length);
      expect(items[0].text()).toContain(defaultList[0].label);
      expect(items[1].text()).toContain(defaultList[1].label);
      expect(items[2].text()).toContain(defaultList[2].label);
    });

    it("List – renders empty state when list is empty", () => {
      const emptyText = "There is no data in the list.";

      const component = mount(UDataList, {
        props: {
          list: [],
        },
      });

      const emptyComponent = component.findComponent(UEmpty);

      expect(emptyComponent.exists()).toBe(true);
      expect(emptyComponent.text()).toContain(emptyText);
    });

    it("List – does not render empty state when hideEmptyStateForNesting is true", () => {
      const component = mount(UDataList, {
        props: {
          list: [],
          hideEmptyStateForNesting: true,
        },
      });

      const emptyComponent = component.findComponent(UEmpty);

      expect(emptyComponent.exists()).toBe(false);
    });

    it("Group – sets correct group name for draggable", async () => {
      const groupName = "test-group";

      const component = mount(UDataList, {
        props: {
          list: defaultList,
          group: groupName,
        },
      });

      const draggableComponent = component.findComponent(draggable);

      expect(draggableComponent.vm.$attrs.group).toEqual({ name: groupName });
    });

    it("Size – applies correct size classes", () => {
      const sizeClasses = {
        sm: "gap-2.5 py-2.5",
        md: "gap-3 py-3",
        lg: "gap-3.5 py-3.5",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UDataList, {
          props: {
            list: defaultList,
            size: size as Props["size"],
          },
        });

        const itemElement = component.find('[vl-key="item"]');

        expect(itemElement.attributes("class")).toContain(classes);
      });
    });

    it("Label Key – uses correct label key for display", () => {
      const customList = [
        { id: 1, title: "Custom Title 1" },
        { id: 2, title: "Custom Title 2" },
      ];

      const component = mount(UDataList, {
        props: {
          list: customList,
          labelKey: "title",
        },
      });

      const items = component.findAll('[vl-key="item"]');

      expect(items[0].text()).toContain(customList[0].title);
      expect(items[1].text()).toContain(customList[1].title);
    });

    it("Value Key – uses correct value key for item identification", () => {
      const customList = [
        { customId: "item-1", label: "Item 1" },
        { customId: "item-2", label: "Item 2" },
      ];

      const valueKey = "customId";

      const component = mount(UDataList, {
        props: {
          list: customList,
          valueKey: valueKey,
        },
      });

      const items = component.findAll('[vl-key="itemWrapper"]');

      expect(items[0].attributes("id")).toBe(customList[0][valueKey]);
      expect(items[1].attributes("id")).toBe(customList[1][valueKey]);
    });

    it("Animation Duration – sets correct animation duration", () => {
      const animationDuration = 300;

      const component = mount(UDataList, {
        props: {
          list: defaultList,
          animationDuration,
        },
      });

      const draggableComponent = component.findComponent(draggable);

      expect(draggableComponent.vm.$attrs.animation).toBe(animationDuration);
    });

    it("Nesting – renders nested items when children array is present", async () => {
      const component = mount(UDataList, {
        props: {
          list: nestedList,
        },
      });

      const nestedComponent = component.getComponent("[vl-key='nested']") as VueWrapper<
        typeof component.vm
      >;

      expect(nestedComponent.props("list")).toEqual(nestedList[0].children);
    });

    it("Data Test – applies correct data-test attribute", () => {
      const dataTest = "test-data-list";

      const component = mount(UDataList, {
        props: {
          list: defaultList,
          dataTest,
        },
      });

      const draggableComponent = component.findComponent({ name: "draggable" });

      expect(draggableComponent.attributes("data-test")).toBe(dataTest);
    });

    it("Crossed Items – applies crossed styling to crossed items", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
      });

      const crossedItem = component.findAll("[vl-key='item']")[1].find('[vl-key="labelCrossed"]');

      expect(crossedItem.exists()).toBe(true);
    });

    it("Actions – hides actions when actions is false", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
        slots: {
          actions: "<button>Delete</button>",
        },
      });

      const itemWithActions = component.findAll("[vl-key='item']")[0];
      const itemWithoutActions = component.findAll("[vl-key='item']")[2];

      expect(itemWithActions.text()).toContain("Delete");
      expect(itemWithoutActions.text()).not.toContain("Delete");
    });
  });

  describe("Slots", () => {
    it("Empty – renders custom empty state content", () => {
      const customEmptyContent = "Custom empty message";

      const component = mount(UDataList, {
        props: {
          list: [],
        },
        slots: {
          empty: customEmptyContent,
        },
      });

      expect(component.text()).toContain(customEmptyContent);
      expect(component.findComponent(UEmpty).exists()).toBe(false);
    });

    it("Empty – exposes empty title and description to slot", () => {
      const emptyText = "There is no data in the list.";
      const emptyTitle = "No Items";
      const component = mount(UDataList, {
        props: {
          list: [],
          config: {
            i18n: {
              emptyTitle: emptyTitle,
              emptyDescription: emptyText,
            },
          },
        },
        slots: {
          empty: "<div>{{ emptyTitle }} - {{ emptyDescription }}</div>",
        },
      });

      expect(component.text()).toContain(emptyTitle);
      expect(component.text()).toContain(emptyText);
    });

    it("Drag – renders custom drag content", () => {
      const customDragContent = "Custom Drag";

      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
        slots: {
          drag: customDragContent,
        },
      });

      expect(component.text()).toContain(customDragContent);
    });

    it("Drag – exposes item and icon-name to slot", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
        slots: {
          drag: "<div>{{ item.label }} - {{ iconName }}</div>",
        },
      });

      expect(component.text()).toContain("Item 1 - drag_indicator");
    });

    it("Label – renders custom label content", () => {
      const customLabelContent = "Custom Label";

      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
        slots: {
          label: customLabelContent,
        },
      });

      expect(component.text()).toContain(customLabelContent);
    });

    it("Label – exposes item and crossed to slot", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
        slots: {
          label: "<div>{{ item.label }} - Crossed: {{ crossed }}</div>",
        },
      });

      expect(component.text()).toContain("Item 1 - Crossed: false");
      expect(component.text()).toContain("Item 2 - Crossed: true");
    });

    it("Actions – renders custom actions content", () => {
      const customActionsContent = "Custom Actions";

      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
        slots: {
          actions: customActionsContent,
        },
      });

      expect(component.text()).toContain(customActionsContent);
    });

    it("Actions – exposes item to slot", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
        slots: {
          actions: "<button>Delete {{ item.label }}</button>",
        },
      });

      expect(component.text()).toContain(defaultList[0].label);
      expect(component.text()).toContain(defaultList[1].label);
    });

    it("Actions – renders default drag icon when no drag slot provided", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
      });

      const dragIcon = component.findComponent(UIcon);

      expect(dragIcon.exists()).toBe(true);
      expect(dragIcon.props("name")).toBe("drag_indicator");
    });
  });

  describe("Events", () => {
    it("Drag Sort – emits when dragging ends", async () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
      });

      const draggableComponent = component.findComponent({ name: "draggable" });

      await draggableComponent.vm.$emit("end");

      expect(component.emitted("dragSort")).toBeTruthy();
      expect(component.emitted("dragSort")![0][0]).toHaveLength(3);
    });
  });

  describe("Exposed Properties", () => {
    it("Wrapper Ref – exposes wrapper element ref", () => {
      const component = mount(UDataList, {
        props: {
          list: defaultList,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
