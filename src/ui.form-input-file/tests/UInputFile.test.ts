import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";

import UInputFile from "../UInputFile.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UFiles from "../../ui.text-files/UFiles.vue";

import type { Props } from "../types.ts";

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => "mock-url");

describe("UInputFile.vue", () => {
  // Mock File object
  const createFile = (name: string, size: number, type: string) => {
    return new File(["test content"], name, { type });
  };

  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("sets the input value correctly", () => {
      const modelValue = createFile("test.txt", 1024, "text/plain");

      const component = mount(UInputFile, {
        props: {
          modelValue,
        },
      });

      const files = component.findComponent(UFiles);

      expect(files.exists()).toBe(true);

      expect(files.props("fileList")).toEqual([modelValue]);
    });

    // Multiple prop
    it("handles multiple files when multiple is true", async () => {
      const modelValue = [
        createFile("test1.txt", 1024, "text/plain"),
        createFile("test2.txt", 2048, "text/plain"),
      ];
      const multiple = true;

      const component = mount(UInputFile, {
        props: {
          modelValue,
          multiple,
        },
      });

      const files = component.findComponent(UFiles);

      expect(files.exists()).toBe(true);

      expect(files.props("fileList")).toEqual(modelValue);

      expect(files.props("removable")).toBe(true);
    });

    // Label prop
    it("renders the label correctly", () => {
      const label = "Upload File";

      const component = mount(UInputFile, {
        props: {
          label,
        },
      });

      const uLabel = component.findComponent(ULabel);

      expect(uLabel.props("label")).toBe(label);
    });

    // Description prop
    it("renders the description correctly", () => {
      const description = "Upload your files here";

      const component = mount(UInputFile, {
        props: {
          description,
        },
      });

      const uLabel = component.findComponent(ULabel);

      expect(uLabel.props("description")).toBe(description);
    });

    // Error prop
    it("applies error state correctly", () => {
      const error = "File is too large";

      const component = mount(UInputFile, {
        props: {
          error,
        },
      });

      const uLabel = component.findComponent(ULabel);

      expect(uLabel.props("error")).toBe(error);
    });

    // LabelAlign prop
    it("sets the label alignment correctly", () => {
      const labelAligns = {
        top: "top",
        topInside: "topInside",
        topWithDesc: "topWithDesc",
      };

      Object.entries(labelAligns).forEach(([align, value]) => {
        const component = mount(UInputFile, {
          props: {
            labelAlign: align as Props["labelAlign"],
          },
        });

        const uLabel = component.findComponent(ULabel);

        expect(uLabel.props("align")).toBe(value);
      });
    });

    // Size prop
    it("applies the correct size", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      Object.entries(sizes).forEach(([size, value]) => {
        const component = mount(UInputFile, {
          props: {
            size: size as Props["size"],
          },
        });

        const uLabel = component.findComponent(ULabel);

        expect(uLabel.props("size")).toBe(value);
      });
    });

    // Disabled prop
    it("disables the component when disabled is true", () => {
      const disabled = true;

      const component = mount(UInputFile, {
        props: {
          disabled,
        },
      });

      const input = component.find("input[type='file']");

      expect(input.attributes("disabled")).toBeDefined();

      const uLabel = component.findComponent(ULabel);

      expect(uLabel.props("disabled")).toBe(true);
    });

    // DataTest prop
    it("sets the data-test attribute correctly", () => {
      const dataTest = "test-input-file";

      const component = mount(UInputFile, {
        props: {
          dataTest,
        },
      });

      const uploadButton = component.find("[data-test='test-input-file-upload']");

      expect(uploadButton.exists()).toBe(true);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when a file is selected", async () => {
      const component = mount(UInputFile);

      // Mock file input change event
      const file = createFile("test.txt", 1024, "text/plain");
      const input = component.find("input[type='file']");

      // Create a mock FileList
      Object.defineProperty(input.element, "files", {
        value: [file],
        writable: false,
      });

      await input.trigger("change");

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toEqual(file);
    });

    // Error event
    it("emits error event when file validation fails", async () => {
      const component = mount(UInputFile, {
        props: {
          maxFileSize: 0.001, // Very small size to trigger error
        },
      });

      // Mock file input change event with a file that's too large
      const file = createFile("test.txt", 1024 * 10, "text/plain"); // 10KB
      const input = component.find("input[type='file']");

      // Create a mock FileList
      Object.defineProperty(input.element, "files", {
        value: [file],
        writable: false,
      });

      await input.trigger("change");

      // Wait for the next tick to allow the watch callback to run
      await nextTick();

      // Check that the error prop is set
      const uLabel = component.findComponent(ULabel);

      expect(uLabel.props("error")).toBeTruthy();
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders custom label content", () => {
      const slotClass = "custom-label";
      const component = mount(UInputFile, {
        slots: {
          label: `<div class="${slotClass}">Custom Label</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });

    // Top slot
    it("renders content in the top slot", () => {
      const slotClass = "top-content";
      const component = mount(UInputFile, {
        slots: {
          top: `<div class="${slotClass}">Top Content</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });

    // Bottom slot
    it("renders content in the bottom slot", () => {
      const slotClass = "bottom-content";
      const component = mount(UInputFile, {
        slots: {
          bottom: `<div class="${slotClass}">Bottom Content</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });

    // Left slot
    it("renders content in the left slot", () => {
      const slotClass = "left-content";
      const component = mount(UInputFile, {
        slots: {
          left: `<div class="${slotClass}">Left Content</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });

    // Default slot
    it("renders custom file content", async () => {
      const slotClass = "custom-file";
      const file = createFile("test.txt", 1024, "text/plain");

      const component = mount(UInputFile, {
        props: {
          modelValue: file,
        },
        slots: {
          default: `<template #default="{ id, label }">
            <div class="${slotClass}">{{ label }}</div>
          </template>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });
  });

  // Functionality tests
  describe("Functionality", () => {
    // File validation - maxFileSize
    it("validates file size", async () => {
      const maxFileSize = 0.001; // Very small size to trigger error

      const component = mount(UInputFile, {
        props: {
          maxFileSize,
        },
      });

      // Mock file input change event with a file that's too large
      const file = createFile("test.txt", 1024 * 10, "text/plain"); // 10KB
      const input = component.find("input[type='file']");

      // Create a mock FileList
      Object.defineProperty(input.element, "files", {
        value: [file],
        writable: false,
      });

      await input.trigger("change");

      // Wait for the next tick to allow the validation to run
      await nextTick();

      // Check that error is exposed
      const uLabel = component.findComponent(ULabel);

      expect(uLabel.props("error")).toBeTruthy();
    });

    // File validation - allowedFileTypes
    it("validates file type", async () => {
      const allowedFileTypes = ["image/jpeg"];

      const component = mount(UInputFile, {
        props: {
          allowedFileTypes,
        },
      });

      // Mock file input change event with a file of wrong type
      const file = createFile("test.txt", 1024, "text/plain");
      const input = component.find("input[type='file']");

      // Create a mock FileList
      Object.defineProperty(input.element, "files", {
        value: [file],
        writable: false,
      });

      await input.trigger("change");

      // Check that error is exposed
      expect(component.vm.error).toBeTruthy();
    });

    // Clear button functionality
    it("clears files when clear button is clicked", async () => {
      const file = createFile("test.txt", 1024, "text/plain");

      const component = mount(UInputFile, {
        props: {
          modelValue: file,
        },
      });

      // Directly call the onClickResetFiles method
      await component.vm.onClickResetFiles();

      // Wait for the next tick
      await nextTick();

      // Check that update:modelValue was emitted with null
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toBeNull();
    });

    // Drag and drop functionality
    it("handles file drop", async () => {
      const component = mount(UInputFile);

      // Mock dataTransfer object
      const file = createFile("test.txt", 1024, "text/plain");
      const dataTransfer = {
        files: [file],
        items: [
          {
            kind: "file",
            getAsFile: () => file,
          },
        ],
      };

      // Manually call the onDrop method with a mock event
      await component.vm.onDrop({
        preventDefault: vi.fn(),
        dataTransfer,
      });

      // Wait for the next tick to allow the async operations to complete
      await nextTick();

      // Check that update:modelValue was emitted with the file
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toEqual(file);
    });
  });

  // Exposed refs tests
  describe("Exposed Refs", () => {
    // Error ref
    it("exposes error ref", async () => {
      const component = mount(UInputFile, {
        props: {
          error: "Test error",
        },
      });

      expect(component.vm.error).toBe("Test error");
    });
  });
});
