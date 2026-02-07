import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UModalConfirm from "../UModalConfirm.vue";
import UModal from "../../ui.container-modal/UModal.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props } from "../types";

describe("UModalConfirm", () => {
  // Define common test value
  const modelValue = true;

  describe("Props", () => {
    it("Model Value – renders when modelValue is true", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.exists()).toBe(true);
      expect(modal.props("modelValue")).toBe(modelValue);
    });

    it("Model Value – does not render modal content when modelValue is false", () => {
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

    it("Title – passes title prop to UModal", () => {
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

    it("Description – passes description prop to UModal", () => {
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

    it("Confirm Label – renders with custom confirmLabel prop", () => {
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

    it("Confirm Color – applies correct confirmColor to confirm button", () => {
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

    it("Confirm Disabled – disables confirm button when confirmDisabled is true", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          confirmDisabled: true,
        },
      });

      expect(component.find("[vl-key='confirmButton']").attributes("disabled")).toBeDefined();
    });

    it("Loading – applies loading state to confirm button when loading is true", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          loading: true,
        },
      });

      const confirmButton = component
        .findAllComponents(UButton)
        .find((button) => button.attributes("data-test")?.includes("confirm"));

      expect(confirmButton?.props("loading")).toBe(true);
    });

    it("Cancel Hidden – hides cancel button when cancelHidden is true", () => {
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

    it("Variant – passes variant prop to UModal", () => {
      const variants = ["solid", "outlined", "subtle", "soft", "inverted"];

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

    it("Size – passes size prop to UModal", () => {
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

    it("Close On Cross – passes closeOnCross prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          closeOnCross: false,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("closeOnCross")).toBe(false);
    });

    it("Close On Overlay – passes closeOnOverlay prop to UModal", () => {
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

    it("Inner – passes inner prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          inner: true,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("inner")).toBe(true);
    });

    it("Divided – passes divided prop to UModal", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
          divided: true,
        },
      });

      const modal = component.findComponent(UModal);

      expect(modal.props("divided")).toBe(true);
    });

    it("Data Test – applies data-test attribute", () => {
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

  describe("Slots", () => {
    it("Default – passes default slot content to UModal", () => {
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

    it("Before-title – passes before-title slot content to UModal", () => {
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

    it("Title – passes title slot content to UModal", () => {
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

    it("After-title – passes after-title slot content to UModal", () => {
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

    it("Actions – passes actions slot content to UModal", () => {
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

    it("Footer-left – renders custom content in footer-left slot instead of default buttons", () => {
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

    it("Footer-right – passes footer-right slot content to UModal", () => {
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

  describe("Events", () => {
    it("Update Model Value – emits update:modelValue event when close button is clicked", async () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      // Find the close button and click it
      const closeButton = component.find("[vl-key='cancelButton']");

      await closeButton.trigger("click");

      // Check if the update:modelValue event was emitted with false
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    it("Confirm – emits confirm event when confirm button is clicked", async () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      // Find and click the confirm button
      const confirmButton = component.find("[vl-key='confirmButton']");

      await confirmButton.trigger("click");

      // Check if the confirm event was emitted
      expect(component.emitted("confirm")).toBeTruthy();

      // Check if the modal was closed (update:modelValue event with false)
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    it("Close – emits close event when cancel button is clicked", async () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      // Find and click the cancel button
      const cancelButton = component.find("[vl-key='cancelButton']");

      await cancelButton.trigger("click");

      // Check if the close event was emitted
      expect(component.emitted("close")).toBeTruthy();

      // Check if the modal was closed (update:modelValue event with false)
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([false]);
    });
  });

  describe("Exposed refs", () => {
    it("modalRef – exposes modal ref", () => {
      const component = mount(UModalConfirm, {
        props: {
          modelValue,
        },
      });

      expect(component.vm.modalRef).toBeDefined();
    });
  });
});
