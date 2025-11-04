import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import UPlaceholder from "../UPlaceholder.vue";

describe("UPlaceholder", () => {
  it("renders default placeholder", () => {
    const wrapper = mount(UPlaceholder);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.attributes("role")).toBe("region");
  });

  it("renders label when provided", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        label: "Test Label",
      },
    });

    expect(wrapper.text()).toContain("Test Label");
  });

  it("applies inset class when inset prop is true", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        inset: true,
      },
    });

    expect(wrapper.classes()).toContain("m-4");
  });

  it("applies rounded class when rounded prop is true", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        rounded: true,
      },
    });

    expect(wrapper.classes()).toContain("rounded-large");
  });

  it("applies dashed border class when dashed prop is true", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        dashed: true,
      },
    });

    expect(wrapper.classes()).toContain("border-dashed");
  });

  it("applies solid border class when dashed prop is false", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        dashed: false,
      },
    });

    expect(wrapper.classes()).toContain("border-solid");
  });

  it("renders slot content", () => {
    const wrapper = mount(UPlaceholder, {
      slots: {
        default: "<div class='custom-content'>Custom Content</div>",
      },
    });

    expect(wrapper.find(".custom-content").exists()).toBe(true);
    expect(wrapper.text()).toContain("Custom Content");
  });

  it("applies color variants", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        color: "primary",
      },
    });

    expect(wrapper.classes().some((cls) => cls.includes("border-"))).toBe(true);
  });

  it("exposes wrapperRef", () => {
    const wrapper = mount(UPlaceholder);

    expect(wrapper.vm.wrapperRef).toBeDefined();
  });

  it("sets aria-label from label prop", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        label: "Test Area",
      },
    });

    expect(wrapper.attributes("aria-label")).toBe("Test Area");
  });

  it("sets default aria-label when no label provided", () => {
    const wrapper = mount(UPlaceholder);

    expect(wrapper.attributes("aria-label")).toBe("Placeholder area");
  });

  it("applies data-test attribute", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        dataTest: "custom-test-id",
      },
    });

    expect(wrapper.attributes("data-test")).toBe("custom-test-id");
  });
});
