import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputPassword from "../UInputPassword.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UInputPassword.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("sets the input value correctly", () => {
      const modelValue = "password123";

      const component = mount(UInputPassword, {
        props: {
          modelValue,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("modelValue")).toBe(modelValue);
    });

    // Label prop
    it("passes the label prop to UInput", () => {
      const label = "Password";

      const component = mount(UInputPassword, {
        props: {
          label,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("label")).toBe(label);
    });

    // LabelAlign prop
    it("passes the labelAlign prop to UInput", () => {
      const labelAligns = {
        topInside: "topInside",
        top: "top",
        topWithDesc: "topWithDesc",
        left: "left",
        right: "right",
      };

      Object.entries(labelAligns).forEach(([labelAlign, value]) => {
        const component = mount(UInputPassword, {
          props: {
            labelAlign: labelAlign as Props["labelAlign"],
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("labelAlign")).toBe(value);
      });
    });

    // Placeholder prop
    it("passes the placeholder prop to UInput", () => {
      const placeholder = "Enter password";

      const component = mount(UInputPassword, {
        props: {
          placeholder,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("placeholder")).toBe(placeholder);
    });

    // Description prop
    it("passes the description prop to UInput", () => {
      const description = "Password must be at least 8 characters";

      const component = mount(UInputPassword, {
        props: {
          description,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("description")).toBe(description);
    });

    // Error prop
    it("passes the error prop to UInput", () => {
      const error = "Password is required";

      const component = mount(UInputPassword, {
        props: {
          error,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("error")).toBe(error);
    });

    // Size prop
    it("passes the size prop to UInput", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      Object.entries(sizes).forEach(([size, value]) => {
        const component = mount(UInputPassword, {
          props: {
            size: size as Props["size"],
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("size")).toBe(value);
      });
    });

    // LeftIcon prop
    it("passes the leftIcon prop to UInput", () => {
      const leftIcon = "lock";

      const component = mount(UInputPassword, {
        props: {
          leftIcon,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("leftIcon")).toBe(leftIcon);
    });

    // MaxLength prop
    it("passes the maxLength prop to UInput", () => {
      const maxLength = 20;

      const component = mount(UInputPassword, {
        props: {
          maxLength,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("maxLength")).toBe(maxLength);
    });

    // Readonly prop
    it("passes the readonly prop to UInput", () => {
      const readonly = true;

      const component = mount(UInputPassword, {
        props: {
          readonly,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("readonly")).toBe(readonly);
    });

    // Disabled prop
    it("passes the disabled prop to UInput", () => {
      const disabled = true;

      const component = mount(UInputPassword, {
        props: {
          disabled,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("disabled")).toBe(disabled);
    });

    // DataTest prop
    it("sets the data-test attribute correctly on the password icon", () => {
      const dataTest = "test-password-input";

      const component = mount(UInputPassword, {
        props: {
          dataTest,
        },
      });

      // Find the UIcon component
      const passwordIcon = component.findComponent(UIcon);

      // Check that the data-test prop is set correctly
      expect(passwordIcon.attributes("data-test")).toBe(`${dataTest}-password-icon`);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when input value changes", async () => {
      const modelValue = "password123";
      const newValue = "newpassword456";

      const component = mount(UInputPassword, {
        props: {
          modelValue,
        },
      });

      const input = component.findComponent(UInput);

      await input.vm.$emit("update:modelValue", newValue);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([newValue]);
    });
  });

  // Functionality tests
  describe("Functionality", () => {
    // Password visibility toggle
    it("toggles password visibility when the icon is clicked", async () => {
      const component = mount(UInputPassword, {
        attachTo: document.body, // Attach to DOM for more realistic event handling
      });

      // Initially, the input type should be password
      const input = component.findComponent(UInput);

      expect(input.props("type")).toBe("password");

      // Find the password icon and trigger the click event directly on the DOM element
      const passwordIcon = component.findComponent(UIcon);
      const iconElement = passwordIcon.element as HTMLElement;

      await iconElement.click();
      await component.vm.$nextTick();

      // After clicking, the input type should be text
      expect(input.props("type")).toBe("text");

      // Click again to toggle back
      await iconElement.click();
      await component.vm.$nextTick();

      // Should be back to password
      expect(input.props("type")).toBe("password");
    });

    // Password icon changes
    it("changes the icon when password visibility is toggled", async () => {
      const component = mount(UInputPassword, {
        attachTo: document.body, // Attach to DOM for more realistic event handling
      });

      // Initially, the icon should be the hidden icon
      let passwordIcon = component.findComponent(UIcon);

      expect(passwordIcon.props("name")).toBe("visibility_off-fill");

      // Click to toggle visibility using the DOM element
      const iconElement = passwordIcon.element as HTMLElement;

      await iconElement.click();
      await component.vm.$nextTick();

      // Icon should change to the visible icon
      passwordIcon = component.findComponent(UIcon);
      expect(passwordIcon.props("name")).toBe("visibility-fill");
    });

    // Disabled state
    it("disables the password icon when the input is disabled", () => {
      const disabled = true;

      const component = mount(UInputPassword, {
        props: {
          disabled,
        },
      });

      const passwordIcon = component.findComponent(UIcon);

      // Check if the class attribute contains the disabled classes
      // The classes are applied through the passwordIconAttrs binding
      const classAttr = passwordIcon.attributes("class") || "";

      expect(classAttr).toContain("text-muted");
      expect(classAttr).toContain("pointer-events-none");
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content in the left slot", () => {
      const leftSlotContent = "Left slot content";

      const component = mount(UInputPassword, {
        slots: {
          left: `<div class="left-slot-test">${leftSlotContent}</div>`,
        },
      });

      const leftSlot = component.find(".left-slot-test");

      expect(leftSlot.exists()).toBe(true);
      expect(leftSlot.text()).toBe(leftSlotContent);
    });

    // Right slot
    it("renders content in the right slot", () => {
      const rightSlotContent = "Right slot content";

      const component = mount(UInputPassword, {
        slots: {
          right: `<div class="right-slot-test">${rightSlotContent}</div>`,
        },
      });

      const rightSlot = component.find(".right-slot-test");

      expect(rightSlot.exists()).toBe(true);
      expect(rightSlot.text()).toBe(rightSlotContent);
    });

    // Right slot with bindings
    it("provides correct bindings to the right slot", async () => {
      const component = mount(UInputPassword, {
        slots: {
          right: `
            <template #right="{ iconName, visible, toggle }">
              <button
                class="custom-toggle-button"
                :data-icon-name="iconName"
                :data-visible="visible"
                @click="toggle"
              >
                Toggle
              </button>
            </template>
          `,
        },
      });

      const toggleButton = component.find(".custom-toggle-button");

      expect(toggleButton.exists()).toBe(true);
      expect(toggleButton.attributes("data-icon-name")).toBe("visibility_off-fill");
      expect(toggleButton.attributes("data-visible")).toBe("false");

      // Click the button to toggle visibility
      await toggleButton.trigger("click");

      // Check that the visibility state changed
      expect(toggleButton.attributes("data-visible")).toBe("true");
      expect(toggleButton.attributes("data-icon-name")).toBe("visibility-fill");
    });
  });
});
