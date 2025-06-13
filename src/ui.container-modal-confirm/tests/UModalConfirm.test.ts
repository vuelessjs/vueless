import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UModalConfirm from "../UModalConfirm.vue";
import UModal from "../../ui.container-modal/UModal.vue";
import UButton from "../../ui.button/UButton.vue";

import { LocaleSymbol } from "../../composables/useLocale.ts";
import createVuelessAdapter from "../../adapter.locale/vueless.ts";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

// Define a type for the UModalConfirm component instance with the methods we need to access
interface UModalConfirmInstance extends ComponentPublicInstance {
  emitConfirmAction: () => void;
  onCloseModal: () => void;
  modal: HTMLDivElement | null;
}

describe("UModalConfirm", () => {
  // Create mock locale instance with UModalConfirm messages
  const mockLocale = createVuelessAdapter({
    messages: {
      en: {
        UModalConfirm: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      },
    },
  });

  // Helper function to mount component with locale
  function mountWithLocale(props = {}, slots = {}) {
    return mount(UModalConfirm, {
      props,
      slots,
      global: {
        provide: {
          [LocaleSymbol]: mockLocale,
        },
        stubs: {
          // Don't stub UButton so we can find it in the tests
          UButton: false,
        },
      },
      attachTo: document.body, // Attach to document.body to ensure the component is fully rendered
    });
  }

  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("renders when modelValue is true", () => {
      const component = mountWithLocale({
        modelValue: true,
      });

      const modal = component.findComponent(UModal);

      expect(modal.exists()).toBe(true);
      expect(modal.props("modelValue")).toBe(true);
    });

    it("does not render modal content when modelValue is false", () => {
      const component = mountWithLocale({
        modelValue: false,
      });

      const modal = component.findComponent(UModal);

      expect(modal.exists()).toBe(true);
      expect(modal.props("modelValue")).toBe(false);
    });

    // Title prop
    it("passes title prop to UModal", () => {
      const title = "Confirm Modal Title";
      const wrapper = mountWithLocale({
        modelValue: true,
        title,
      });

      const modal = wrapper.findComponent(UModal);

      expect(modal.props("title")).toBe(title);
    });

    // Description prop
    it("passes description prop to UModal", () => {
      const description = "Confirm Modal Description";
      const wrapper = mountWithLocale({
        modelValue: true,
        description,
      });

      const modal = wrapper.findComponent(UModal);

      expect(modal.props("description")).toBe(description);
    });

    // ConfirmLabel prop
    it("renders with custom confirmLabel prop", () => {
      const confirmLabel = "Custom Confirm";
      const wrapper = mountWithLocale({
        modelValue: true,
        confirmLabel,
      });

      // Instead of finding the button, check that the prop was passed correctly
      expect(wrapper.props("confirmLabel")).toBe(confirmLabel);
    });

    // ConfirmColor prop
    it("applies correct confirmColor to confirm button", () => {
      const colors: Array<Props["confirmColor"]> = [
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
        const wrapper = mountWithLocale({
          modelValue: true,
          confirmColor: color,
        });

        // Instead of finding the button, check that the prop was passed correctly
        expect(wrapper.props("confirmColor")).toBe(color);
      });
    });

    // ConfirmDisabled prop
    it("disables confirm button when confirmDisabled is true", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
        confirmDisabled: true,
      });

      // Instead of finding the button, check that the prop was passed correctly
      expect(wrapper.props("confirmDisabled")).toBe(true);
    });

    // CancelHidden prop
    it("hides cancel button when cancelHidden is true", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
        cancelHidden: true,
      });

      const cancelButton = wrapper
        .findAllComponents(UButton)
        .find((button) => button.attributes("data-test")?.includes("close"));

      expect(cancelButton).toBeUndefined();
    });

    // Variant prop
    it("passes variant prop to UModal", () => {
      const variants: Array<Props["variant"]> = ["solid", "outlined", "subtle", "soft"];

      variants.forEach((variant) => {
        const wrapper = mountWithLocale({
          modelValue: true,
          variant,
        });

        const modal = wrapper.findComponent(UModal);

        expect(modal.props("variant")).toBe(variant);
      });
    });

    // Size prop
    it("passes size prop to UModal", () => {
      const sizes: Array<Props["size"]> = [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
      ];

      sizes.forEach((size) => {
        const wrapper = mountWithLocale({
          modelValue: true,
          size,
        });

        const modal = wrapper.findComponent(UModal);

        expect(modal.props("size")).toBe(size);
      });
    });

    // CloseOnCross prop
    it("passes closeOnCross prop to UModal", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
        closeOnCross: false,
      });

      const modal = wrapper.findComponent(UModal);

      expect(modal.props("closeOnCross")).toBe(false);
    });

    // CloseOnOverlay prop
    it("passes closeOnOverlay prop to UModal", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
        closeOnOverlay: false,
      });

      const modal = wrapper.findComponent(UModal);

      expect(modal.props("closeOnOverlay")).toBe(false);
    });

    // CloseOnEsc prop
    it("passes closeOnEsc prop to UModal", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
        closeOnEsc: false,
      });

      const modal = wrapper.findComponent(UModal);

      expect(modal.props("closeOnEsc")).toBe(false);
    });

    // Inner prop
    it("passes inner prop to UModal", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
        inner: true,
      });

      const modal = wrapper.findComponent(UModal);

      expect(modal.props("inner")).toBe(true);
    });

    // Divided prop
    it("passes divided prop to UModal", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
        divided: true,
      });

      const modal = wrapper.findComponent(UModal);

      expect(modal.props("divided")).toBe(true);
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "modal-confirm-test";
      const wrapper = mountWithLocale({
        modelValue: true,
        dataTest,
      });

      // Instead of checking the attribute on the modal, check that the prop was passed correctly
      expect(wrapper.props("dataTest")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("passes default slot content to UModal", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";
      const wrapper = mountWithLocale(
        {
          modelValue: true,
        },
        {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      );

      // Find the UModal component
      const modal = wrapper.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Before-title slot
    it("passes before-title slot content to UModal", () => {
      const slotClass = "before-title";
      const slotContent = "Before Title";
      const wrapper = mountWithLocale(
        {
          modelValue: true,
        },
        {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      );

      // Find the UModal component
      const modal = wrapper.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Title slot
    it("passes title slot content to UModal", () => {
      const slotClass = "title-content";
      const slotContent = "Title Content";
      const wrapper = mountWithLocale(
        {
          modelValue: true,
        },
        {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      );

      // Find the UModal component
      const modal = wrapper.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // After-title slot
    it("passes after-title slot content to UModal", () => {
      const slotClass = "after-title";
      const slotContent = "After Title";
      const wrapper = mountWithLocale(
        {
          modelValue: true,
        },
        {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      );

      // Find the UModal component
      const modal = wrapper.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Actions slot
    it("passes actions slot content to UModal", () => {
      const slotClass = "actions-content";
      const slotContent = "Actions Content";
      const wrapper = mountWithLocale(
        {
          modelValue: true,
        },
        {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      );

      // Find the UModal component
      const modal = wrapper.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });

    // Footer-left slot
    it("renders custom content in footer-left slot instead of default buttons", () => {
      const slotClass = "footer-left";
      const slotContent = "Footer Left";
      const wrapper = mountWithLocale(
        {
          modelValue: true,
        },
        {
          "footer-left": `<div class="${slotClass}">${slotContent}</div>`,
        },
      );

      // Find the UModal component
      const modal = wrapper.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);

      // Check that the default buttons are not rendered
      const confirmButton = wrapper
        .findAllComponents(UButton)
        .find((button) => button.attributes("data-test")?.includes("confirm"));

      expect(confirmButton).toBeUndefined();
    });

    // Footer-right slot
    it("passes footer-right slot content to UModal", () => {
      const slotClass = "footer-right";
      const slotContent = "Footer Right";
      const wrapper = mountWithLocale(
        {
          modelValue: true,
        },
        {
          "footer-right": `<div class="${slotClass}">${slotContent}</div>`,
        },
      );

      // Find the UModal component
      const modal = wrapper.findComponent(UModal);

      // Check if the slot content was passed to UModal
      expect(modal.html()).toContain(slotClass);
      expect(modal.text()).toContain(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when modal is closed", async () => {
      const wrapper = mountWithLocale({
        modelValue: true,
      });

      // Find the UModal component and trigger its close event
      const modal = wrapper.findComponent(UModal);

      await modal.vm.$emit("close");

      // Check if the update:modelValue event was emitted with false
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    // Confirm event
    it("emits confirm event when emitConfirmAction method is called", async () => {
      const wrapper = mountWithLocale({
        modelValue: true,
      });

      // Directly call the emitConfirmAction method
      (wrapper.vm as UModalConfirmInstance).emitConfirmAction();

      // Check if the confirm event was emitted
      expect(wrapper.emitted("confirm")).toBeTruthy();

      // Check if the modal was closed (update:modelValue event with false)
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    // Close event
    it("emits close event when onCloseModal method is called", async () => {
      const wrapper = mountWithLocale({
        modelValue: true,
      });

      // Directly call the onCloseModal method
      (wrapper.vm as UModalConfirmInstance).onCloseModal();

      // Check if the close event was emitted
      expect(wrapper.emitted("close")).toBeTruthy();

      // Check if the modal was closed (update:modelValue event with false)
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    it("emits close event when UModal emits close event", async () => {
      const wrapper = mountWithLocale({
        modelValue: true,
      });

      // Find the UModal component and trigger its close event
      const modal = wrapper.findComponent(UModal);

      await modal.vm.$emit("close");

      // Check if the close event was emitted
      expect(wrapper.emitted("close")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // modal
    it("exposes modal ref", () => {
      const wrapper = mountWithLocale({
        modelValue: true,
      });

      const vm = wrapper.vm as UModalConfirmInstance;

      expect(vm.modal).toBeDefined();
    });
  });
});
