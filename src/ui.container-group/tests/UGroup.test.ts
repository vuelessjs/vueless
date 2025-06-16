import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UGroup from "../UGroup.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { ComponentPublicInstance } from "vue";
import type { Props } from "../types.ts";

describe("UGroup", () => {
  // Props
  describe("Props", () => {
    // Title prop
    it("renders with title prop", () => {
      const title = "Group Title";

      const wrapper = mount(UGroup, {
        props: {
          title,
        },
      });

      const header = wrapper.findComponent(UHeader);

      expect(header.exists()).toBe(true);
      expect(header.props("label")).toBe(title);
    });

    // Upperlined prop
    it("applies upperlined class when upperlined prop is true", () => {
      const title = "Group Title";
      const upperlined = true;

      const wrapper = mount(UGroup, {
        props: {
          title,
          upperlined,
        },
      });

      const header = wrapper.find("[class*='border-t']");

      expect(header.exists()).toBe(true);
      expect(header.classes()).toContain("pt-6");
    });

    // Underlined prop
    it("applies underlined class when underlined prop is true", () => {
      const title = "Group Title";
      const underlined = true;

      const wrapper = mount(UGroup, {
        props: {
          title,
          underlined,
        },
      });

      const header = wrapper.find("[class*='border-b']");

      expect(header.exists()).toBe(true);
      expect(header.classes()).toContain("pb-1.5");
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "group-test";

      const wrapper = mount(UGroup, {
        props: {
          dataTest,
        },
      });

      expect(wrapper.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";
      const wrapper = mount(UGroup, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    // Title slot
    it("renders custom content in title slot", () => {
      const title = "Group Title";
      const slotClass = "custom-title";
      const slotContent = "Custom Title";
      const wrapper = mount(UGroup, {
        props: { title },
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
      expect(wrapper.findComponent(UHeader).exists()).toBe(false);
    });

    it("provides title binding to title slot", () => {
      const title = "Group Title";
      const wrapper = mount(UGroup, {
        props: { title },
        slots: {
          title: `
            <template #default="{ title }">
              <div class="custom-title" :data-title="title"></div>
            </template>
          `,
        },
      });

      const titleElement = wrapper.find(".custom-title");

      expect(titleElement.exists()).toBe(true);
      expect(titleElement.attributes("data-title")).toBe(title);
    });

    // Before-title slot
    it("renders content in before-title slot", () => {
      const title = "Group Title";
      const slotClass = "before-title";
      const slotContent = "Before Title";
      const wrapper = mount(UGroup, {
        props: { title },
        slots: {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    // After-title slot
    it("renders content in after-title slot", () => {
      const title = "Group Title";
      const slotClass = "after-title";
      const slotContent = "After Title";
      const wrapper = mount(UGroup, {
        props: { title },
        slots: {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    // Actions slot
    it("renders content in actions slot", () => {
      const title = "Group Title";
      const slotClass = "actions";
      const slotContent = "Actions";
      const wrapper = mount(UGroup, {
        props: { title },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });
  });

  // Conditional rendering
  describe("Conditional rendering", () => {
    // Header visibility
    it("shows header when title prop is provided", () => {
      const title = "Group Title";

      const wrapper = mount(UGroup, {
        props: {
          title,
        },
      });

      const header = wrapper.findComponent(UHeader);

      expect(header.exists()).toBe(true);
    });

    // Header visibility without title
    it("does not show header when title prop is not provided", () => {
      const wrapper = mount(UGroup);

      const header = wrapper.findComponent(UHeader);

      expect(header.exists()).toBe(false);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const wrapper = mount(UGroup);
      const vm = wrapper.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
