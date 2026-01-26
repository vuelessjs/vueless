import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

import UModal from "../UModal.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UButton from "../../ui.button/UButton.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";
import type { UnknownObject } from "../../types";

// Create a mock router for testing router-link functionality
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: { template: "<div>Home</div>" } },
    { path: "/back", name: "back", component: { template: "<div>Back</div>" } },
  ],
});

// Helper function to mount component with router
const mountWithRouter = (component: unknown, options: UnknownObject) => {
  return mount(component, {
    ...options,
    global: {
      plugins: [router],
      ...(options.global || {}),
    },
  });
};

describe("UModal", () => {
  const modelValue = true;

  // Wait for an async component to load
  function sleep(ms: number = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("renders when modelValue is true", () => {
      const component = mount(UModal, {
        props: {
          modelValue,
        },
      });

      expect(component.isVisible()).toBe(modelValue);
    });

    it("does not render when modelValue is false", () => {
      const modelValue = false;

      const component = mount(UModal, {
        props: {
          modelValue,
        },
      });

      expect(component.find("[vl-key='overlay']").exists()).toBe(modelValue);
    });

    // Title prop
    it("renders with title prop", () => {
      const title = "Modal Title";

      const component = mount(UModal, {
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
      const title = "Modal Title";
      const description = "Modal Description";

      const component = mount(UModal, {
        props: {
          modelValue,
          title,
          description,
        },
      });

      expect(component.text()).toContain(description);
    });

    // Variant prop
    it("applies correct variant classes", () => {
      const variants = {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
      };

      Object.entries(variants).forEach(([variant, expectedClasses]) => {
        const component = mount(UModal, {
          props: {
            modelValue,
            variant: variant as Props["variant"],
          },
        });

        expect(component.find("[vl-key='modal']").attributes("class")).toContain(expectedClasses);
      });
    });

    // Size prop
    it("applies correct size classes", () => {
      const sizes = {
        xs: "md:w-[25rem]",
        sm: "md:w-[31.25rem]",
        md: "md:w-[37.5rem]",
        lg: "md:w-[43.75rem]",
        xl: "md:w-[50rem]",
        "2xl": "md:w-[56.25rem]",
        "3xl": "md:w-[62.5rem]",
        "4xl": "md:w-[68.75rem]",
        "5xl": "md:w-[75rem]",
      };

      Object.entries(sizes).forEach(([size, expectedClass]) => {
        const component = mount(UModal, {
          props: {
            modelValue,
            size: size as Props["size"],
          },
        });

        expect(component.find("[vl-key='modal']").attributes("class")).toContain(expectedClass);
      });
    });

    // BackTo and BackLabel props
    it("renders back link when backTo and backLabel are provided", () => {
      const title = "Modal Title";
      const backTo = "/back";
      const backLabel = "Back to previous page";

      const component = mountWithRouter(UModal, {
        props: {
          modelValue,
          title,
          backTo,
          backLabel,
        },
      });

      const backLink = component.findComponent(ULink);
      const backIcon = component.findComponent(UIcon);

      expect(backLink.exists()).toBe(true);
      expect(backIcon.exists()).toBe(true);
      expect(backLink.props("to")).toBe(backTo);
      expect(backLink.props("label")).toBe(backLabel);
    });

    // CloseOnCross prop
    it("renders close button when closeOnCross is true", () => {
      const title = "Modal Title";
      const closeOnCross = [true, false];

      closeOnCross.forEach((value) => {
        const component = mount(UModal, {
          props: {
            modelValue,
            title,
            closeOnCross: value,
          },
        });

        const closeButton = component.findComponent(UButton);

        expect(closeButton.exists()).toBe(value);
      });
    });

    // CloseOnOverlay prop
    it("renders with closeOnOverlay prop", () => {
      const closeOnOverlay = [true, false];

      closeOnOverlay.forEach(async (value) => {
        const component = mount(UModal, {
          props: {
            modelValue,
            closeOnOverlay: value,
          },
        });

        const innerWrapper = component.find('[vl-key="innerWrapper"]');

        expect(innerWrapper.exists()).toBe(true);

        await innerWrapper.trigger("mousedown");
        await innerWrapper.trigger("click");
        await sleep(1000);

        const modal = component.find('[vl-key="modal"]');

        expect(modal.exists()).toBe(!value);
      });
    });

    // CloseOnEsc prop
    it("renders with closeOnEsc prop", () => {
      const closeOnEsc = [true, false];

      closeOnEsc.forEach(async (value) => {
        const component = mount(UModal, {
          props: {
            modelValue,
            closeOnEsc: value,
          },
        });

        const wrapper = component.find("[vl-key='wrapper']");

        await wrapper.trigger("keydown", { key: "Escape" });
        await sleep(1000);

        const modal = component.find('[vl-key="modal"]');

        expect(modal.exists()).toBe(!value);
      });
    });

    // Inner prop
    it("applies inner class when inner prop is true", () => {
      const inner = true;
      const expectedClass = "mt-4";

      const component = mount(UModal, {
        props: {
          modelValue,
          inner,
        },
      });

      const modal = component.find("[vl-key='modal']");

      expect(modal.attributes("class")).toContain(expectedClass);
    });

    // Divided prop
    it("applies divided class when divided prop is true", () => {
      const divided = true;
      const footerLeftContent = "Footer Left";
      const footerRightContent = "Footer Right";
      const expectedClass = "border-t";

      const component = mount(UModal, {
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
      const dataTest = "modal-test";

      const component = mount(UModal, {
        props: {
          modelValue,
          dataTest,
        },
      });

      const modalWrapper = component.find("[vl-key='wrapper']");

      expect(modalWrapper.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";

      const component = mount(UModal, {
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

      const component = mount(UModal, {
        props: {
          modelValue: true,
          title: "Modal Title",
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

      const component = mount(UModal, {
        props: {
          modelValue: true,
          title: "Modal Title",
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

      const component = mount(UModal, {
        props: {
          modelValue: true,
          title: "Modal Title",
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

      const component = mount(UModal, {
        props: {
          modelValue: true,
          title: "Modal Title",
        },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
      expect(component.findComponent(UButton).exists()).toBe(false);

      // Check that header is shown when actions slot is provided

      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(true);
      expect(header.text()).toContain(slotContent);
    });

    it("does not show header when no title or slots are provided", () => {
      const component = mount(UModal, {
        props: { modelValue },
      });

      const header = component.find("[vl-key='header']");

      expect(header.exists()).toBe(false);
    });

    it("provides icon-name and close bindings to actions slot", () => {
      const component = mount(UModal, {
        props: {
          modelValue: true,
          title: "Modal Title",
        },
        slots: {
          actions: `
            <template #default="{ iconName, close }">
              <button class="custom-close" :data-icon="iconName" @click="close">Close</button>
            </template>
          `,
        },
      });

      const closeButton = component.find(".custom-close");

      expect(closeButton.exists()).toBe(true);
      expect(closeButton.attributes("data-icon")).toBe("close");

      // Click the close button
      closeButton.trigger("click");

      // Check if the modal emitted the update:modelValue event with false
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    // Footer-left slot
    it("renders content in footer-left slot and shows footer", () => {
      const slotClass = "footer-left";
      const slotContent = "Footer Left";

      const component = mount(UModal, {
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

      const component = mount(UModal, {
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
      const component = mount(UModal, {
        props: { modelValue },
      });

      const footer = component.find("[vl-key='footer']");

      expect(footer.exists()).toBe(false);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when modal is closed", async () => {
      const title = "Modal Title";
      const closeOnCross = true;

      const component = mount(UModal, {
        props: {
          modelValue,
          title,
          closeOnCross,
        },
      });

      const closeButton = component.findComponent(UButton);

      await closeButton.trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    it("emits back event when back link is clicked", async () => {
      const title = "Modal Title";
      const backTo = "/back";
      const backLabel = "Back to previous page";

      const component = mountWithRouter(UModal, {
        props: {
          modelValue,
          title,
          backTo,
          backLabel,
        },
      });

      const backLink = component.findComponent(ULink);

      await backLink.trigger("click");

      expect(component.emitted("back")).toBeTruthy();
    });

    // Close event
    it("emits close event when modal is closed", async () => {
      const title = "Modal Title";
      const closeOnCross = true;

      const component = mount(UModal, {
        props: {
          modelValue,
          title,
          closeOnCross,
        },
      });

      const closeButton = component.findComponent(UButton);

      await closeButton.trigger("click");

      expect(component.emitted("close")).toBeTruthy();
    });

    // CloseOnOverlay events
    it("emits events when overlay is clicked based on closeOnOverlay prop", () => {
      const closeOnOverlay = [true, false];

      closeOnOverlay.forEach(async (value) => {
        const component = mount(UModal, {
          props: {
            modelValue,
            closeOnOverlay: value,
          },
        });

        const innerWrapper = component.find("[vl-key='innerWrapper']");

        await innerWrapper.trigger("mousedown");
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

    it("does not close when mousedown on modal and mouseup on overlay", async () => {
      const component = mount(UModal, {
        props: {
          modelValue: true,
          closeOnOverlay: true,
        },
      });

      const modal = component.find("[vl-key='modal']");
      const innerWrapper = component.find("[vl-key='innerWrapper']");

      // Mousedown on modal content
      await modal.trigger("mousedown");
      // Click (mouseup) on overlay
      await innerWrapper.trigger("click");

      // Modal should NOT close
      expect(component.emitted("update:modelValue")).toBeFalsy();
      expect(component.emitted("close")).toBeFalsy();
    });

    // CloseOnEsc events
    it("emits events when escape key is pressed based on closeOnEsc prop", () => {
      const closeOnEsc = [true, false];

      closeOnEsc.forEach(async (value) => {
        const component = mount(UModal, {
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

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UModal, {
        props: { modelValue },
      });

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
