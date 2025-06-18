import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";

import UInputSearch from "../UInputSearch.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props } from "../types.ts";

describe("UInputSearch.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("sets the input value correctly", async () => {
      const modelValue = "search term";

      const component = mount(UInputSearch, {
        props: {
          modelValue,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.exists()).toBe(true);
      expect(input.props("modelValue")).toBe(modelValue);
    });

    // Label prop
    it("renders the label correctly", () => {
      const label = "Search";

      const component = mount(UInputSearch, {
        props: {
          label,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("label")).toBe(label);
    });

    // Placeholder prop
    it("renders the placeholder correctly", () => {
      const placeholder = "Search...";

      const component = mount(UInputSearch, {
        props: {
          placeholder,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("placeholder")).toBe(placeholder);
    });

    // Size prop
    it("applies the correct size", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      Object.entries(sizes).forEach(([size, value]) => {
        const component = mount(UInputSearch, {
          props: {
            size: size as Props["size"],
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("size")).toBe(value);
      });
    });

    // LabelAlign prop
    it("sets the label alignment correctly", () => {
      const labelAligns = {
        top: "top",
        topInside: "topInside",
        topWithDesc: "topWithDesc",
        left: "left",
        right: "right",
      };

      Object.entries(labelAligns).forEach(([align, value]) => {
        const component = mount(UInputSearch, {
          props: {
            labelAlign: align as Props["labelAlign"],
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("labelAlign")).toBe(value);
      });
    });

    // Error prop
    it("applies error state correctly", () => {
      const error = "Invalid search term";

      const component = mount(UInputSearch, {
        props: {
          error,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("error")).toBe(error);
    });

    // Description prop
    it("renders the description correctly", () => {
      const description = "Enter search keywords";

      const component = mount(UInputSearch, {
        props: {
          description,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("description")).toBe(description);
    });

    // Disabled prop
    it("disables the component when disabled is true", () => {
      const disabled = true;

      const component = mount(UInputSearch, {
        props: {
          disabled,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("disabled")).toBe(true);
    });

    // Readonly prop
    it("makes the component readonly when readonly is true", () => {
      const readonly = true;

      const component = mount(UInputSearch, {
        props: {
          readonly,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("readonly")).toBe(true);
    });

    // LeftIcon prop
    it("sets the left icon correctly", () => {
      const leftIcon = "search";

      const component = mount(UInputSearch, {
        props: {
          leftIcon,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("leftIcon")).toBe(leftIcon);
    });

    // RightIcon prop
    it("sets the right icon correctly", () => {
      const rightIcon = "magnify";

      const component = mount(UInputSearch, {
        props: {
          rightIcon,
        },
      });

      // Find the UIcon component in the right slot
      const icon = component.findComponent(UIcon);

      expect(icon.props("name")).toBe(rightIcon);
    });

    // SearchButtonLabel prop
    it("renders a search button when searchButtonLabel is provided", () => {
      const searchButtonLabel = "Search";

      const component = mount(UInputSearch, {
        props: {
          searchButtonLabel,
        },
      });

      const button = component.findComponent(UButton);

      expect(button.exists()).toBe(true);
      expect(button.props("label")).toBe(searchButtonLabel);
    });

    // MinLength prop
    it("respects minLength for search", async () => {
      const minLength = 3;
      const dataTest = "test-search";

      const component = mount(UInputSearch, {
        props: {
          minLength,
          dataTest,
        },
      });

      // Simulate typing a short search term
      await component.findComponent(UInput).vm.$emit("update:model-value", "ab");

      // Wait for the next tick to allow the component to update
      await nextTick();

      // Set the local value directly to simulate the input
      component.vm.localValue = "ab";

      // Manually call the search method
      component.vm.search();

      // Check that search is not emitted for short term
      expect(component.emitted("search")).toBeFalsy();

      // Simulate typing a longer search term
      await component.findComponent(UInput).vm.$emit("update:model-value", "abc");

      // Wait for the next tick to allow the component to update
      await nextTick();

      // Set the local value directly to simulate the input
      component.vm.localValue = "abc";

      // Manually call the search method
      component.vm.search();

      // Check that search is emitted for term meeting minLength
      expect(component.emitted("search")).toBeTruthy();
      expect(component.emitted("search")[0][0]).toBe("abc");
    });

    // DataTest prop
    it("sets the data-test attribute correctly", () => {
      const dataTest = "test-search-input";

      const component = mount(UInputSearch, {
        props: {
          dataTest,
        },
      });

      const input = component.find(`[data-test="${dataTest}"]`);

      expect(input.exists()).toBe(true);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when input changes", async () => {
      const component = mount(UInputSearch);
      const searchTerm = "test search";

      // Simulate input change
      await component.findComponent(UInput).vm.$emit("update:model-value", searchTerm);

      // Wait for debounce
      await new Promise((resolve) => setTimeout(resolve, 300));

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toBe(searchTerm);
    });

    // Clear event
    it("emits clear event when clear button is clicked", async () => {
      const dataTest = "test-search";
      const component = mount(UInputSearch, {
        props: {
          modelValue: "test search",
          dataTest,
        },
      });

      // Wait for the component to update
      await nextTick();

      // Manually call the clear method
      component.vm.onClickClear();

      expect(component.emitted("clear")).toBeTruthy();
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toBe("");
    });

    // Search event
    it("emits search event when search icon is clicked", async () => {
      const searchTerm = "test search";
      const dataTest = "test-search";

      const component = mount(UInputSearch, {
        props: {
          modelValue: searchTerm,
          dataTest,
        },
      });

      // Wait for the component to update
      await nextTick();

      // Manually call the search method
      component.vm.onClickSearch();

      expect(component.emitted("search")).toBeTruthy();
      expect(component.emitted("search")[0][0]).toBe(searchTerm);
    });

    // Search event with button
    it("emits search event when search button is clicked", async () => {
      const searchTerm = "test search";
      const searchButtonLabel = "Search";
      const dataTest = "test-search";

      const component = mount(UInputSearch, {
        props: {
          modelValue: searchTerm,
          searchButtonLabel,
          dataTest,
        },
      });

      // Wait for the component to update
      await nextTick();

      // Manually call the search method
      component.vm.onClickSearch();

      expect(component.emitted("search")).toBeTruthy();
      expect(component.emitted("search")[0][0]).toBe(searchTerm);
    });

    // Search event on Enter key
    it("emits search event when Enter key is pressed", async () => {
      const searchTerm = "test search";
      const dataTest = "test-search";

      const component = mount(UInputSearch, {
        props: {
          modelValue: searchTerm,
          dataTest,
        },
      });

      // Wait for the component to update
      await nextTick();

      // Manually call the keyup enter method
      component.vm.onKeyupEnter();

      expect(component.emitted("search")).toBeTruthy();
      expect(component.emitted("search")[0][0]).toBe(searchTerm);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content in the left slot", () => {
      const slotClass = "left-content";

      const component = mount(UInputSearch, {
        slots: {
          left: `<div class="${slotClass}">Left Content</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });

    // Right slot
    it("renders content in the right slot", () => {
      const slotClass = "right-content";

      const component = mount(UInputSearch, {
        slots: {
          right: `<div class="${slotClass}">Right Content</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });

    // Right slot with bindings
    it("provides correct bindings to the right slot", () => {
      const slotClass = "right-content";
      const iconName = "custom_search";
      const searchButtonLabel = "Find";

      const component = mount(UInputSearch, {
        props: {
          rightIcon: iconName,
          searchButtonLabel,
        },
        slots: {
          right: `<template #right="{ iconName, searchButtonLabel }">
            <div class="${slotClass}">
              <span class="icon-name">{{ iconName }}</span>
              <span class="button-label">{{ searchButtonLabel }}</span>
            </div>
          </template>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(".icon-name").text()).toBe(iconName);
      expect(component.find(".button-label").text()).toBe(searchButtonLabel);
    });
  });

  // Exposed refs tests
  describe("Exposed Refs", () => {
    // Input ref
    it("exposes input ref", async () => {
      const wrapper = mount(UInputSearch);

      // Access the exposed ref
      expect(wrapper.vm.input).not.toBeNull();
    });
  });

  // Functionality tests
  describe("Functionality", () => {
    // Debounce functionality
    it("debounces input changes", async () => {
      const debounce = 100;

      const component = mount(UInputSearch, {
        props: {
          debounce,
        },
      });

      // Simulate rapid input changes
      await component.findComponent(UInput).vm.$emit("update:model-value", "t");
      await component.findComponent(UInput).vm.$emit("update:model-value", "te");
      await component.findComponent(UInput).vm.$emit("update:model-value", "tes");
      await component.findComponent(UInput).vm.$emit("update:model-value", "test");

      // Check that update:modelValue is not emitted immediately
      expect(component.emitted("update:modelValue")).toBeFalsy();

      // Wait for debounce
      await new Promise((resolve) => setTimeout(resolve, debounce + 50));

      // Check that update:modelValue is emitted with the final value
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toBe("test");
    });
  });
});
