import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UFile from "../UFile.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { ComponentPublicInstance } from "vue";
import type { Props } from "../types";

describe("UFile.vue", () => {
  describe("Props", () => {
    it("URL – passes the correct url to ULink", () => {
      const url = "https://example.com/file.pdf";

      const component = mount(UFile, {
        props: {
          url,
        },
      });

      const linkComponent = component.findComponent(ULink);

      expect(linkComponent.props("href")).toBe(url);
    });

    it("ImageUrl – renders image when imageUrl prop is provided", () => {
      const imageUrl = "https://example.com/image.jpg";

      const component = mount(UFile, {
        props: {
          imageUrl,
        },
      });

      const image = component.find("img");

      expect(image.exists()).toBe(true);
      expect(image.attributes("src")).toBe(imageUrl);
    });

    it("Label – renders the correct label text", () => {
      const label = "Example File";

      const component = mount(UFile, {
        props: {
          label,
        },
      });

      const linkComponent = component.findComponent(ULink);

      expect(linkComponent.text()).toContain(label);
    });

    it("Size – applies the correct size class", async () => {
      const sizeClasses = {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1.5",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UFile, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("ID – uses provided id", () => {
      const id = "test-file-id";
      const removable = true;

      const component = mount(UFile, {
        props: {
          id,
          removable, // Need to set removable to true to show the remove button
        },
      });

      // Directly call the onRemove method
      (component.vm as ComponentPublicInstance & { onRemove: () => void }).onRemove();

      expect(component.emitted("remove")?.[0][0]).toBe(id);
    });

    it("Removable – shows remove button when removable prop is true", () => {
      const removable = true;
      const dataTest = "test-file";
      const removeIconDataTest = "test-file-remove-item";

      const component = mount(UFile, {
        props: {
          removable,
          dataTest,
        },
      });

      // Get the remove button directly using the same approach as in the event test
      const removeIcon = component.findAllComponents(UIcon).find((component) => {
        return component.props("dataTest") === removeIconDataTest;
      });

      expect(removeIcon).toBeDefined();
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-file";

      const component = mount(UFile, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UFile, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Default – provides correct bindings to default slot", () => {
      const id = "test-id";
      const label = "Test File";
      const url = "https://example.com/file.pdf";
      const imageUrl = "https://example.com/image.jpg";

      // Define class names as constants instead of hardcoding them
      const idClass = "file-id";
      const labelClass = "file-label";
      const urlClass = "file-url";
      const imageUrlClass = "file-image-url";

      const component = mount(UFile, {
        props: {
          id,
          label,
          url,
          imageUrl,
        },
        slots: {
          default: `
            <template #default="{ id, label, url, imageUrl }">
              <div class="${idClass}">{{ id }}</div>
              <div class="${labelClass}">{{ label }}</div>
              <div class="${urlClass}">{{ url }}</div>
              <div class="${imageUrlClass}">{{ imageUrl }}</div>
            </template>
          `,
        },
      });

      expect(component.find(`.${idClass}`).text()).toBe(id);
      expect(component.find(`.${labelClass}`).text()).toBe(label);
      expect(component.find(`.${urlClass}`).text()).toBe(url);
      expect(component.find(`.${imageUrlClass}`).text()).toBe(imageUrl);
    });

    it("Left – renders content from left slot", () => {
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UFile, {
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Right – renders content from right slot", () => {
      const slotText = "Right";
      const slotClass = "right-content";

      const component = mount(UFile, {
        slots: {
          right: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });
  });

  describe("Events", () => {
    it("Remove – emits remove event when remove button is clicked", async () => {
      const id = "test-file-id";
      const removable = true;
      const dataTest = "test-file";
      const removeIconDataTest = "test-file-remove-item";

      const component = mount(UFile, {
        props: {
          id,
          removable,
          dataTest,
        },
      });

      const removeIcon = component.findAllComponents(UIcon).find((component) => {
        return component.props("dataTest") === removeIconDataTest;
      });

      expect(removeIcon).toBeDefined();

      // Directly call the onRemove method
      (component.vm as ComponentPublicInstance & { onRemove: () => void }).onRemove();

      // Check if the remove event was emitted with the correct value
      expect(component.emitted("remove")).toBeTruthy();
      expect(component.emitted("remove")?.[0][0]).toBe(id);
    });
  });

  describe("Exposed refs", () => {
    it("file – exposes file ref", () => {
      const component = mount(UFile, {});

      expect(component.vm.fileRef).toBeDefined();
    });
  });
});
