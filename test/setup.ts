/* eslint-disable no-console */
import { beforeAll, afterAll } from "vitest";

const originalWarn = console.warn;

beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Invoke the slot function inside the render function instead")
    ) {
      return;
    }

    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
