import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { nextTick, ref } from "vue";

import UCollapsible from "../UCollapsible.vue";

import type { Props } from "../types";
import type { UnknownObject } from "../../types";

const TransitionStub = {
  name: "Transition",
  setup(_, { slots }) {
    return () => slots.default?.();
  },
};

const globalMountOptions = {
  global: {
    stubs: {
      Transition: TransitionStub,
    },
  },
};

function mountCollapsible(options: UnknownObject = {}) {
  return mount(UCollapsible, {
    ...globalMountOptions,
    ...options,
  });
}

describe("UCollapsible.vue", () => {
  describe("Props", () => {
    it("Model Value – controls opened state when provided", async () => {
      const open = ref(false);

      const component = mountCollapsible({
        ...globalMountOptions,
        props: {
          open: open.value,
          dataTest: "test",
          "onUpdate:open": (value: boolean) => {
            open.value = value;
            component.setProps({ open: value });
          },
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      expect(component.find('[data-test="test-content"]').exists()).toBe(false);

      await component.find('[data-test="test"]').trigger("click");
      await nextTick();

      expect(component.emitted("update:open")).toBeTruthy();
      expect(component.emitted("update:open")![0][0]).toBe(true);

      await component.setProps({ open: true });
      await nextTick();

      expect(component.find('[data-test="test-content"]').exists()).toBe(true);
    });

    it("Model Value – works independently when not provided", async () => {
      const component = mountCollapsible({
        props: {
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      expect(component.find('[data-test="test-content"]').exists()).toBe(false);

      await component.find('[data-test="test"]').trigger("click");
      await nextTick();
      await flushPromises();

      expect(component.find('[data-test="test-content"]').exists()).toBe(true);
    });

    it("YPosition – applies correct position class for top", () => {
      const component = mountCollapsible({
        props: {
          yPosition: "top" as Props["yPosition"],
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const content = component.find('[data-test="test-content"]');

      expect(content.attributes("class")).toContain("bottom-full");
      expect(content.attributes("class")).toContain("mb-1");
    });

    it("YPosition – applies correct position class for bottom", () => {
      const component = mountCollapsible({
        props: {
          yPosition: "bottom" as Props["yPosition"],
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const content = component.find('[data-test="test-content"]');

      expect(content.attributes("class")).toContain("top-full");
      expect(content.attributes("class")).toContain("mt-1");
    });

    it("XPosition – applies correct position class for left", () => {
      const component = mountCollapsible({
        props: {
          xPosition: "left" as Props["xPosition"],
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const content = component.find('[data-test="test-content"]');

      expect(content.attributes("class")).toContain("left-0");
    });

    it("XPosition – applies correct position class for right", () => {
      const component = mountCollapsible({
        props: {
          xPosition: "right" as Props["xPosition"],
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const content = component.find('[data-test="test-content"]');

      expect(content.attributes("class")).toContain("right-0");
    });

    it("Absolute – applies absolute positioning when true", () => {
      const component = mountCollapsible({
        props: {
          absolute: true,
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const content = component.find('[data-test="test-content"]');

      expect(content.attributes("class")).toContain("absolute");
    });

    it("Absolute – does not apply absolute positioning when false", () => {
      const component = mountCollapsible({
        props: {
          absolute: false,
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const content = component.find('[data-test="test-content"]');

      expect(content.attributes("class")).not.toContain("absolute");
    });

    it("Disabled – prevents opening when disabled", async () => {
      const component = mountCollapsible({
        props: {
          disabled: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      await component.find('[data-test="test"]').trigger("click");
      await nextTick();

      expect(component.find('[data-test="test-content"]').exists()).toBe(false);
    });

    it("Disabled – applies cursor-not-allowed class", () => {
      const component = mountCollapsible({
        props: {
          disabled: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const wrapper = component.find('[data-test="test"]');

      expect(wrapper.attributes("class")).toContain("cursor-not-allowed");
    });

    it("CloseOnOutside – closes when clicking outside", async () => {
      const component = mountCollapsible({
        props: {
          closeOnOutside: true,
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
        attachTo: document.body,
      });

      expect(component.find('[data-test="test-content"]').exists()).toBe(true);

      document.body.click();
      await nextTick();

      expect(component.emitted("close")).toBeTruthy();

      component.unmount();
    });

    it("CloseOnContent – closes when clicking content", async () => {
      const component = mountCollapsible({
        props: {
          closeOnContent: true,
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      await component.find('[data-test="test-content"]').trigger("click");
      await nextTick();

      expect(component.emitted("close")).toBeTruthy();
    });

    it("CloseOnContent – does not close when false", async () => {
      const component = mountCollapsible({
        props: {
          closeOnContent: false,
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      await component.find('[data-test="test-content"]').trigger("click");
      await nextTick();

      expect(component.find('[data-test="test-content"]').exists()).toBe(true);
    });

    it("Id – applies custom id when provided", () => {
      const customId = "custom-collapsible-id";

      const component = mountCollapsible({
        props: {
          id: customId,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      const wrapper = component.find('[data-test="test"]');

      expect(wrapper.attributes("id")).toBe(customId);
    });

    it("DataTest – applies custom data-test attribute", () => {
      const dataTest = "custom-test";

      const component = mountCollapsible({
        props: {
          dataTest,
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      expect(component.find(`[data-test="${dataTest}"]`).exists()).toBe(true);
    });
  });

  describe("Slots", () => {
    it("Default – renders trigger content", () => {
      const triggerContent = "Click Me";

      const component = mountCollapsible({
        slots: {
          default: triggerContent,
        },
      });

      expect(component.text()).toContain(triggerContent);
    });

    it("Default – exposes opened state to slot", async () => {
      const component = mountCollapsible({
        props: {
          dataTest: "test",
        },
        slots: {
          default: `<template #default="{ opened }">
            <div class="trigger">{{ opened ? 'Opened' : 'Closed' }}</div>
          </template>`,
        },
      });

      expect(component.find(".trigger").text()).toBe("Closed");

      await component.find('[data-test="test"]').trigger("click");
      await nextTick();
      await flushPromises();

      expect(component.find(".trigger").text()).toBe("Opened");
    });

    it("Content – renders collapsible content when opened", () => {
      const contentText = "Collapsible Content";

      const component = mountCollapsible({
        props: {
          open: true,
        },
        slots: {
          default: "Trigger",
          content: contentText,
        },
      });

      expect(component.text()).toContain(contentText);
    });

    it("Content – exposes opened state to slot", () => {
      const component = mountCollapsible({
        props: {
          open: true,
        },
        slots: {
          default: "Trigger",
          content: `<template #content="{ opened }">
            <div class="content-state">{{ opened ? 'Open' : 'Closed' }}</div>
          </template>`,
        },
      });

      expect(component.find(".content-state").text()).toBe("Open");
    });
  });

  describe("Events", () => {
    it("Update:open – emits when toggling", async () => {
      const component = mountCollapsible({
        props: {
          open: false,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      await component.find('[data-test="test"]').trigger("click");
      await nextTick();

      expect(component.emitted("update:open")).toBeTruthy();
      expect(component.emitted("update:open")![0][0]).toBe(true);
    });

    it("Open – emits when collapsible opens", async () => {
      const component = mountCollapsible({
        props: {
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      await component.find('[data-test="test"]').trigger("click");
      await nextTick();
      await flushPromises();

      expect(component.emitted("open")).toBeTruthy();
    });

    it("Close – emits when collapsible closes", async () => {
      const component = mountCollapsible({
        props: {
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      await component.find('[data-test="test"]').trigger("click");
      await nextTick();
      await flushPromises();

      expect(component.emitted("close")).toBeTruthy();
    });
  });

  describe("Exposed Methods", () => {
    it("wrapperRef – exposes wrapper element reference", () => {
      const component = mountCollapsible({
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef).toBeInstanceOf(HTMLDivElement);
    });

    it("show – opens the collapsible", async () => {
      const component = mountCollapsible({
        props: {
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      component.vm.show();
      await nextTick();
      await flushPromises();

      expect(component.find('[data-test="test-content"]').exists()).toBe(true);
      expect(component.emitted("open")).toBeTruthy();
    });

    it("show – does not open when disabled", async () => {
      const component = mountCollapsible({
        props: {
          disabled: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      component.vm.show();
      await nextTick();

      expect(component.find('[data-test="test-content"]').exists()).toBe(false);
    });

    it("hide – closes the collapsible", async () => {
      const component = mountCollapsible({
        props: {
          open: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      expect(component.find('[data-test="test-content"]').exists()).toBe(true);

      component.vm.hide();
      await nextTick();

      expect(component.emitted("close")).toBeTruthy();
    });

    it("toggle – toggles the collapsible state", async () => {
      const component = mountCollapsible({
        props: {
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      component.vm.toggle();
      await nextTick();
      await flushPromises();

      expect(component.find('[data-test="test-content"]').exists()).toBe(true);

      component.vm.toggle();
      await nextTick();
      await flushPromises();

      expect(component.find('[data-test="test-content"]').exists()).toBe(false);
    });

    it("toggle – does not toggle when disabled", async () => {
      const component = mountCollapsible({
        props: {
          disabled: true,
          dataTest: "test",
        },
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      component.vm.toggle();
      await nextTick();

      expect(component.find('[data-test="test-content"]').exists()).toBe(false);
    });

    it("isOpened – reflects the current opened state", async () => {
      const component = mountCollapsible({
        slots: {
          default: "Trigger",
          content: "Content",
        },
      });

      expect(component.vm.isOpened).toBe(false);

      component.vm.show();
      await nextTick();
      await flushPromises();

      expect(component.vm.isOpened).toBe(true);

      component.vm.hide();
      await nextTick();
      await flushPromises();

      expect(component.vm.isOpened).toBe(false);
    });
  });
});
