import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UAccordion from "../UAccordion.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

import type { ComponentPublicInstance } from "vue";
import type { Props } from "../types.ts";

describe("UAccordion", () => {
  // Props
  describe("Props", () => {
    // Title prop
    it("renders with title prop", () => {
      const title = "Accordion Title";

      const wrapper = mount(UAccordion, {
        props: {
          title,
        },
      });

      expect(wrapper.text()).toContain(title);
    });

    // Description prop
    it("renders with description prop", () => {
      const description = "Accordion Description";

      const wrapper = mount(UAccordion, {
        props: {
          description,
        },
      });

      expect(wrapper.find("[id^='description-']").text()).toBe(description);
    });

    // Size prop
    it("applies correct size classes", () => {
      const sizeClasses = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const wrapper = mount(UAccordion, {
          props: {
            size: size as Props["size"],
          },
        });

        const titleElement = wrapper.find("[class*='text-']");

        expect(titleElement.classes()).toContain(classes);
      });
    });

    // ToggleIcon prop
    it("applies correct toggle icon behavior", () => {
      const toggleIconTests = [
        { toggleIcon: true, exists: true, iconName: "keyboard_arrow_down" },
        { toggleIcon: "custom_icon", exists: true, iconName: "custom_icon" },
        { toggleIcon: false, exists: false, iconName: undefined },
      ];

      toggleIconTests.forEach(({ toggleIcon, exists, iconName }) => {
        const wrapper = mount(UAccordion, {
          props: {
            toggleIcon: toggleIcon as Props["toggleIcon"],
          },
        });

        const icon = wrapper.findComponent(UIcon);

        expect(icon.exists()).toBe(exists);

        if (exists) {
          expect(icon.props("name")).toBe(iconName);
        }
      });
    });

    // ID prop
    it("uses provided id prop", () => {
      const id = "custom-id";

      const wrapper = mount(UAccordion, {
        props: {
          id,
        },
      });

      expect(wrapper.find(`[id="description-${id}"]`).exists()).toBe(true);
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "accordion-test";

      const wrapper = mount(UAccordion, {
        props: {
          dataTest,
        },
      });

      expect(wrapper.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Toggle slot
    it("renders default toggle icon when toggle slot is not provided", () => {
      const toggleIcon = true;

      const wrapper = mount(UAccordion, {
        props: {
          toggleIcon,
        },
      });

      const icon = wrapper.findComponent(UIcon);

      expect(icon.exists()).toBe(true);
    });

    // Custom toggle slot
    it("renders custom content in toggle slot", () => {
      const toggleIcon = true;
      const slotClass = "custom-toggle";
      const slotContent = "Custom Toggle";

      const wrapper = mount(UAccordion, {
        props: {
          toggleIcon,
        },
        slots: {
          toggle: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(wrapper.findComponent(UIcon).exists()).toBe(false);
    });

    // Toggle slot bindings
    it("provides icon-name and opened bindings to toggle slot", async () => {
      const toggleIcon = true;
      const toggleClass = "custom-toggle";
      const defaultIconName = "keyboard_arrow_down";

      const wrapper = mount(UAccordion, {
        props: {
          toggleIcon,
        },
        slots: {
          toggle: `
            <template #default="{ iconName, opened }">
              <div class="${toggleClass}" :data-icon="iconName" :data-opened="opened"></div>
            </template>
          `,
        },
      });

      const toggleElement = wrapper.find(`.${toggleClass}`);

      expect(toggleElement.exists()).toBe(true);
      expect(toggleElement.attributes("data-icon")).toBe(defaultIconName);
      expect(toggleElement.attributes("data-opened")).toBe("false");

      // Click to toggle
      await wrapper.trigger("click");

      expect(toggleElement.attributes("data-opened")).toBe("true");
    });
  });

  // Events
  describe("Events", () => {
    // Click event
    it("emits click event with id and opened state when clicked", async () => {
      const id = "test-id";

      const wrapper = mount(UAccordion, {
        props: {
          id,
        },
      });

      await wrapper.trigger("click");

      const emitted = wrapper.emitted("click");

      expect(emitted).toBeTruthy();
      expect(emitted?.[0]).toEqual([id, true]);

      // Click again to toggle back
      await wrapper.trigger("click");

      const emittedAgain = wrapper.emitted("click");

      expect(emittedAgain?.[1]).toEqual([id, false]);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const wrapper = mount(UAccordion);
      const vm = wrapper.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });

  // Component behavior
  describe("Component behavior", () => {
    // Toggle behavior
    it("toggles opened state when clicked", async () => {
      const description = "Test Description";
      const openedClasses = ["h-fit", "opacity-100"];

      const wrapper = mount(UAccordion, {
        props: {
          description,
        },
      });

      const descriptionElement = wrapper.find("[id^='description-']");

      // Initially not opened
      openedClasses.forEach((className) => {
        expect(descriptionElement.classes()).not.toContain(className);
      });

      // Click to open
      await wrapper.trigger("click");

      // Should be opened
      openedClasses.forEach((className) => {
        expect(descriptionElement.classes()).toContain(className);
      });

      // Click to close
      await wrapper.trigger("click");

      // Should be closed again
      openedClasses.forEach((className) => {
        expect(descriptionElement.classes()).not.toContain(className);
      });
    });

    // Divider rendering
    it("renders divider component", () => {
      const wrapper = mount(UAccordion);

      const divider = wrapper.findComponent(UDivider);

      expect(divider.exists()).toBe(true);
    });
  });
});
