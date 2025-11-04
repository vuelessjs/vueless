import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import USplitter from "../USplitter.vue";

describe("USplitter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  describe("Props", () => {
    it("ModelValue – initializes with provided sizes", () => {
      const modelValue = [30, 70];

      const component = mount(USplitter, {
        props: {
          modelValue,
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      const panels = component.findAll("[vl-key='panel']");

      expect(panels).toHaveLength(2);
      expect(panels[0].attributes("style")).toContain("flex-basis: 30%");
      expect(panels[1].attributes("style")).toContain("flex-basis: 70%");
    });

    it("Orientation – applies horizontal orientation by default", () => {
      const component = mount(USplitter, {
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      const wrapper = component.find("[vl-key='wrapper']");

      expect(wrapper.attributes("class")).toContain("flex-row");
    });

    it("Orientation – applies vertical orientation", () => {
      const component = mount(USplitter, {
        props: {
          orientation: "vertical",
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      const wrapper = component.find("[vl-key='wrapper']");

      expect(wrapper.attributes("class")).toContain("flex-col");
    });

    it("GutterSize – applies custom gutter size", () => {
      const gutterSize = 10;

      const component = mount(USplitter, {
        props: {
          gutterSize,
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      const gutter = component.find("[vl-key='gutter']");

      expect(gutter.attributes("style")).toContain("--gutter-size: 10px");
    });

    it("Disabled – applies disabled state", () => {
      const component = mount(USplitter, {
        props: {
          disabled: true,
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      const gutter = component.find("[vl-key='gutter']");

      expect(gutter.attributes("class")).toContain("cursor-not-allowed");
      expect(gutter.attributes("class")).toContain("opacity-50");
    });
  });

  describe("Slots", () => {
    it("Panel slots – renders multiple panels", () => {
      const component = mount(USplitter, {
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
          "panel-3": "<div>Panel 3</div>",
        },
      });

      const panels = component.findAll("[vl-key='panel']");

      expect(panels).toHaveLength(3);
      expect(component.text()).toContain("Panel 1");
      expect(component.text()).toContain("Panel 2");
      expect(component.text()).toContain("Panel 3");
    });

    it("Handle slot – renders custom handle", () => {
      const component = mount(USplitter, {
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
          handle: "<div class='custom-handle'>Custom</div>",
        },
      });

      expect(component.find(".custom-handle").exists()).toBe(true);
      expect(component.text()).toContain("Custom");
    });
  });

  describe("Events", () => {
    it("Update:modelValue – emits when resizing", async () => {
      const component = mount(USplitter, {
        props: {
          modelValue: [50, 50],
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
        attachTo: document.body,
      });

      const gutter = component.find("[vl-key='gutter']");
      const wrapper = component.find("[vl-key='wrapper']");

      vi.spyOn(wrapper.element, "getBoundingClientRect").mockReturnValue({
        width: 1000,
        height: 500,
        top: 0,
        left: 0,
        right: 1000,
        bottom: 500,
      } as DOMRect);

      await gutter.trigger("pointerdown", {
        clientX: 500,
        clientY: 250,
      });

      const pointerMoveEvent = new PointerEvent("pointermove", {
        clientX: 600,
        clientY: 250,
      });

      document.dispatchEvent(pointerMoveEvent);

      await component.vm.$nextTick();

      expect(component.emitted("update:modelValue")).toBeTruthy();

      component.unmount();
    });

    it("Resize-start – emits when drag starts", async () => {
      const component = mount(USplitter, {
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
        attachTo: document.body,
      });

      const gutter = component.find("[vl-key='gutter']");

      await gutter.trigger("pointerdown", {
        clientX: 500,
        clientY: 250,
      });

      expect(component.emitted("resize-start")).toBeTruthy();

      component.unmount();
    });

    it("Resize-end – emits when drag ends", async () => {
      const component = mount(USplitter, {
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
        attachTo: document.body,
      });

      const gutter = component.find("[vl-key='gutter']");

      await gutter.trigger("pointerdown", {
        clientX: 500,
        clientY: 250,
      });

      const pointerUpEvent = new PointerEvent("pointerup");

      document.dispatchEvent(pointerUpEvent);

      await component.vm.$nextTick();

      expect(component.emitted("resize-end")).toBeTruthy();

      component.unmount();
    });
  });

  describe("Interaction", () => {
    it("Gutter – renders between panels", () => {
      const component = mount(USplitter, {
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
          "panel-3": "<div>Panel 3</div>",
        },
      });

      const gutters = component.findAll("[vl-key='gutter']");

      expect(gutters).toHaveLength(2);
    });

    it("Keyboard – handles arrow key navigation", async () => {
      const component = mount(USplitter, {
        props: {
          modelValue: [50, 50],
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
        attachTo: document.body,
      });

      const gutter = component.find("[vl-key='gutter']");
      const wrapper = component.find("[vl-key='wrapper']");

      vi.spyOn(wrapper.element, "getBoundingClientRect").mockReturnValue({
        width: 1000,
        height: 500,
        top: 0,
        left: 0,
        right: 1000,
        bottom: 500,
      } as DOMRect);

      await gutter.trigger("keydown", {
        key: "ArrowRight",
      });

      await component.vm.$nextTick();

      expect(component.emitted("update:modelValue")).toBeTruthy();

      component.unmount();
    });

    it("Double click – resets to equal sizes", async () => {
      const component = mount(USplitter, {
        props: {
          modelValue: [30, 70],
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      const gutter = component.find("[vl-key='gutter']");

      await gutter.trigger("dblclick");

      const emitted = component.emitted("update:modelValue");

      expect(emitted).toBeTruthy();

      if (emitted) {
        const lastEmit = emitted[emitted.length - 1][0] as number[];

        expect(lastEmit[0]).toBeCloseTo(50, 0);
        expect(lastEmit[1]).toBeCloseTo(50, 0);
      }
    });
  });

  describe("Accessibility", () => {
    it("ARIA – gutter has proper ARIA attributes", () => {
      const component = mount(USplitter, {
        props: {
          modelValue: [40, 60],
        },
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      const gutter = component.find("[vl-key='gutter']");

      expect(gutter.attributes("role")).toBe("separator");
      expect(gutter.attributes("aria-orientation")).toBe("horizontal");
      expect(gutter.attributes("aria-valuenow")).toBe("40");
      expect(gutter.attributes("aria-valuemin")).toBe("0");
      expect(gutter.attributes("aria-valuemax")).toBe("100");
      expect(gutter.attributes("tabindex")).toBe("0");
    });
  });

  describe("Exposed refs", () => {
    it("WrapperRef – exposes wrapper element ref", () => {
      const component = mount(USplitter, {
        slots: {
          "panel-1": "<div>Panel 1</div>",
          "panel-2": "<div>Panel 2</div>",
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
