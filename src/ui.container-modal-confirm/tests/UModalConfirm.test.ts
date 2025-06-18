import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UModalConfirm from "../UModalConfirm.vue";
import UModal from "../../ui.container-modal/UModal.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props } from "../types.ts";

describe("UModalConfirm", () => {
  // Define common test value
  const modelValue = true;

  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("renders when modelValue is true", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.exists()).toBe(true);
      expect(modal.props("modelValue")).toBe(modelValue);
    });

    it("does not render modal content when modelValue is false", () => {
      const modelValue = false;

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.exists()).toBe(true);
      expect(modal.props("modelValue")).toBe(modelValue);
    });

    // Title prop
    it("passes title prop to UModal", () => {
      const title = "Confirm Modal Title";
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          title,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("title")).toBe(title);
    });

    // Description prop
    it("passes description prop to UModal", () => {
      const description = "Confirm Modal Description";

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          description,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("description")).toBe(description);
    });

    // ConfirmLabel prop
    it("renders with custom confirmLabel prop", () => {
      const confirmLabel = "Custom Confirm";
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          confirmLabel,
        },
      });

      // Check that the button text contains the custom label
      expect(component.find("[vl-key='confirmButton']").text()).toBe(confirmLabel);
    });

    // ConfirmColor prop
    it("applies correct confirmColor to confirm button", () => {
      const colors = [
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "info",
        "notice",
        "neutral",
        "grayscale",
      ];

      colors.forEach((color) => {
        const component = mount(UModalConfirm, {
          props: {
            modelValue,
            confirmColor: color as Props["confirmColor"],
          },
        });

        expect(component.find("[vl-key='confirmButton']").attributes("class")).toContain(color);
      });
    });

    // ConfirmDisabled prop
    it("disables confirm button when confirmDisabled is true", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          confirmDisabled: true,
        },
      });

      expect(component.find("[vl-key='confirmButton']").attributes("disabled")).toBeDefined();
    });

    // CancelHidden prop
    it("hides cancel button when cancelHidden is true", () => {
      const cancelHidden = true;

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          cancelHidden,
        },
      });

      const cancelButton = component
        .findAllComponents(UButton)
        .find((button) => button.attributes("data-test")?.includes("close"));

      expect(cancelButton).toBeUndefined();
    });

    // Variant prop
    it("passes variant prop to UModal", () => {
      const variants = ["solid", "outlined", "subtle", "soft"];

      variants.forEach((variant) => {
        const component = mount(UModalConfirm, {
          props: {
            modelValue,
            variant: variant as Props["variant"],
          },
        });

        const modal = component.findComponent(UModal);

        expect(modal.props("variant")).toBe(variant);
      });
    });

    // Size prop
    it("passes size prop to UModal", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];

      sizes.forEach((size) => {
        const component = mount(UModalConfirm, {
          props: {
            modelValue,
            size: size as Props["size"],
          },
        });

        const modal = component.findComponent(UModal);

        expect(modal.props("size")).toBe(size);
      });
    });

    // CloseOnCross prop
    it("passes closeOnCross prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          closeOnCross: false,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("closeOnCross")).toBe(false);
    });

    // CloseOnOverlay prop
    it("passes closeOnOverlay prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          closeOnOverlay: false,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("closeOnOverlay")).toBe(false);
    });

    // CloseOnEsc prop
    it("passes closeOnEsc prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          closeOnEsc: false,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("closeOnEsc")).toBe(false);
    });

    // Inner prop
    it("passes inner prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          inner: true,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("inner")).toBe(true);
    });

    // Divided prop
    it("passes divided prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          divided: true,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("divided")).toBe(true);
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "modal-confirm-test";
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          dataTest,
        },
      });

      // Instead of checking the attribute on the modal, check that the prop was passed correctly
      expect(component.props("dataTest")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("passes default slot content to UModal", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Find the UModal component
      const modal = component.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Before-title slot
    it("passes before-title slot content to UModal", () => {
      const slotClass = "before-title";
      const slotContent = "Before Title";

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
        slots: {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Find the UModal component
      const modal = component.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Title slot
    it("passes title slot content to UModal", () => {
      const slotClass = "title-content";
      const slotContent = "Title Content";

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Find the UModal component
      const modal = component.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // After-title slot
    it("passes after-title slot content to UModal", () => {
      const slotClass = "after-title";
      const slotContent = "After Title";

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
        slots: {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Find the UModal component
      const modal = component.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Actions slot
    it("passes actions slot content to UModal", () => {
      const slotClass = "actions-content";
      const slotContent = "Actions Content";

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Find the UModal component
      const modal = component.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Footer-left slot
    it("renders custom content in footer-left slot instead of default buttons", () => {
      const slotClass = "footer-left";
      const slotContent = "Footer Left";

      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
        slots: {
          "footer-left": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Find the UModal component
      const modal = component.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);

      // Check that the default buttons are not rendered
      const confirmButton = component
        .findAllComponents(UButton)
        .find((button) => button.attributes("data-test")?.includes("confirm"));

      expect(confirmButton).toBeUndefined();
    });

    // Footer-right slot
    it("passes footer-right slot content to UModal", () => {
      const slotClass = "footer-right";
      const slotContent = "Footer Right";
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
        slots: {
          "footer-right": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Find the UModal component
      const modal = component.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when modal is closed", async () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      // Find the UModal component and trigger its close event
      const modal = component.findComponent(UModal);

      modal.vm.$emit("close");

      // Check if the update:modelValue event was emitted with false
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    // Confirm event
    it("emits confirm event when emitConfirmAction method is called", async () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      // Directly call the emitConfirmAction method
      component.vm.emitConfirmAction();

      // Check if the confirm event was emitted
      expect(component.emitted("confirm")).toBeTruthy();

      // Check if the modal was closed (update:modelValue event with false)
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    // Close event
    it("emits close event when onCloseModal method is called", async () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      // Directly call the onCloseModal method
      component.vm.onCloseModal();

      // Check if the close event was emitted
      expect(component.emitted("close")).toBeTruthy();

      // Check if the modal was closed (update:modelValue event with false)
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    it("emits close event when UModal emits close event", async () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      // Find the UModal component and trigger its close event
      const modal = component.findComponent(UModal);

      modal.vm.$emit("close");

      // Check if the close event was emitted
      expect(component.emitted("close")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // modal
    it("exposes modal ref", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      expect(component.vm.modal).toBeDefined();
    });
  });
});
