import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputPassword from "../UInputPassword.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UInputPassword.vue", () => {
  describe("props", () => {
    it("ModelValue - sets initial value correctly", () => {
      const initialValue = "password123";
      const component = mount(UInputPassword, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.get("input").element.value).toBe(initialValue);
    });

    it("ModelValue - updates value on input", async () => {
      const updatedValue = "newpassword456";

      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
        },
      });

      await component.get("input").setValue(updatedValue);

      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Label - passes label to UInput", () => {
      const label = "Password";
      const component = mount(UInputPassword, {
        props: {
          label,
        },
      });

      expect(component.getComponent(UInput).props("label")).toBe(label);
    });

    it("Size - passes size to UInput", () => {
      const size: Props["size"] = "lg";
      const component = mount(UInputPassword, {
        props: {
          size,
        },
      });

      expect(component.getComponent(UInput).props("size")).toBe(size);
    });

    it("Placeholder - passes placeholder to UInput", () => {
      const placeholder = "Enter your password";
      const component = mount(UInputPassword, {
        props: {
          placeholder,
        },
      });

      expect(component.getComponent(UInput).props("placeholder")).toBe(placeholder);
    });

    it("Label Align - passes labelAlign to UInput", () => {
      const labelAlign: Props["labelAlign"] = "top";
      const component = mount(UInputPassword, {
        props: {
          labelAlign,
        },
      });

      expect(component.getComponent(UInput).props("labelAlign")).toBe(labelAlign);
    });

    it("Description - passes description to UInput", () => {
      const description = "Password must be at least 8 characters";
      const component = mount(UInputPassword, {
        props: {
          description,
        },
      });

      expect(component.getComponent(UInput).props("description")).toBe(description);
    });

    it("Error - passes error to UInput", () => {
      const error = "Password is required";
      const component = mount(UInputPassword, {
        props: {
          error,
        },
      });

      expect(component.getComponent(UInput).props("error")).toBe(error);
    });

    it("Left Icon - passes leftIcon to UInput", () => {
      const leftIcon = "lock";
      const component = mount(UInputPassword, {
        props: {
          leftIcon,
        },
      });

      const input = component.getComponent(UInput);

      expect(input.props("leftIcon")).toBe(leftIcon);
    });

    it("Max Length - passes maxLength to UInput", () => {
      const maxLength = 20;
      const component = mount(UInputPassword, {
        props: {
          maxLength,
        },
      });

      const input = component.getComponent(UInput);

      expect(input.props("maxLength")).toBe(maxLength);
    });

    it("Readonly - passes readonly state to UInput", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          readonly: true,
        },
      });

      const input = component.get("input");

      expect(input.attributes("readonly")).toBeDefined();
    });

    it("Disabled - passes disabled state to UInput", () => {
      const component = mount(UInputPassword, {
        props: {
          modelValue: "password123",
          disabled: true,
        },
      });

      const input = component.get("input");

      expect(input.attributes("disabled")).toBeDefined();
    });

    it("Data Test - applies the correct data-test attribute to password icon", () => {
      const dataTest = "password-field";
      const component = mount(UInputPassword, {
        props: {
          dataTest,
        },
      });

      component.get(`[data-test='${dataTest}-password-icon']`);
    });
  });

  describe("functionality", () => {
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

      expect(input.attributes("type")).toBe("text");
      expect(passwordIcon.props("name")).toBe("visibility-fill");

      await passwordIcon.trigger("click");

      expect(input.attributes("type")).toBe("password");
      expect(passwordIcon.props("name")).toBe("visibility_off-fill");
    });
  });

  describe("Slots", () => {
    it("Left - renders left slot content", () => {
      const slotContent = "<div class='test'>Left Slot Content</div>";
      const component = mount(UInputPassword, {
        slots: {
          left: slotContent,
        },
      });

      component.get(".test");
    });

    it("Left - exposes leftIcon prop", () => {
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

    it("Right - renders right slot content", () => {
      const slotContent = "<div class='test'>Right Slot Content</div>";
      const component = mount(UInputPassword, {
        slots: {
          right: slotContent,
        },
      });

      component.get(".test");
    });

    it("Right - exposes password visibility state", async () => {
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

    it("Right - exposes toggle function", async () => {
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

    it("Right - exposes password icon name", async () => {
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

      expect(component.html()).toContain("Icon: visibility_off-fill");

      await toggleButton.trigger("click");

      expect(component.html()).toContain("Icon: visibility-fill");
    });
  });
});
