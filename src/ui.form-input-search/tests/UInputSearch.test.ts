import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputSearch from "../UInputSearch.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props } from "../types.ts";

describe("UInputSearch.vue", () => {
  describe("props", () => {
    it("ModelValue - set initial value correctly", () => {
      const initialValue = "Test input";
      const component = mount(UInputSearch, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.get("input").element.value).toBe(initialValue);
    });

    it("ModelValue - updates value on input", async () => {
      const updatedValue = "Test input 2";

      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          debounce: 0,
        },
      });

      await component.get("input").setValue(updatedValue);

      setTimeout(() => {
        expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
      });
    });

    it("Label - passes label to UInput", () => {
      const label = "Test Label";
      const component = mount(UInputSearch, {
        props: {
          label,
        },
      });

      expect(component.getComponent(UInput).props("label")).toBe(label);
    });

    it("Size - passes size to UInput", () => {
      const size: Props["size"] = "lg";
      const component = mount(UInputSearch, {
        props: {
          size,
        },
      });

      expect(component.getComponent(UInput).props("size")).toBe(size);
    });

    it("Placeholder - passes placeholder to UInput", () => {
      const placeholder = "Search here...";
      const component = mount(UInputSearch, {
        props: {
          placeholder,
        },
      });

      expect(component.getComponent(UInput).props("placeholder")).toBe(placeholder);
    });

    it("Label Align - passes labelAlign to UInput", () => {
      const labelAlign: Props["labelAlign"] = "top";
      const component = mount(UInputSearch, {
        props: {
          labelAlign,
        },
      });

      expect(component.getComponent(UInput).props("labelAlign")).toBe(labelAlign);
    });

    it("Description - passes description to UInput", () => {
      const description = "This is a description";
      const component = mount(UInputSearch, {
        props: {
          description,
        },
      });

      expect(component.getComponent(UInput).props("description")).toBe(description);
    });

    it("Error - passes error to UInput", () => {
      const error = "This is an error message";
      const component = mount(UInputSearch, {
        props: {
          error,
        },
      });

      expect(component.getComponent(UInput).props("error")).toBe(error);
    });

    it("Min Length - don't emit value if it has less length than minLength", () => {
      const minLength = 5;
      const shortValue = "Tesssssst";

      const component = mount(UInputSearch, {
        props: {
          modelValue: "",
          minLength,
          debounce: 0,
        },
      });

      component.get("input").setValue(shortValue);

      setTimeout(() => {
        expect(component.emitted("update:modelValue")![0][0]);
      });
    });

    it("Search Button Label - renders search button with label", () => {
      const searchButtonLabel = "Search";
      const component = mount(UInputSearch, {
        props: {
          searchButtonLabel,
        },
      });

      expect(component.getComponent(UButton).props("label")).toBe(searchButtonLabel);
    });

    it("Search Button Label - hides search icon when provided", async () => {
      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          searchButtonLabel: "Search",
        },
      });

      expect(component.find("[vl-key='searchIcon']").exists()).toBe(false);
    });

    it("Debounce - sets debounce time for input", async () => {
      const debounceTime = 300;
      const updatedValue = "Debounced input";

      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          debounce: debounceTime,
        },
      });

      await component.get("input").setValue(updatedValue);

      setTimeout(() => {
        expect(component.emitted("update:modelValue")).toBeDefined();
        expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
      }, debounceTime);
    });

    it("LeftIcon - passes leftIcon to UInput", () => {
      const leftIcon = "search";
      const component = mount(UInputSearch, {
        props: {
          leftIcon,
        },
      });

      expect(component.getComponent(UInput).props("leftIcon")).toBe(leftIcon);
      expect(component.getComponent(UIcon).props("name")).toBe(leftIcon);
    });

    it("Right Icon - passes rightIcon to search icon component", () => {
      const rightIcon = "close";
      const component = mount(UInputSearch, {
        props: {
          rightIcon,
        },
      });

      expect(component.findComponent(UIcon).props("name")).toBe(rightIcon);
    });

    it("Readonly - sets readonly state on UInput", () => {
      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          readonly: true,
        },
      });

      expect(component.get("input").attributes("readonly")).toBeDefined();
    });

    it("Disabled - passes disabled state to UInput", () => {
      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          disabled: true,
        },
      });

      expect(component.get("input").attributes("disabled")).toBeDefined();
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const testCases = [
        { testCase: "search-icon" },
        { testCase: "clear" },
        { testCase: "search-button", searchButtonLabel: "Search" },
      ];

      testCases.forEach(({ testCase, searchButtonLabel }) => {
        const dataTest = "test";
        const resolvedDataTest = `test-${testCase}`;

        const component = mount(UInputSearch, {
          props: {
            dataTest,
            modelValue: "Test input",
            searchButtonLabel,
          },
        });

        component.get(`[data-test='${resolvedDataTest}']`);
      });
    });
  });

  describe("Slots", () => {
    it("Left - renders left slot content", () => {
      const slotContent = "Left Slot Content";
      const component = mount(UInputSearch, {
        slots: {
          left: slotContent,
        },
      });

      expect(component.html()).toContain(slotContent);
    });

    it("Right - renders right slot content", () => {
      const slotContent = "Right Slot Content";
      const component = mount(UInputSearch, {
        slots: {
          right: slotContent,
        },
      });

      expect(component.html()).toContain(slotContent);
    });

    it("Right - exposes right icon name", () => {
      const rightIcon = "close";
      const component = mount(UInputSearch, {
        props: {
          rightIcon,
        },
      });

      expect(component.getComponent(UIcon).props("name")).toBe(rightIcon);
    });

    it("Right - exposes Search Button Label", () => {
      const searchButtonLabel = "Search";
      const component = mount(UInputSearch, {
        props: {
          searchButtonLabel,
        },
      });

      expect(component.getComponent(UButton).props("label")).toBe(searchButtonLabel);
    });
  });

  describe("Events", () => {
    it("Clear - emits clear event when clear icon is clicked", async () => {
      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          dataTest: "test",
        },
      });

      await component.get("[data-test='test-clear']").trigger("click");

      expect(component.emitted("clear")).toBeDefined();
      expect(component.emitted("update:modelValue")).toBeDefined();
      expect(component.emitted("update:modelValue")![0][0]).toBe("");
    });

    it("Search - emits search event when search button is clicked", async () => {
      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          searchButtonLabel: "Search",
        },
      });

      await component.getComponent(UButton).trigger("click");

      expect(component.emitted("search")).toBeDefined();
      expect(component.emitted("search")![0][0]).toBe("Test input");
    });

    it("Search - emits search event when search icon is clicked", async () => {
      const component = mount(UInputSearch, {
        props: {
          modelValue: "Test input",
          dataTest: "test",
        },
      });

      await flushPromises();

      await component.get("[vl-key='searchIcon']").trigger("click");

      expect(component.emitted("search")).toBeDefined();
      expect(component.emitted("search")![0][0]).toBe("Test input");
    });
  });

  describe("Exposed Properties", () => {
    it("Input - exposes input element ref", () => {
      const component = mount(UInputSearch, {
        props: {
          modelValue: "test search",
        },
      });

      expect(component.vm.input).toBeDefined();
      expect(component.vm.input!.tagName).toBe("INPUT");
      expect(component.vm.input!.value).toBe("test search");
      expect(component.vm.input!.getAttribute("inputmode")).toBe("search");
    });
  });
});
