import { enableAutoUnmount, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import UModal from "../UModal.vue";

let previousOverflow: string;
let previousTabindex: string | null;

beforeEach(() => {
  previousOverflow = document.body.style.overflow;
  previousTabindex = document.body.getAttribute("tabindex");
});

enableAutoUnmount((unmount) => {
  afterEach(() => {
    unmount();
    document.body.style.overflow = previousOverflow;

    if (previousTabindex === null) document.body.removeAttribute("tabindex");
    else document.body.setAttribute("tabindex", previousTabindex);
  });
});

function mountModal(props = {}) {
  return mount(UModal, {
    attachTo: document.body,
    props: { modelValue: true, ...props },
    slots: {
      default: '<input data-test="first-input" /><button data-test="last-button">Last</button>',
    },
  });
}

describe("UModal keyboard and lifecycle", () => {
  it("focuses an initially open modal and handles Escape from its input", async () => {
    const wrapper = mountModal();

    await nextTick();
    expect(document.activeElement).toBe(wrapper.get('[vl-key="wrapper"]').element);
    await wrapper.get('[data-test="first-input"]').trigger("keydown", { key: "Escape" });
    expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
  });

  it("handles wrapper Escape once without also reaching the document handler", async () => {
    const wrapper = mountModal();

    await nextTick();
    await wrapper.get('[vl-key="wrapper"]').trigger("keydown", { key: "Escape" });

    expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
  });

  it("routes Escape from a background wrapper to the topmost modal", async () => {
    const parent = mountModal();
    const child = mountModal();

    await parent.get('[vl-key="wrapper"]').trigger("keydown", { key: "Escape" });

    expect(parent.emitted("update:modelValue")).toBeUndefined();
    expect(child.emitted("update:modelValue")).toEqual([[false]]);
  });

  it("traps Tab at the last focusable element", async () => {
    const wrapper = mountModal();

    await nextTick();
    (wrapper.get('[data-test="last-button"]').element as HTMLElement).focus();
    await wrapper.get('[data-test="last-button"]').trigger("keydown", { key: "Tab" });
    expect(document.activeElement).toBe(wrapper.get('[data-test="first-input"]').element);
  });

  it.each(['style="display: none"', 'style="visibility: hidden"', "hidden", "inert"])(
    "ignores controls inside a hidden or inert ancestor: %s",
    async (attributes) => {
      const wrapper = mount(UModal, {
        attachTo: document.body,
        props: { modelValue: true },
        slots: {
          default:
            `<input data-test="first-input" /><button data-test="last-button">Last</button>` +
            `<div ${attributes}><button>Hidden</button></div>`,
        },
      });

      await nextTick();
      (wrapper.get('[data-test="last-button"]').element as HTMLElement).focus();
      await wrapper.get('[data-test="last-button"]').trigger("keydown", { key: "Tab" });
      expect(document.activeElement).toBe(wrapper.get('[data-test="first-input"]').element);
      await wrapper
        .get('[data-test="first-input"]')
        .trigger("keydown", { key: "Tab", shiftKey: true });
      expect(document.activeElement).toBe(wrapper.get('[data-test="last-button"]').element);
    },
  );

  it("keeps focus inside while all controls are disabled", async () => {
    const wrapper = mount(UModal, {
      attachTo: document.body,
      props: { modelValue: true },
      slots: { default: "<input disabled /><button disabled>Saving</button>" },
    });

    await nextTick();
    const element = wrapper.get('[vl-key="wrapper"]').element;
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });

    element.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(element);
  });

  it("handles Escape only in the topmost modal and respects disabled Escape", async () => {
    const parent = mountModal();
    const child = mountModal({ closeOnEsc: false });

    await child.get('[data-test="first-input"]').trigger("keydown", { key: "Escape" });
    expect(parent.emitted("update:modelValue")).toBeUndefined();
    expect(child.emitted("update:modelValue")).toBeUndefined();
    await child.setProps({ closeOnEsc: true });
    await child.get('[data-test="first-input"]').trigger("keydown", { key: "Escape" });
    expect(parent.emitted("update:modelValue")).toBeUndefined();
    expect(child.emitted("update:modelValue")).toEqual([[false]]);
  });

  it("keeps body scrolling locked until all nested modals have closed", async () => {
    document.body.style.overflow = "scroll";
    const parent = mountModal();
    const child = mountModal();

    expect(document.body.style.overflow).toBe("hidden");
    await child.setProps({ modelValue: false });
    expect(document.body.style.overflow).toBe("hidden");
    await parent.setProps({ modelValue: false });
    expect(document.body.style.overflow).toBe("scroll");
  });

  it("removes listeners and releases the scroll lock when unmounted while open", async () => {
    document.body.style.overflow = "auto";
    const wrapper = mountModal();

    await nextTick();
    wrapper.unmount();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    expect(document.body.style.overflow).toBe("auto");
  });
  it.each(["close", "unmount"])("returns focus to the parent after child %s", async (action) => {
    const parent = mountModal();

    await nextTick();
    const child = mountModal();

    await nextTick();
    (child.get('[data-test="first-input"]').element as HTMLElement).focus();
    if (action === "close") await child.setProps({ modelValue: false });
    else child.unmount();
    await nextTick();
    const wrapper = parent.get('[vl-key="wrapper"]').element;

    expect(document.activeElement).toBe(wrapper);
    await parent.get('[vl-key="wrapper"]').trigger("keydown", { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(parent.get('[data-test="last-button"]').element);
  });

  it("does not steal focus from the child when a background modal closes", async () => {
    const parent = mountModal();
    const child = mountModal();

    await nextTick();
    const input = child.get('[data-test="first-input"]').element as HTMLElement;

    input.focus();
    await parent.setProps({ modelValue: false });
    expect(document.activeElement).toBe(input);
  });

  it("traps Tab when focus is outside the topmost modal", async () => {
    const modal = mountModal();

    await nextTick();
    document.body.tabIndex = -1;
    document.body.focus();
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(document.activeElement).toBe(modal.get('[data-test="first-input"]').element);
  });
});
