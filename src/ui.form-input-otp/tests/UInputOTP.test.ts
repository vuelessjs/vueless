import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import UInputOTP from "../UInputOTP.vue";
import UInput from "../../ui.form-input/UInput.vue";

describe("UInputOTP", () => {
  it("renders with default props", () => {
    const wrapper = mount(UInputOTP);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAllComponents(UInput)).toHaveLength(4); // default length
  });

  it("renders correct number of inputs based on length prop", () => {
    const wrapper = mount(UInputOTP, {
      props: { length: 6 },
    });

    expect(wrapper.findAllComponents(UInput)).toHaveLength(6);
  });

  it("updates model value when input changes", async () => {
    const wrapper = mount(UInputOTP, {
      props: { modelValue: "" },
    });

    const inputs = wrapper.findAllComponents(UInput);

    await inputs[0].vm.$emit("update:modelValue", "1");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["1"]);
  });

  it("applies mask when mask prop is true", () => {
    const wrapper = mount(UInputOTP, {
      props: { mask: true },
    });

    const inputs = wrapper.findAllComponents(UInput);

    inputs.forEach((input) => {
      expect(input.props("type")).toBe("password");
    });
  });

  it("applies integer-only input mode when integerOnly prop is true", () => {
    const wrapper = mount(UInputOTP, {
      props: { integerOnly: true },
    });

    const inputs = wrapper.findAllComponents(UInput);

    inputs.forEach((input) => {
      expect(input.props("inputmode")).toBe("numeric");
    });
  });

  it("disables inputs when disabled prop is true", () => {
    const wrapper = mount(UInputOTP, {
      props: { disabled: true },
    });

    const inputs = wrapper.findAllComponents(UInput);

    inputs.forEach((input) => {
      expect(input.props("disabled")).toBe(true);
    });
  });

  it("displays the correct values when modelValue is set", async () => {
    const wrapper = mount(UInputOTP, {
      props: { length: 4, modelValue: "12" },
    });

    const inputs = wrapper.findAllComponents(UInput);

    expect(inputs[0].props("modelValue")).toBe("1");
    expect(inputs[1].props("modelValue")).toBe("2");
    expect(inputs[2].props("modelValue")).toBe("");
    expect(inputs[3].props("modelValue")).toBe("");
  });

  it("uses validation rule for integer-only inputs", () => {
    const wrapper = mount(UInputOTP, {
      props: { integerOnly: true }
    });

    const inputs = wrapper.findAllComponents(UInput);
    inputs.forEach(input => {
      expect(input.props("validationRule")).toBe("integer");
    });
  });

  it("does not use integer validation rule when integerOnly is false", () => {
    const wrapper = mount(UInputOTP, {
      props: { integerOnly: false }
    });

    const inputs = wrapper.findAllComponents(UInput);
    inputs.forEach(input => {
      expect(input.props("validationRule")).not.toBe("integer");
    });
  });

  it("can clear digits with backspace and delete keys", async () => {
    const wrapper = mount(UInputOTP, {
      props: { length: 4, modelValue: "1234" }
    });

    const component = wrapper.vm as any;

    // Test backspace on last input (index 3)
    const backspaceEvent = { key: "Backspace" };
    component.onKeydown(backspaceEvent, 3);

    await wrapper.vm.$nextTick();

    // The last digit should be cleared
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    let lastEmittedValue = wrapper.emitted("update:modelValue")?.slice(-1)[0];
    expect(lastEmittedValue).toEqual(["123"]);

    // Test delete key on second input (index 1)
    const deleteEvent = { key: "Delete" };
    component.onKeydown(deleteEvent, 1);

    await wrapper.vm.$nextTick();

    // The second digit should be cleared
    lastEmittedValue = wrapper.emitted("update:modelValue")?.slice(-1)[0];
    expect(lastEmittedValue).toEqual(["13"]);
  });
});
