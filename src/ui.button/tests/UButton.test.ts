import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UButton from "../UButton.vue";

describe("UButton.vue", () => {
  it("component renders", () => {
    const label = "";
    const result = "invisible";

    const component = mount(UButton, {
      props: {
        label,
      },
    });

    expect(component.text()).toBe(result);
  });

  it("renders the correct label", () => {
    const label = "Button";
    const result = label;

    const component = mount(UButton, {
      props: {
        label,
      },
    });

    expect(component.text()).toBe(result);
  });
});
