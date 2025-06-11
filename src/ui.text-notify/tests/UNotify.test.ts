import { mount } from "@vue/test-utils";
import { describe, it, expect, afterEach } from "vitest";

import UNotify from "../UNotify.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import { NotificationType } from "../constants.ts";
import { LocaleSymbol } from "../../composables/useLocale.ts";
import createVuelessAdapter from "../../adapter.locale/vueless.ts";

import type { Props, Notification } from "../types.ts";

describe("UNotify.vue", () => {
  // Create mock locale instance
  const mockLocale = createVuelessAdapter();

  // Helper function to mount component with locale
  function mountWithLocale(props = {}) {
    return mount(UNotify, {
      props,
      global: {
        provide: {
          [LocaleSymbol]: mockLocale,
        },
      },
    });
  }

  // Mock notification data
  const mockNotification: Notification = {
    id: "test-id",
    type: NotificationType.Success,
    label: "Success",
    description: "Operation completed successfully",
  };

  // Mock window event dispatch
  function dispatchNotifyEvent(eventName: string, detail: Notification) {
    const event = new CustomEvent(eventName, { detail });

    window.dispatchEvent(event);
  }

  // Clean up after each test
  afterEach(() => {
    dispatchNotifyEvent("notifyClearAll", {} as Notification);
  });

  // Props tests
  describe("Props", () => {
    // XPosition prop
    it("applies the correct xPosition style", async () => {
      const positions = ["left", "center", "right"];

      for (const position of positions) {
        const component = mountWithLocale({
          xPosition: position as Props["xPosition"],
        });

        // Add a notification to ensure the component is rendered
        dispatchNotifyEvent("notifyStart", mockNotification);
        await component.vm.$nextTick();

        // Check the component's style directly
        const style = component.attributes("style") || "";

        // For center position, we expect a calculated left value
        if (position === "center") {
          expect(style).toContain("left:");
        } else {
          expect(style).toContain(`${position}: 0px`);
        }
      }
    });

    // YPosition prop
    it("applies the correct yPosition style", async () => {
      const positions = ["top", "bottom"];

      for (const position of positions) {
        const component = mountWithLocale({
          yPosition: position as Props["yPosition"],
        });

        // Add a notification to ensure the component is rendered
        dispatchNotifyEvent("notifyStart", mockNotification);
        await component.vm.$nextTick();

        // Check the component's style directly
        const style = component.attributes("style") || "";

        expect(style).toContain(`${position}: 0px`);
      }
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-notify";

      const component = mountWithLocale({
        dataTest,
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Event handling tests
  describe("Event Handling", () => {
    // notifyStart event
    it("adds notification when notifyStart event is dispatched", async () => {
      const component = mountWithLocale();

      dispatchNotifyEvent("notifyStart", mockNotification);
      await component.vm.$nextTick();

      expect(component.text()).toContain(mockNotification.label);
      expect(component.text()).toContain(mockNotification.description);
    });

    // notifyEnd event
    it("removes notification when notifyEnd event is dispatched", async () => {
      const component = mountWithLocale();

      // Add notification
      dispatchNotifyEvent("notifyStart", mockNotification);
      await component.vm.$nextTick();

      // Verify it's added
      expect(component.text()).toContain(mockNotification.label);

      // Get the initial notification count
      const initialCount = component.findAllComponents(UIcon).length;

      expect(initialCount).toBeGreaterThan(0);

      // Remove notification
      dispatchNotifyEvent("notifyEnd", mockNotification);
      await component.vm.$nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for any async updates

      // Verify the notification count has decreased
      const finalCount = component.findAllComponents(UIcon).length;

      expect(finalCount).toBeLessThan(initialCount);
    });

    // notifyClearAll event
    it("clears all notifications when notifyClearAll event is dispatched", async () => {
      const component = mountWithLocale();

      // Add multiple notifications
      dispatchNotifyEvent("notifyStart", {
        ...mockNotification,
        id: "id1",
        label: "Notification 1",
      });
      dispatchNotifyEvent("notifyStart", {
        ...mockNotification,
        id: "id2",
        label: "Notification 2",
      });

      await component.vm.$nextTick();

      // Verify they're added
      expect(component.text()).toContain("Notification 1");
      expect(component.text()).toContain("Notification 2");

      // Clear all notifications
      dispatchNotifyEvent("notifyClearAll", {} as Notification);
      await component.vm.$nextTick();

      // Verify they're all removed
      expect(component.text()).not.toContain("Notification 1");
      expect(component.text()).not.toContain("Notification 2");
    });

    // Close button click
    it("removes notification when close button is clicked", async () => {
      const component = mountWithLocale();

      // Add notification
      dispatchNotifyEvent("notifyStart", mockNotification);
      await component.vm.$nextTick();

      // Verify it's added
      expect(component.text()).toContain(mockNotification.label);

      // Find all UIcon components
      const icons = component.findAllComponents(UIcon);

      expect(icons.length).toBeGreaterThan(0);

      // Find the close icon by its name prop
      const closeIcon = icons.find((icon) => icon.props("name") === "close");

      expect(closeIcon).toBeDefined();

      // Click close button
      await closeIcon?.trigger("click");

      // Verify it's removed
      expect(component.text()).not.toContain(mockNotification.label + mockNotification.description);
    });
  });

  // Notification type tests
  describe("Notification Types", () => {
    // Success notification
    it("renders success notification with correct icon", async () => {
      const component = mountWithLocale();

      dispatchNotifyEvent("notifyStart", {
        ...mockNotification,
        type: NotificationType.Success,
      });
      await component.vm.$nextTick();

      const icons = component.findAllComponents(UIcon);

      expect(icons.length).toBeGreaterThan(0);

      // Find the success icon by its name prop
      const successIcon = icons.find((icon) => icon.props("name") === "check_circle");

      expect(successIcon).toBeDefined();
    });

    // Warning notification
    it("renders warning notification with correct icon", async () => {
      const component = mountWithLocale();

      dispatchNotifyEvent("notifyStart", {
        ...mockNotification,
        type: NotificationType.Warning,
      });
      await component.vm.$nextTick();

      const icons = component.findAllComponents(UIcon);

      expect(icons.length).toBeGreaterThan(0);

      // Find the warning icon by its name prop
      const warningIcon = icons.find((icon) => icon.props("name") === "warning");

      expect(warningIcon).toBeDefined();
    });

    // Error notification
    it("renders error notification with correct icon", async () => {
      const component = mountWithLocale();

      dispatchNotifyEvent("notifyStart", {
        ...mockNotification,
        type: NotificationType.Error,
      });
      await component.vm.$nextTick();

      const icons = component.findAllComponents(UIcon);

      expect(icons.length).toBeGreaterThan(0);

      // Find the error icon by its name prop
      const errorIcon = icons.find((icon) => icon.props("name") === "error");

      expect(errorIcon).toBeDefined();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // notificationRef
    it("exposes notificationRef", () => {
      const component = mountWithLocale();

      expect(component.vm.notificationRef).toBeDefined();
    });
  });
});
