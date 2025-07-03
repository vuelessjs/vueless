import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";

import UInputFile from "../UInputFile.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UFiles from "../../ui.text-files/UFiles.vue";

import type { Props } from "../types.ts";

global.URL.createObjectURL = vi.fn(() => "mock-url");

describe("UInputFile.vue", () => {
  const createFile = (name: string, size: number, type: string) => {
    const blobContent = new Uint8Array(size); //

    return new File([blobContent], name, { type });
  };

  describe("Props", () => {
    it("Model Value – sets initial value correctly for single file", () => {
      const file = createFile("test.txt", 1024, "text/plain");

      const component = mount(UInputFile, {
        props: {
          modelValue: file,
        },
      });

      const filesComponent = component.findComponent(UFiles);

      expect(filesComponent.exists()).toBe(true);
      expect(filesComponent.props("fileList")).toEqual([file]);
    });

    it("Model Value – sets initial value correctly for multiple files", () => {
      const files = [
        createFile("file1.txt", 1024, "text/plain"),
        createFile("file2.pdf", 2048, "application/pdf"),
      ];

      const component = mount(UInputFile, {
        props: {
          modelValue: files,
          multiple: true,
        },
      });

      const filesComponent = component.findComponent(UFiles);

      expect(filesComponent.exists()).toBe(true);
      expect(filesComponent.props("fileList")).toEqual(files);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Upload Files";

      const component = mount(UInputFile, {
        props: {
          label: labelText,
        },
      });

      const labelComponent = component.getComponent(ULabel);

      expect(labelComponent.props("label")).toBe(labelText);
    });

    it("Label – renders file input element with correct id", () => {
      const customId = "custom-file-input";

      const component = mount(UInputFile, {
        props: {
          id: customId,
          label: "Upload Files",
        },
      });

      const input = component.find("input[type='file']");
      const labelComponent = component.getComponent(ULabel);

      expect(input.attributes("id")).toBe(customId);
      expect(labelComponent.props("for")).toBe(customId);
    });

    it("LabelAlign – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "topInside";

      const component = mount(UInputFile, {
        props: {
          label: "Upload Files",
          labelAlign,
        },
      });

      const labelComponent = component.getComponent(ULabel);

      expect(labelComponent.props("align")).toBe(labelAlign);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "Select files to upload";

      const component = mount(UInputFile, {
        props: {
          description: descriptionText,
        },
      });

      const labelComponent = component.getComponent(ULabel);

      expect(labelComponent.props("description")).toBe(descriptionText);
    });

    it("Error – passes error message to ULabel component", () => {
      const errorText = "File upload failed";

      const component = mount(UInputFile, {
        props: {
          error: errorText,
        },
      });

      const labelComponent = component.getComponent(ULabel);

      expect(labelComponent.props("error")).toBe(errorText);
    });

    it("Error – applies error styles component", () => {
      const dropzoneErrorClasses = "border-error";
      const contentErrorClasses = "bg-error/5";

      const component = mount(UInputFile, {
        props: {
          error: "File upload failed",
        },
      });

      const dropzone = component.find('[vl-key="dropzone"]');
      const content = component.find('[vl-key="content"]');

      expect(dropzone.attributes("class")).toContain(dropzoneErrorClasses);
      expect(content.attributes("class")).toContain(contentErrorClasses);
    });

    it("Size – passes size prop to ULabel and UFiles components", () => {
      const size = "lg";
      const file = createFile("test.txt", 1024, "text/plain");

      const component = mount(UInputFile, {
        props: {
          size,
          modelValue: file,
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const filesComponent = component.getComponent(UFiles);

      expect(labelComponent.props("size")).toBe(size);
      expect(filesComponent.props("size")).toBe(size);
    });

    it("Size – applies correct classes based on size prop", () => {
      const placeholderSizeClasses = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(placeholderSizeClasses).forEach(([size, className]) => {
        const component = mount(UInputFile, {
          props: {
            size: size as Props["size"],
          },
        });

        const placeholder = component.find('[vl-key="placeholder"]');

        expect(placeholder.classes()).toContain(className);
      });
    });

    it("Disabled – sets disabled attribute on input and buttons", () => {
      const component = mount(UInputFile, {
        props: {
          disabled: true,
        },
      });

      const input = component.get("input[type='file']");
      const buttons = component.findAllComponents({ name: "UButton" });

      expect(input.attributes("disabled")).toBeDefined();

      buttons.forEach((button) => {
        expect(button.props("disabled")).toBe(true);
      });
    });

    it("Disabled – passes disabled prop to ULabel component", () => {
      const component = mount(UInputFile, {
        props: {
          disabled: true,
          label: "Upload Files",
        },
      });

      const labelComponent = component.getComponent(ULabel);

      expect(labelComponent.props("disabled")).toBe(true);
    });

    it("Disabled – applies disabled styles to dropzone and content", () => {
      const disabledClass = "bg-lifted";

      const component = mount(UInputFile, {
        props: {
          disabled: true,
        },
      });

      const dropzone = component.find('[vl-key="dropzone"]');
      const content = component.find('[vl-key="content"]');

      expect(dropzone.classes()).toContain(disabledClass);
      expect(content.classes()).toContain(disabledClass);
    });

    it("Data Test – sets data-test attributes", () => {
      const testCases = [
        {
          key: "clear",
          modelValue: createFile("test.txt", 1024, "text/plain"),
        },
        {
          key: "upload",
          modelValue: undefined,
        },
      ];

      const dataTestValue = "file-input-test";

      testCases.forEach(({ key, modelValue }) => {
        const component = mount(UInputFile, {
          props: {
            modelValue: modelValue,
            dataTest: dataTestValue,
          },
        });

        component.get(`[data-test="${dataTestValue}-${key}"]`);
      });
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom File Label";

      const component = mount(UInputFile, {
        props: {
          label: "Default Label",
        },
        slots: {
          label: customLabelContent,
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("label");

      expect(labelElement.text()).toBe(customLabelContent);
    });

    it("Label – exposes label prop to slot", () => {
      const defaultLabel = "Upload Files";

      const component = mount(UInputFile, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: "Custom {{ params.label }}",
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("label");

      expect(labelElement.text()).toBe(`Custom ${defaultLabel}`);
    });

    it("Top – renders custom content from top slot", () => {
      const testClass = "custom-top";

      const component = mount(UInputFile, {
        slots: {
          top: `<div class="${testClass}">Upload Instructions</div>`,
        },
      });

      const topSlotElement = component.find(`.${testClass}`);

      expect(topSlotElement.exists()).toBe(true);
      expect(topSlotElement.text()).toBe("Upload Instructions");
    });

    it("Left – renders custom content from left slot", () => {
      const testClass = "custom-left";

      const component = mount(UInputFile, {
        slots: {
          left: `<span class="${testClass}">📁</span>`,
        },
      });

      const leftSlotElement = component.find(`.${testClass}`);

      expect(leftSlotElement.exists()).toBe(true);
      expect(leftSlotElement.text()).toBe("📁");
    });

    it("Left – positions left slot content before placeholder when no files", () => {
      const leftContent = "File Icon";
      const testClass = "left-content";

      const component = mount(UInputFile, {
        slots: {
          left: `<span class="${testClass}">${leftContent}</span>`,
        },
      });

      const contentDiv = component.find('[vl-key="content"]');
      const leftSlot = contentDiv.find(`.${testClass}`);
      const placeholder = contentDiv.find('[vl-key="placeholder"]');

      expect(leftSlot.exists()).toBe(true);
      expect(placeholder.exists()).toBe(true);

      // Check that left slot comes before placeholder in DOM order
      const leftIndex = Array.from(contentDiv.element.children).indexOf(leftSlot.element);
      const placeholderIndex = Array.from(contentDiv.element.children).indexOf(placeholder.element);

      expect(leftIndex).toBeLessThan(placeholderIndex);
    });

    it("Bottom – renders custom content from bottom slot", () => {
      const testClass = "custom-bottom";

      const component = mount(UInputFile, {
        slots: {
          bottom: `<div class="${testClass}">Max file size: 5MB</div>`,
        },
      });

      const bottomSlotElement = component.find(`.${testClass}`);

      expect(bottomSlotElement.exists()).toBe(true);
      expect(bottomSlotElement.text()).toBe("Max file size: 5MB");
    });

    it("File – renders custom file content when files are present", () => {
      const file = createFile("test.txt", 1024, "text/plain");
      const testClass = "custom-file";

      const component = mount(UInputFile, {
        props: {
          modelValue: file,
        },
        slots: {
          default: `<div class="${testClass}">Custom file: {{ params.label }}</div>`,
        },
      });

      const customFileElement = component.find(`.${testClass}`);

      expect(customFileElement.exists()).toBe(true);
      expect(customFileElement.text()).toContain("Custom file: test.txt");
    });

    it("File – exposes file properties to slot", () => {
      const file = createFile("document.pdf", 2048, "application/pdf");
      const testClass = "file-info";

      const component = mount(UInputFile, {
        props: {
          modelValue: file,
        },
        slots: {
          default: `
            <div class="${testClass}">
              <span>{{ params.id }}</span>
              <span>{{ params.label }}</span>
              <span>{{ params.index }}</span>
            </div>
          `,
        },
      });

      const fileInfo = component.find(".file-info");
      const [fileId, fileLabel, fileIndex] = fileInfo.findAll("span");

      expect(fileInfo.exists()).toBe(true);
      expect(fileId.exists()).toBe(true);
      expect(fileLabel.text()).toBe("document.pdf");
      expect(fileIndex.text()).toBe("0");
    });

    it("File – renders multiple custom file items for multiple files", () => {
      const testClass = "custom-file-item";
      const files = [
        createFile("file1.txt", 1024, "text/plain"),
        createFile("file2.pdf", 2048, "application/pdf"),
      ];

      const component = mount(UInputFile, {
        props: {
          modelValue: files,
          multiple: true,
        },
        slots: {
          default: `<div class="${testClass}">{{ params.label }}</div>`,
        },
      });

      const customFileItems = component.findAll(".custom-file-item");

      expect(customFileItems).toHaveLength(2);
      expect(customFileItems[0].text()).toBe("file1.txt");
      expect(customFileItems[1].text()).toBe("file2.pdf");
    });
  });

  describe("Functionality", () => {
    it("Validation – validates file size", async () => {
      const maxFileSize = 1;

      const component = mount(UInputFile, {
        props: {
          maxFileSize,
        },
      });

      const file = createFile("test.txt", 1024 * 1024 * 3, "text/plain"); // 3 MB file

      const input = component.find("input[type='file']");

      Object.defineProperty(input.element, "files", {
        value: [file],
        writable: false,
      });

      await input.trigger("change");

      expect(component.emitted("error")).toBeTruthy();
    });

    it("Validation – validates file type", async () => {
      const allowedFileTypes = ["image/jpeg"];

      const component = mount(UInputFile, {
        props: {
          allowedFileTypes,
        },
      });

      const file = createFile("test.txt", 1024, "text/plain");
      const input = component.find("input[type='file']");

      Object.defineProperty(input.element, "files", {
        value: [file],
        writable: false,
      });

      await input.trigger("change");

      expect(component.vm.error).toBeTruthy();
    });

    it("Clear Button – clears files when clear button is clicked", async () => {
      const file = createFile("test.txt", 1024, "text/plain");

      const component = mount(UInputFile, {
        props: {
          modelValue: file,
        },
      });

      await component.get("[vl-key='clearButton']").trigger("click");

      await nextTick();

      expect(component.emitted("update:modelValue")![0][0]).toBeNull();
    });
  });

  describe("Exposed Refs", () => {
    it("Error – exposes error ref", async () => {
      const errorText = "Test error";
      const component = mount(UInputFile, {
        props: {
          error: errorText,
        },
      });

      expect(component.vm.error).toBe(errorText);
    });
  });
});
