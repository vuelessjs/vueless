import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

import { isTopModal, registerModal, unregisterModal } from "../modalStack";

const parent = Symbol("parent");
const child = Symbol("child");
let previousOverflow: string;

beforeEach(() => {
  previousOverflow = document.body.style.overflow;
});

afterEach(() => {
  unregisterModal(parent);
  unregisterModal(child);
  document.body.style.overflow = previousOverflow;
});

describe("modal stack registration", () => {
  it("moves a registered modal to the top and restores focus to the remaining modal", async () => {
    const focusChild = vi.fn();

    registerModal(parent, vi.fn());
    registerModal(child, focusChild);
    expect(isTopModal(child)).toBe(true);
    registerModal(parent, vi.fn());
    expect(isTopModal(parent)).toBe(true);
    unregisterModal(parent);
    await nextTick();
    expect(isTopModal(child)).toBe(true);
    expect(focusChild).toHaveBeenCalledOnce();
    expect(document.body.style.overflow).toBe("hidden");
    unregisterModal(child);
    expect(document.body.style.overflow).toBe(previousOverflow);
  });

  it("does not duplicate registrations or overwrite the saved overflow", () => {
    document.body.style.overflow = "scroll";
    registerModal(parent, vi.fn());
    registerModal(parent, vi.fn());
    unregisterModal(parent);

    expect(isTopModal(parent)).toBe(false);
    expect(document.body.style.overflow).toBe("scroll");
  });
});
