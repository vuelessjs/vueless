import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputPassword from "../UInputPassword.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UProgress from "../../ui.navigation-progress/UProgress.vue";

import type { Props } from "../types";

describe("UInputPassword.vue", () => {
  describe("props", () => {
    it("Model Value – sets initial value correctly", () => {
      const initialValue = "password123";

      const component = mount(UInputPassword, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.get("input").element.value).toBe(initialValue);
    });

    it("Model Value – updates value on input", async () => {
      const updatedValue = "newpassword456";

      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
        },
      });

      await component.get("input").setValue(updatedValue);

      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Label – passes label to UInput", () => {
      const label = "Password";

      const component = mount(UInputPassword, {
        props: {
          label,
        },
      });

      expect(component.getComponent(UInput).props("label")).toBe(label);
    });

    it("Size – passes size to UInput", () => {
      const size = "lg";

      const component = mount(UInputPassword, {
        props: {
          size: size as Props["size"],
        },
      });

      expect(component.getComponent(UInput).props("size")).toBe(size);
    });

    it("Placeholder – passes placeholder to UInput", () => {
      const placeholder = "Enter your password";

      const component = mount(UInputPassword, {
        props: {
          placeholder,
        },
      });

      expect(component.getComponent(UInput).props("placeholder")).toBe(placeholder);
    });

    it("Label Align – passes labelAlign to UInput", () => {
      const labelAlign = "top";

      const component = mount(UInputPassword, {
        props: {
          labelAlign: labelAlign as Props["labelAlign"],
        },
      });

      expect(component.getComponent(UInput).props("labelAlign")).toBe(labelAlign);
    });

    it("Description – passes description to UInput", () => {
      const description = "Password must be at least 8 characters";

      const component = mount(UInputPassword, {
        props: {
          description,
        },
      });

      expect(component.getComponent(UInput).props("description")).toBe(description);
    });

    it("Error – passes error to UInput", () => {
      const error = "Password is required";

      const component = mount(UInputPassword, {
        props: {
          error,
        },
      });

      expect(component.getComponent(UInput).props("error")).toBe(error);
    });

    it("Left Icon – passes leftIcon to UInput", () => {
      const leftIcon = "lock";

      const component = mount(UInputPassword, {
        props: {
          leftIcon,
        },
      });

      const input = component.getComponent(UInput);

      expect(input.props("leftIcon")).toBe(leftIcon);
    });

    it("Max Length – passes maxLength to UInput", () => {
      const maxLength = 20;

      const component = mount(UInputPassword, {
        props: {
          maxLength,
        },
      });

      const input = component.getComponent(UInput);

      expect(input.props("maxLength")).toBe(maxLength);
    });

    it("Readonly – passes readonly state to UInput", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          readonly: true,
        },
      });

      const input = component.get("input");

      expect(input.attributes("readonly")).toBeDefined();
    });

    it("Disabled – passes disabled state to UInput", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          disabled: true,
        },
      });

      const input = component.get("input");

      expect(input.attributes("disabled")).toBeDefined();
    });

    it("Data Test – applies the correct data-test attribute to password icon", async () => {
      const dataTest = "password-field";

      const component = mount(UInputPassword, {
        props: {
          dataTest,
        },
      });

      await flushPromises();

      expect(component.get(`[data-test='${dataTest}-password-icon']`)).toBeTruthy();
    });
  });

  describe("Functionality", () => {
    it("Toggles password visibility icon", async () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
        },
      });

      const passwordIcon = component.getComponent(UIcon);
      const input = component.get("input");

      expect(input.attributes("type")).toBe("password");
      expect(passwordIcon.props("name")).toBe("visibility_off-fill");

      await passwordIcon.trigger("click");
      await flushPromises();

      expect(input.attributes("type")).toBe("text");
      expect(passwordIcon.props("name")).toBe("visibility-fill");

      await passwordIcon.trigger("click");
      await flushPromises();

      expect(input.attributes("type")).toBe("password");
      expect(passwordIcon.props("name")).toBe("visibility_off-fill");
    });
  });

  describe("Slots", () => {
    it("Left – renders left slot content", () => {
      const testClass = "test";
      const slotContent = `<div class='${testClass}'>Left Slot Content</div>`;

      const component = mount(UInputPassword, {
        slots: {
          left: slotContent,
        },
      });

      expect(component.get(`.${testClass}`)).toBeTruthy();
    });

    it("Left – exposes leftIcon prop", () => {
      const leftIcon = "lock";

      const component = mount(UInputPassword, {
        props: {
          leftIcon,
        },
        slots: {
          left: `Icon: {{ params.iconName }}`,
        },
      });

      expect(component.html()).toContain(`Icon: ${leftIcon}`);
    });

    it("Right – renders right slot content", () => {
      const testClass = "test";

      const component = mount(UInputPassword, {
        slots: {
          right: `<div class='${testClass}'>Right Slot Content</div>`,
        },
      });

      expect(component.get(`.${testClass}`)).toBeTruthy();
    });

    it("Right – exposes password visibility state", async () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          dataTest: "test",
        },
        slots: {
          right: `Visibility: {{ params.visible }}`,
        },
      });

      expect(component.html()).toContain("Visibility: false");
    });

    it("Right – exposes toggle function", async () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          dataTest: "test",
        },
        slots: {
          right: `Visibility: {{ params.visible }} <button @click="params.toggle">Toggle Password</button>`,
        },
      });

      const toggleButton = component.get("button");

      await toggleButton.trigger("click");

      expect(component.html()).toContain("Visibility: true");
    });

    it("Right – exposes password icon name", async () => {
      const visibilityIcon = "visibility-fill";
      const visibilityOffIcon = "visibility_off-fill";

      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          dataTest: "test",
        },
        slots: {
          right: `Icon: {{ params.iconName }} <button @click="params.toggle">Toggle Password</button>`,
        },
      });

      const toggleButton = component.get("button");

      expect(component.html()).toContain(`Icon: ${visibilityOffIcon}`);

      await toggleButton.trigger("click");

      expect(component.html()).toContain(`Icon: ${visibilityIcon}`);
    });
  });

  describe("Password Strength", () => {
    it("Strength Progress – does not show strength indicator by default", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
        },
      });

      expect(component.findComponent(UProgress).exists()).toBe(false);
    });

    it("Strength Progress – shows strength indicator when strengthProgress is true", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          strengthProgress: true,
        },
      });

      expect(component.findComponent(UProgress).exists()).toBe(true);
    });

    it("Strength Progress – does not show strength indicator when password is empty", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "",
          strengthProgress: true,
        },
      });

      expect(component.findComponent(UProgress).exists()).toBe(false);
    });

    it("Strength Progress – updates strength when password changes", async () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "weak",
          strengthProgress: true,
        },
      });

      await flushPromises();

      const progressBefore = component.getComponent(UProgress);

      expect(progressBefore.props("value")).toBe(0);
      expect(progressBefore.props("color")).toBe("error");

      await component.setProps({ modelValue: "P@ssw0rd!2024" });
      await flushPromises();

      const progressAfter = component.getComponent(UProgress);

      expect(progressAfter.props("value")).toBe(3);
      expect(progressAfter.props("color")).toBe("success");
    });

    it("Strength Progress – displays correct strength levels", async () => {
      const testCases = [
        { password: "abc", expectedValue: 0, expectedColor: "error" },
        { password: "password123", expectedValue: 1, expectedColor: "warning" },
        { password: "Password", expectedValue: 2, expectedColor: "notice" },
        { password: "P@ssw0rd!2024", expectedValue: 3, expectedColor: "success" },
      ];

      for (const testCase of testCases) {
        const component = mount(UInputPassword, {
          props: {
            modelValue: testCase.password,
            strengthProgress: true,
          },
        });

        await flushPromises();

        const progress = component.getComponent(UProgress);

        expect(progress.props("value")).toBe(testCase.expectedValue);
        expect(progress.props("color")).toBe(testCase.expectedColor);
      }
    });

    it("Strength Progress – passes correct max array with labels", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          strengthProgress: true,
        },
      });

      const progress = component.getComponent(UProgress);
      const maxProp = progress.props("max");

      expect(Array.isArray(maxProp)).toBe(true);
      expect(maxProp).toHaveLength(4);
      expect(maxProp).toEqual(["Weak", "Fair", "Good", "Strong"]);
    });

    it("Strength Progress – uses custom i18n labels", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "P@ssw0rd!2024",
          strengthProgress: true,
          config: {
            i18n: {
              weak: "Too Weak",
              fair: "Could Be Better",
              good: "Almost There",
              strong: "Excellent!",
            },
          },
        },
      });

      const progress = component.getComponent(UProgress);
      const maxProp = progress.props("max");

      expect(maxProp).toEqual(["Too Weak", "Could Be Better", "Almost There", "Excellent!"]);
    });

    it("Strength Progress – applies correct data-test attributes", () => {
      const dataTest = "password-field";

      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          strengthProgress: true,
          dataTest,
        },
      });

      expect(component.get(`[data-test='${dataTest}-strength-progress']`)).toBeTruthy();
    });

    it("Strength Slot – allows custom strength indicator via slot", () => {
      const testClass = "custom-strength";

      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          strengthProgress: true,
        },
        slots: {
          strength: `<div class='${testClass}'>Custom Strength Indicator</div>`,
        },
      });

      expect(component.get(`.${testClass}`)).toBeTruthy();
      expect(component.html()).toContain("Custom Strength Indicator");
    });

    it("Strength Slot – exposes strength object", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "P@ssw0rd!2024",
          strengthProgress: true,
        },
        slots: {
          strength: `Level: {{ params.strength.level }}`,
        },
      });

      expect(component.html()).toContain("Level: strong");
    });

    it("Strength Slot – exposes labels array", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          strengthProgress: true,
        },
        slots: {
          strength: `Labels: {{ params.labels.join(', ') }}`,
        },
      });

      expect(component.html()).toContain("Labels: Weak, Fair, Good, Strong");
    });
  });
});
