import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UAccordionItem from "../UAccordionItem.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("UAccordionItem", () => {
  // Props
  describe("Props", () => {
    // Title prop
    it("renders with title prop", () => {
      const title = "Accordion Title";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          title,
        },
      });

      expect(component.find("[vl-key='title']").text()).toContain(title);
    });

    // Description prop
    it("renders with description prop", () => {
      const description = "Accordion Description";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          description,
        },
      });

      expect(component.find("[vl-key='description']").text()).toBe(description);
    });

    // Size prop
    it("applies correct size classes", () => {
      const sizeClasses = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UAccordionItem, {
          props: {
            name: "test",
            size: size as Props["size"],
          },
        });

        expect(component.find("[vl-key='title']").classes()).toContain(classes);
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
        const component = mount(UAccordionItem, {
          props: {
            name: "test",
            toggleIcon: toggleIcon as Props["toggleIcon"],
          },
        });

        const icon = component.findComponent(UIcon);

        expect(icon.exists()).toBe(exists);

        if (exists) {
          expect(icon.props("name")).toBe(iconName);
        }
      });
    });

    // ID prop
    it("uses provided id prop", () => {
      const id = "custom-id";
      const description = "some text";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          id,
          description,
        },
      });

      expect(component.find(`[id="description-${id}"]`).exists()).toBe(true);
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "accordion-test";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Toggle slot
    it("renders default toggle icon when toggle slot is not provided", () => {
      const toggleIcon = true;

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          toggleIcon,
        },
      });

      const icon = component.findComponent(UIcon);

      expect(icon.exists()).toBe(true);
    });

    // Custom toggle slot
    it("renders custom content in toggle slot", () => {
      const toggleIcon = true;
      const slotClass = "custom-toggle";
      const slotContent = "Custom Toggle";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          toggleIcon,
        },
        slots: {
          toggle: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });

    // Toggle slot bindings
    it("provides icon-name and opened bindings to toggle slot", async () => {
      const toggleIcon = true;
      const toggleClass = "custom-toggle";
      const defaultIconName = "keyboard_arrow_down";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
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

      const toggleElement = component.find(`.${toggleClass}`);

      expect(toggleElement.exists()).toBe(true);
      expect(toggleElement.attributes("data-icon")).toBe(defaultIconName);
      expect(toggleElement.attributes("data-opened")).toBe("false");

      // Click to toggle
      await component.trigger("click");

      expect(toggleElement.attributes("data-opened")).toBe("true");
    });

    // Default slot
    it("renders default slot content when accordion is opened", async () => {
      const slotContent = "Custom accordion content";
      const slotClass = "custom-content";

      const component = mount(UAccordionItem, {
        props: { name: "test" },
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(false);

      await component.trigger("click");

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);

      await component.trigger("click");

      expect(component.find(`.${slotClass}`).exists()).toBe(false);
    });

    it("does not render default slot content when accordion is closed", () => {
      const slotContent = "Custom accordion content";
      const slotClass = "custom-content";

      const component = mount(UAccordionItem, {
        props: { name: "test" },
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(false);
    });

    it("does not render content wrapper when default slot is empty", async () => {
      const component = mount(UAccordionItem, { props: { name: "test" } });

      await component.trigger("click");

      expect(component.find("[vl-key='content']").exists()).toBe(false);
    });
  });

  // Events
  describe("Events", () => {
    // Click event
    it("emits click event with id and opened state when clicked", async () => {
      const id = "test-id";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          id,
        },
      });

      await component.trigger("click");

      const emitted = component.emitted("click");

      expect(emitted).toBeTruthy();
      expect(emitted?.[0]).toEqual([id, true]);

      // Click again to toggle back
      await component.trigger("click");

      const emittedAgain = component.emitted("click");

      expect(emittedAgain?.[1]).toEqual([id, false]);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UAccordionItem);

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });

  // Component behavior
  describe("Component behavior", () => {
    // Toggle behavior
    it("toggles opened state when clicked", async () => {
      const description = "Test Description";
      const openedClass = "opacity-100";

      const component = mount(UAccordionItem, {
        props: {
          name: "test",
          description,
        },
      });

      const descriptionElement = component.find("[id^='description-']");

      // Initially not opened
      expect(descriptionElement.classes()).not.toContain(openedClass);

      // Click to open
      await component.trigger("click");

      // Should be opened
      expect(descriptionElement.classes()).toContain(openedClass);

      // Click to close
      await component.trigger("click");

      // Should be closed again
      expect(descriptionElement.classes()).not.toContain(openedClass);
    });
  });
});
