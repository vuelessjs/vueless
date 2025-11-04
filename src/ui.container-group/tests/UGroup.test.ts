import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UGroup from "../UGroup.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

describe("UGroup", () => {
  describe("Props", () => {
    it("Title – renders with title prop", () => {
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

    it("Title – does not show header when title prop is not provided", () => {
      const component = mount(UGroup);

      const header = component.findComponent(UHeader);

      expect(header.exists()).toBe(false);
    });

    it("Upperlined – applies upperlined class when upperlined prop is true", () => {
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

    it("Underlined – applies underlined class when underlined prop is true", () => {
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

    it("Data Test – applies data-test attribute", () => {
      const dataTest = "group-test";

      const component = mount(UGroup, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Default – renders content in default slot", () => {
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

    it("Title – renders custom content in title slot", () => {
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

    it("Title – provides title binding to title slot", () => {
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

    it("Before-title – renders content in before-title slot", () => {
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

    it("After-title – renders content in after-title slot", () => {
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

    it("Actions – renders content in actions slot", () => {
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

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UGroup);

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
