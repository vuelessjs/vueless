import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { MockInstance } from "vitest";

import { getDelayedNotify, setDelayedNotify } from "../utilNotify";
import { LOCAL_STORAGE_ID } from "../constants";

const storageKey = `${LOCAL_STORAGE_ID}__default`;

describe("getDelayedNotify", () => {
  let dispatchSpy: MockInstance<typeof window.dispatchEvent>;

  function getDispatchedTypes() {
    return dispatchSpy.mock.calls.map(([event]) => event.type);
  }

  beforeEach(() => {
    dispatchSpy = vi.spyOn(window, "dispatchEvent");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("shows a stored notification and removes it from storage", () => {
    setDelayedNotify({ label: "Saved" });
    getDelayedNotify();

    expect(getDispatchedTypes()).toContain("notifyStart");
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it.each(["{invalid", '"text"', "42", "null"])(
    "ignores stored %s without throwing and removes the key",
    (stored) => {
      localStorage.setItem(storageKey, stored);

      expect(() => getDelayedNotify()).not.toThrow();
      expect(getDispatchedTypes()).not.toContain("notifyStart");
      expect(localStorage.getItem(storageKey)).toBeNull();
    },
  );
});
