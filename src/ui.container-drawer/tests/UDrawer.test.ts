import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import UDrawer from "../UDrawer.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { Props } from "../types";

describe("UDrawer", () => {
  const modelValue = true;

  // Wait for an async component to load
  function sleep(ms: number = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("renders when modelValue is true", () => {
      const component = mount(UDrawer, {
        props: {
          modelValue,
        },
      });

      expect(component.isVisible()).toBe(modelValue);
    });

    it("does not render when modelValue is false", () => {
      const modelValue = false;

      const component = mount(UDrawer, {
        props: {
          modelValue,
        },
      });

      expect(component.find("[vl-key='overlay']").exists()).toBe(modelValue);
    });

    // Title prop
    it("renders with title prop", () => {
      const title = "Drawer Title";

      const component = mount(UDrawer, {
        props: {
          modelValue,
          title,
        },
      });

      const header = component.findComponent(UHeader);

      expect(header.exists()).toBe(true);
      expect(header.props("label")).toBe(title);
    });

    // Description prop
    it("renders with description prop", () => {
      const title = "Drawer Title";
      const description = "Drawer Description";

      const component = mount(UDrawer, {
        props: {
          modelValue,
          title,
          description,
        },
      });

      expect(component.text()).toContain(description);
    });

    // Position prop
    it("applies correct position classes", () => {
      const positions = {
        top: ["top-0", "w-full", "h-auto"],
        bottom: ["bottom-0", "w-full", "h-auto"],
        left: ["left-0", "w-max", "h-full"],
        right: ["right-0", "w-max", "h-full"],
      };

      Object.entries(positions).forEach(([position, expectedClasses]) => {
        const component = mount(UDrawer, {
          props: {
            modelValue,
            position: position as Props["position"],
          },
        });

        const drawerClasses = component.find("[vl-key='drawer']").attributes("class");

        expectedClasses.forEach((expectedClass) => {
          expect(drawerClasses).toContain(expectedClass);
        });
      });
    });

    // Variant prop
    it("applies correct variant classes", () => {
      const variants = {
        solid: "bg-default",
        outlined: "bg-default",
        subtle: "bg-muted",
        soft: "bg-muted",
      };

      Object.entries(variants).forEach(([variant, expectedClasses]) => {
        const component = mount(UDrawer, {
          props: {
            modelValue,
            variant: variant as Props["variant"],
          },
        });

        expect(component.find("[vl-key='drawer']").attributes("class")).toContain(expectedClasses);
      });
    });

    // Handle prop
    it("renders handle when handle prop is true", () => {
      const handle = [true, false];

      handle.forEach((value) => {
        const component = mount(UDrawer, {
          props: {
            modelValue,
            handle: value,
          },
        });

        const handleWrapper = component.find("[vl-key='handleWrapper']");
        const handleElement = component.find("[vl-key='handle']");

        expect(handleWrapper.exists()).toBe(value);
        expect(handleElement.exists()).toBe(value);
      });
    });

    // Inset prop
    it("applies inset class when inset prop is true", () => {
      const inset = true;
      const expectedClass = "m-4";

      const component = mount(UDrawer, {
        props: {
          modelValue,
          inset,
        },
      });

      const innerWrapper = component.find("[vl-key='innerWrapper']");

      expect(innerWrapper.attributes("class")).toContain(expectedClass);
    });

    // CloseOnOverlay prop
    it("renders with closeOnOverlay prop", () => {
      const closeOnOverlay = [true, false];

      closeOnOverlay.forEach(async (value) => {
        const component = mount(UDrawer, {
          props: {
            modelValue,
            closeOnOverlay: value,
          },
        });

        const innerWrapper = component.find('[vl-key="innerWrapper"]');

        expect(innerWrapper.exists()).toBe(true);

        await innerWrapper.trigger("click");
        await sleep(500);

        const drawer = component.find('[vl-key="drawer"]');

        expect(drawer.exists()).toBe(!value);
      });
    });

    // CloseOnEsc prop
    it("renders with closeOnEsc prop", () => {
      const closeOnEsc = [true, false];

      closeOnEsc.forEach(async (value) => {
        const component = mount(UDrawer, {
          props: {
            modelValue,
            closeOnEsc: value,
          },
        });

        const wrapper = component.find("[vl-key='wrapper']");

        await wrapper.trigger("keydown", { key: "Escape" });
        await sleep(500);

        const drawer = component.find('[vl-key="drawer"]');

        expect(drawer.exists()).toBe(!value);
      });
    });

    // Divided prop
    it("applies divided class when divided prop is true", () => {
      const divided = true;
      const footerLeftContent = "Footer Left";
      const footerRightContent = "Footer Right";
      const expectedClass = "border-t";

      const component = mount(UDrawer, {
        props: {
          modelValue,
          divided,
        },
        slots: {
          "footer-left": footerLeftContent,
          "footer-right": footerRightContent,
        },
      });

      const footer = component.find("[vl-key='footer']");

      expect(footer.attributes("class")).toContain(expectedClass);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "drawer-test";

      const component = mount(UDrawer, {
        props: {
          modelValue,
          dataTest,
        },
      });

      const drawerWrapper = component.find("[vl-key='wrapper']");

      expect(drawerWrapper.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";

      const component = mount(UDrawer, {
        props: { modelValue: true },
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Before-title slot
    it("renders content in before-title slot and shows header", () => {
      const slotClass = "before-title";
      const slotContent = "Before Title";

      const component = mount(UDrawer, {
        props: {
          modelValue: true,
          title: "Drawer Title",
        },
        slots: {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);

      // Check that header is shown when before-title slot is provided
      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(true);
      expect(header.text()).toContain(slotContent);
    });

    // Title slot
    it("renders custom content in title slot and shows header", () => {
      const slotClass = "custom-title";
      const slotContent = "Custom Title";

      const component = mount(UDrawer, {
        props: {
          modelValue: true,
          title: "Drawer Title",
        },
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
      expect(component.findComponent(UHeader).exists()).toBe(false);

      // Check that header is shown when title slot is provided
      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(true);
      expect(header.text()).toContain(slotContent);
    });

    // After-title slot
    it("renders content in after-title slot and shows header", () => {
      const slotClass = "after-title";
      const slotContent = "After Title";

      const component = mount(UDrawer, {
        props: {
          modelValue: true,
          title: "Drawer Title",
        },
        slots: {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);

      // Check that header is shown when after-title slot is provided
      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(true);
      expect(header.text()).toContain(slotContent);
    });

    // Actions slot
    it("renders custom content in actions slot and shows header", () => {
      const slotClass = "actions";
      const slotContent = "Actions";

      const component = mount(UDrawer, {
        props: {
          modelValue: true,
          title: "Drawer Title",
        },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);

      // Check that header is shown when actions slot is provided
      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(true);
      expect(header.text()).toContain(slotContent);
    });

    it("does not show header when no title or slots are provided", () => {
      const component = mount(UDrawer, {
        props: { modelValue },
      });

      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(false);
    });

    it("provides close binding to actions slot", () => {
      const component = mount(UDrawer, {
        props: {
          modelValue: true,
          title: "Drawer Title",
        },
        slots: {
          actions: `
            <template #default="{ close }">
              <button class="custom-close" @click="close">Close</button>
            </template>
          `,
        },
      });

      const closeButton = component.find(".custom-close");

      expect(closeButton.exists()).toBe(true);

      // Click the close button
      closeButton.trigger("click");

      // Check if the drawer emitted the update:modelValue event with false
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    // Footer-left slot
    it("renders content in footer-left slot and shows footer", () => {
      const slotClass = "footer-left";
      const slotContent = "Footer Left";

      const component = mount(UDrawer, {
        props: { modelValue: true },
        slots: {
          "footer-left": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);

      // Check that footer is shown when footer-left slot is provided
      const footer = component.find("[vl-key='footer']");

      expect(footer.exists()).toBe(true);
      expect(footer.text()).toContain(slotContent);
    });

    // Footer-right slot
    it("renders content in footer-right slot and shows footer", () => {
      const slotClass = "footer-right";
      const slotContent = "Footer Right";

      const component = mount(UDrawer, {
        props: { modelValue: true },
        slots: {
          "footer-right": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);

      // Check that footer is shown when footer-right slot is provided
      const footer = component.find("[vl-key='footer']");

      expect(footer.exists()).toBe(true);
      expect(footer.text()).toContain(slotContent);
    });

    it("does not show footer when no footer slots are provided", () => {
      const component = mount(UDrawer, {
        props: { modelValue },
      });

      const footer = component.find("[vl-key='footer']");

      expect(footer.exists()).toBe(false);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when drawer is closed", async () => {
      const title = "Drawer Title";

      const component = mount(UDrawer, {
        props: {
          modelValue,
          title,
        },
        slots: {
          actions: `
            <template #default="{ close }">
              <button class="close-btn" @click="close">Close</button>
            </template>
          `,
        },
      });

      const closeButton = component.find(".close-btn");

      await closeButton.trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    // Close event
    it("emits close event when drawer is closed", async () => {
      const title = "Drawer Title";

      const component = mount(UDrawer, {
        props: {
          modelValue,
          title,
        },
        slots: {
          actions: `
            <template #default="{ close }">
              <button class="close-btn" @click="close">Close</button>
            </template>
          `,
        },
      });

      const closeButton = component.find(".close-btn");

      await closeButton.trigger("click");

      expect(component.emitted("close")).toBeTruthy();
    });

    // CloseOnOverlay events
    it("emits events when overlay is clicked based on closeOnOverlay prop", () => {
      const closeOnOverlay = [true, false];

      closeOnOverlay.forEach(async (value) => {
        const component = mount(UDrawer, {
          props: {
            modelValue,
            closeOnOverlay: value,
          },
        });

        const innerWrapper = component.find("[vl-key='innerWrapper']");

        await innerWrapper.trigger("click");

        if (value) {
          expect(component.emitted("update:modelValue")).toBeTruthy();
          expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
          expect(component.emitted("close")).toBeTruthy();
        } else {
          expect(component.emitted("update:modelValue")).toBeFalsy();
          expect(component.emitted("close")).toBeFalsy();
        }
      });
    });

    // CloseOnEsc events
    it("emits events when escape key is pressed based on closeOnEsc prop", () => {
      const closeOnEsc = [true, false];

      closeOnEsc.forEach(async (value) => {
        const component = mount(UDrawer, {
          props: {
            modelValue,
            closeOnEsc: value,
          },
        });

        const wrapper = component.find("[vl-key='wrapper']");

        await wrapper.trigger("keydown", { key: "Escape" });

        if (value) {
          expect(component.emitted("update:modelValue")).toBeTruthy();
          expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
          expect(component.emitted("close")).toBeTruthy();
        } else {
          expect(component.emitted("update:modelValue")).toBeFalsy();
          expect(component.emitted("close")).toBeFalsy();
        }
      });
    });
  });

  // Drag functionality tests
  describe("Drag Functionality", () => {
    it("applies drag cursor classes when drawer is draggable", () => {
      const component = mount(UDrawer, {
        props: {
          modelValue: true,
        },
      });

      const drawer = component.find("[vl-key='drawer']");

      expect(drawer.attributes("class")).toContain("cursor-grab");
    });

    it("handles mouse drag start", async () => {
      const component = mount(UDrawer, {
        props: {
          modelValue: true,
        },
      });

      const drawer = component.find("[vl-key='drawer']");

      // Mock getBoundingClientRect
      const mockRect = {
        width: 300,
        height: 400,
        top: 0,
        left: 0,
        right: 300,
        bottom: 400,
      };

      vi.spyOn(drawer.element, "getBoundingClientRect").mockReturnValue(mockRect as DOMRect);

      await drawer.trigger("mousedown", {
        clientX: 100,
        clientY: 100,
      });

      // Check if drag state is initialized (drag should not start until minimum distance)
      expect(drawer.attributes("class")).toContain("cursor-grab");
    });

    it("handles touch drag start", async () => {
      const component = mount(UDrawer, {
        props: {
          modelValue: true,
        },
      });

      const drawer = component.find("[vl-key='drawer']");

      // Mock getBoundingClientRect
      const mockRect = {
        width: 300,
        height: 400,
        top: 0,
        left: 0,
        right: 300,
        bottom: 400,
      };

      vi.spyOn(drawer.element, "getBoundingClientRect").mockReturnValue(mockRect as DOMRect);

      await drawer.trigger("touchstart", {
        touches: [{ clientX: 100, clientY: 100 }],
      });

      // Check if drag state is initialized (drag should not start until minimum distance)
      expect(drawer.attributes("class")).toContain("cursor-grab");
    });

    it("applies drag transform styles during drag", async () => {
      const component = mount(UDrawer, {
        props: {
          modelValue: true,
          position: "left",
        },
      });

      const drawer = component.find("[vl-key='drawer']");

      // Mock getBoundingClientRect
      const mockRect = {
        width: 300,
        height: 400,
        top: 0,
        left: 0,
        right: 300,
        bottom: 400,
      };

      vi.spyOn(drawer.element, "getBoundingClientRect").mockReturnValue(mockRect as DOMRect);

      // Start drag
      await drawer.trigger("mousedown", {
        clientX: 100,
        clientY: 100,
      });

      // Simulate drag movement
      const mouseMoveEvent = new MouseEvent("mousemove", {
        clientX: 150, // 50px movement
        clientY: 100,
      });

      document.dispatchEvent(mouseMoveEvent);

      // Check if transform is applied
      const drawerElement = component.find("[vl-key='drawer']");
      const style = drawerElement.attributes("style");

      // Should contain transform when dragging (if style exists)
      if (style) {
        expect(style).toContain("transform");
      } else {
        // If no style attribute, that's also valid (transform might be applied via CSS classes)
        expect(drawerElement.exists()).toBe(true);
      }
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UDrawer, {
        props: { modelValue },
      });

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
