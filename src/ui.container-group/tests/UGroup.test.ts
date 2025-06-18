import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UGroup from "../UGroup.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

describe("UGroup", () => {
  // Props
  describe("Props", () => {
    // Title prop
    it("renders with title prop", () => {
      const title = "Group Title";

      const component = mount(UGroup, {
        props: {
          title,
        },
      });

      const header = component.findComponent(UHeader);

      expect(header.exists()).toBe(true);
      expect(header.props("label")).toBe(title);
    });

    // Title prop - no header without a title
    it("does not show header when title prop is not provided", () => {
      const component = mount(UGroup);

      const header = component.findComponent(UHeader);

      expect(header.exists()).toBe(false);
    });

    // Upperlined prop
    it("applies upperlined class when upperlined prop is true", () => {
      const upperlined = true;
      const title = "Group Title";
      const expectedClass = "border-t";

      const component = mount(UGroup, {
        props: {
          title,
          upperlined,
        },
      });

      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(true);
      expect(header.classes()).toContain(expectedClass);
    });

    // Underlined prop
    it("applies underlined class when underlined prop is true", () => {
      const underlined = true;
      const title = "Group Title";
      const expectedClass = "border-b";

      const component = mount(UGroup, {
        props: {
          title,
          underlined,
        },
      });

      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(true);
      expect(header.classes()).toContain(expectedClass);
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "group-test";

      const component = mount(UGroup, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";

      const component = mount(UGroup, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Title slot
    it("renders custom content in title slot", () => {
      const title = "Group Title";
      const slotClass = "custom-title";
      const slotContent = "Custom Title";

      const component = mount(UGroup, {
        props: { title },
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
      expect(component.findComponent(UHeader).exists()).toBe(false);
    });

    it("provides title binding to title slot", () => {
      const title = "Group Title";

      const component = mount(UGroup, {
        props: { title },
        slots: {
          title: `
            <template #default="{ title }">
              <div class="custom-title" :data-title="title"></div>
            </template>
          `,
        },
      });

      const titleElement = component.find(".custom-title");

      expect(titleElement.exists()).toBe(true);
      expect(titleElement.attributes("data-title")).toBe(title);
    });

    // Before-title slot
    it("renders content in before-title slot", () => {
      const title = "Group Title";
      const slotClass = "before-title";
      const slotContent = "Before Title";

      const component = mount(UGroup, {
        props: { title },
        slots: {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // After-title slot
    it("renders content in after-title slot", () => {
      const title = "Group Title";
      const slotClass = "after-title";
      const slotContent = "After Title";

      const component = mount(UGroup, {
        props: { title },
        slots: {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Actions slot
    it("renders content in actions slot", () => {
      const title = "Group Title";
      const slotClass = "actions";
      const slotContent = "Actions";

      const component = mount(UGroup, {
        props: { title },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UGroup);

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
