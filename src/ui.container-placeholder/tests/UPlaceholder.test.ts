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

  it("applies rounded-small class when rounded prop is sm", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        rounded: "sm",
      },
    });

    expect(wrapper.classes()).toContain("rounded-small");
  });

  it("applies rounded-medium class when rounded prop is md", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        rounded: "md",
      },
    });

    expect(wrapper.classes()).toContain("rounded-medium");
  });

  it("applies rounded-large class when rounded prop is lg", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        rounded: "lg",
      },
    });

    expect(wrapper.classes()).toContain("rounded-large");
  });

  it("applies no rounded class when rounded prop is none", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        rounded: "none",
      },
    });

    expect(wrapper.classes()).not.toContain("rounded-small");
    expect(wrapper.classes()).not.toContain("rounded-medium");
    expect(wrapper.classes()).not.toContain("rounded-large");
  });

  it("applies dashed border class when dashed prop is true", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        dashed: true,
      },
    });

    expect(wrapper.classes()).toContain("border-dashed");
  });

  it("applies dotted border class when dotted prop is true", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        dotted: true,
      },
    });

    expect(wrapper.classes()).toContain("border-dotted");
  });

  it("applies solid border class when dashed and dotted props are false", () => {
    const wrapper = mount(UPlaceholder, {
      props: {
        dashed: false,
        dotted: false,
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
