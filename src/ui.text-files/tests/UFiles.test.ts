import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

import UFiles from "../UFiles.vue";
import UFile from "../../ui.text-file/UFile.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types";

// Mock URL.createObjectURL
const originalCreateObjectURL = URL.createObjectURL;
const mockCreateObjectURL = vi.fn().mockImplementation((file) => `mock-url-for-${file.name}`);

describe("UFiles.vue", () => {
  const fileList = [createMockFile("file1.pdf"), createMockFile("file2.pdf")];

  // Create a mock File object
  function createMockFile(name: string, type: string = "application/pdf") {
    return new File(["dummy content"], name, { type });
  }

  // Setup and teardown for URL.createObjectURL mock
  beforeAll(() => {
    // Mock URL.createObjectURL before tests
    URL.createObjectURL = mockCreateObjectURL;
  });

  afterAll(() => {
    // Restore original URL.createObjectURL after tests
    URL.createObjectURL = originalCreateObjectURL;
  });

  describe("Props", () => {
    it("FileList – renders the correct number of files", () => {
      const component = mount(UFiles, {
        props: {
          fileList,
        },
      });

      const fileComponents = component.findAllComponents(UFile);

      expect(fileComponents.length).toBe(fileList.length);
    });

    it("Label – renders the correct label text", () => {
      const label = "File List";

      const component = mount(UFiles, {
        props: {
          fileList: [],
          label,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("label")).toBe(label);
    });

    it("Description – passes the correct description to ULabel", () => {
      const description = "List of files";

      const component = mount(UFiles, {
        props: {
          fileList,
          description,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("description")).toBe(description);
    });

    it("Size – passes the correct size prop to ULabel", () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const component = mount(UFiles, {
          props: {
            fileList,
            size: size as Props["size"],
          },
        });

        const labelComponent = component.findComponent(ULabel);

        expect(labelComponent.props("size")).toBe(size);
      });
    });

    it("Removable – passes removable prop to UFile components", () => {
      const removable = true;
      const fileList = [createMockFile("file1.pdf")];

      const component = mount(UFiles, {
        props: {
          fileList,
          removable,
        },
      });

      const fileComponent = component.findComponent(UFile);

      expect(fileComponent.props("removable")).toBe(removable);
    });

    it("DataTest – applies the correct data-test attribute to file items", () => {
      const dataTest = "test-files";
      const fileList = [createMockFile("file1.pdf")];

      const component = mount(UFiles, {
        props: {
          fileList,
          dataTest,
        },
      });

      const fileComponent = component.findComponent(UFile);

      expect(fileComponent.attributes("data-test")).toBe(`${dataTest}-item-0`);
    });

    it("Image – detects image files and sets imageUrl prop", () => {
      const imageFile = createMockFile("image.jpg", "image/jpeg");
      const fileList = [imageFile];

      const component = mount(UFiles, {
        props: {
          fileList,
        },
      });

      const fileComponent = component.findComponent(UFile);

      expect(fileComponent.props("imageUrl")).toBeDefined();
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UFiles, {
        props: {
          fileList: [],
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Label – renders content from label slot", () => {
      const label = "File List";
      const slotText = "Custom Label";
      const slotClass = "label-content";

      const component = mount(UFiles, {
        props: {
          fileList: [],
          label,
        },
        slots: {
          label: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Before – renders content from before-file slot", () => {
      const slotText = "Before";
      const slotClass = "before-content";

      const component = mount(UFiles, {
        props: {
          fileList,
        },
        slots: {
          "before-file": `
            <template #before-file="{ index }">
              <span class='${slotClass}'>${slotText}{{ index }}</span>
            </template>
          `,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(`${slotText}0`);
    });

    it("After – renders content from after-file slot", () => {
      const slotText = "After";
      const slotClass = "after-content";

      const component = mount(UFiles, {
        props: {
          fileList,
        },
        slots: {
          "after-file": `
            <template #after-file="{ index }">
              <span class='${slotClass}'>${slotText}{{ index }}</span>
            </template>
          `,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(`${slotText}0`);
    });

    it("File – provides correct bindings to file slot", () => {
      const fileName = "file1.pdf";
      const fileIndex = "0";
      const fileList = [createMockFile(fileName)];

      // Define class names as constants instead of hardcoding them
      const idClass = "file-id";
      const labelClass = "file-label";
      const urlClass = "file-url";
      const imageUrlClass = "file-image-url";
      const indexClass = "file-index";

      const component = mount(UFiles, {
        props: {
          fileList,
        },
        slots: {
          file: `
            <template #file="{ id, label, url, imageUrl, index }">
              <div v-if="id" class="${idClass}">{{ id }}</div>
              <div v-if="label" class="${labelClass}">{{ label }}</div>
              <div v-if="url" class="${urlClass}">{{ url }}</div>
              <div v-if="imageUrl" class="${imageUrlClass}">{{ imageUrl }}</div>
              <div v-if="index >= 0" class="${indexClass}">{{ index }}</div>
            </template>
          `,
        },
      });

      expect(component.find(`.${idClass}`).exists()).toBe(true);
      expect(component.find(`.${labelClass}`).text()).toBe(fileName);
      expect(component.find(`.${urlClass}`).exists()).toBe(true);
      expect(component.find(`.${imageUrlClass}`).exists()).toBe(false);
      expect(component.find(`.${indexClass}`).text()).toBe(fileIndex);
    });
  });

  describe("Events", () => {
    it("Remove – emits remove event when file is removed", async () => {
      const fileList = [createMockFile("file1.pdf")];
      const fileId = "test-id";
      const removable = true;

      const component = mount(UFiles, {
        props: {
          fileList,
          removable,
        },
      });

      // Find the UFile component and trigger its remove event
      const fileComponent = component.findComponent(UFile);

      await fileComponent.vm.$emit("remove", fileId);

      expect(component.emitted("remove")).toBeTruthy();
      expect(component.emitted("remove")?.[0][0]).toBe(fileId);
    });
  });

  describe("Exposed refs", () => {
    it("itemsRef – exposes itemsRef", () => {
      const component = mount(UFiles, {
        props: {
          fileList: [],
        },
      });

      expect(component.vm.itemsRef).toBeDefined();
    });
  });
});
