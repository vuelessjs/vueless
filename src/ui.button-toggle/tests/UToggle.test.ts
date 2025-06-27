import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeAll } from "vitest";

import UToggle from "../UToggle.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props, UToggleOption } from "../types.ts";

describe("UToggle.vue", () => {
  let name: string;
  let options: UToggleOption[];

  beforeAll(() => {
    name = "toggle-test";
    options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ];
  });

  describe("Props", () => {
    it("Size – applies the correct size class", async () => {
      const size = {
        "2xs": "text-small",
        xs: "text-small",
        sm: "text-medium",
        md: "text-medium",
        lg: "text-large",
        xl: "text-large",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UToggle, {
          props: {
            size: size as Props["size"],
            name,
            options,
          },
        });

        const buttons = component.findAllComponents(UButton);

        expect(buttons[0].attributes("class")).toContain(classes);
      });
    });

    it("Options – renders the correct number of options", () => {
      const component = mount(UToggle, {
        props: {
          options,
          name,
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons.length).toBe(options.length);
    });

    it("Options – disables individual option when option disabled prop is true", () => {
      const customOptions: UToggleOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2", disabled: true },
      ];

      const component = mount(UToggle, {
        props: {
          options: customOptions,
          name,
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons[0].attributes("disabled")).toBeUndefined();
      expect(buttons[1].attributes("disabled")).toBeDefined();
    });

    it("Options – set icon for individual options", () => {
      const iconOptions: UToggleOption[] = [
        { value: "option1", label: "Option 1", icon: "star" },
        { value: "option2", label: "Option 2", leftIcon: "check" },
        { value: "option3", label: "Option 3", rightIcon: "close" },
      ];

      const component = mount(UToggle, {
        props: {
          options: iconOptions,
          name,
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons[0].props("icon")).toBe("star");
      expect(buttons[1].props("leftIcon")).toBe("check");
      expect(buttons[2].props("rightIcon")).toBe("close");
    });

    it("Model Value – correctly selects option based on modelValue for single selection", async () => {
      const selectedClass = "bg-primary";
      const selectedValue = "option2";

      const component = mount(UToggle, {
        props: {
          modelValue: selectedValue,
          options,
          name,
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons[1].attributes("class")).toContain(selectedClass);
    });

    it("Model Value – correctly selects options based on modelValue for multiple selection", async () => {
      const selectedClass = "bg-primary";
      const selectedValues = ["option1", "option3"];

      const multiComponent = mount(UToggle, {
        props: {
          options,
          modelValue: selectedValues,
          multiple: true,
          name,
        },
      });

      const multiButtons = multiComponent.findAllComponents(UButton);

      expect(multiButtons[0].attributes("class")).toContain(selectedClass);
      expect(multiButtons[2].attributes("class")).toContain(selectedClass);
    });

    it("Multiple – allows multiple selections when multiple prop is true", async () => {
      const component = mount(UToggle, {
        props: {
          options,
          modelValue: ["option1"],
          multiple: true,
          name,
        },
      });

      await component.findAllComponents(UButton)[1].trigger("click");

      const emittedValue = component.emitted("update:modelValue")?.[0][0];

      // Verify both options are now selected (original + clicked)
      expect(emittedValue).toEqual(["option1", "option2"]);
    });

    it("Split – applies split class when split prop is true", () => {
      const split = true;
      const splitClasses = "flex-wrap";

      const component = mount(UToggle, {
        props: {
          split,
          name,
        },
      });

      expect(component.attributes("class")).toContain(splitClasses);
    });

    it("Split – applies unsplit class when split prop is false", () => {
      const split = false;
      const unsplitClasses = "gap-px";

      const component = mount(UToggle, {
        props: {
          split,
          name,
        },
      });

      expect(component.attributes("class")).toContain(unsplitClasses);
    });

    it("Disabled – disables all options when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UToggle, {
        props: {
          options,
          disabled,
          name,
        },
      });

      const buttons = component.findAllComponents(UButton);

      buttons.forEach((button) => {
        expect(button.attributes("disabled")).toBeDefined();
      });
    });

    it("Block – applies block class when block prop is true", () => {
      const block = true;
      const blockClasses = "w-full";

      const component = mount(UToggle, {
        props: {
          block,
          options,
          name,
        },
      });

      expect(component.attributes("class")).toContain(blockClasses);
    });

    it("Round – applies round class to buttons when round prop is true", () => {
      const round = true;
      const roundClasses = "rounded-full";

      const component = mount(UToggle, {
        props: {
          round,
          options,
          name,
        },
      });

      const button = component.findComponent(UButton);

      expect(button.attributes("class")).toContain(roundClasses);
    });

    it("Square – applies square class to buttons when square prop is true", () => {
      const square = true;

      const component = mount(UToggle, {
        props: {
          options,
          square,
          name,
        },
      });

      const button = component.findComponent(UButton);

      // Square buttons have equal padding on all sides
      expect(button.attributes("class")).toContain("p-");
    });

    it("Id – applies the correct id attribute", () => {
      const id = "test-toggle-id";

      const component = mount(UToggle, {
        props: {
          id,
          name,
        },
      });

      expect(component.attributes("id")).toBe(id);
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-toggle";

      const component = mount(UToggle, {
        props: {
          dataTest,
          name,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Left – renders content from left slot", () => {
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UToggle, {
        props: {
          options,
          name,
        },
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Option – renders content from option slot", () => {
      const slotText = "Custom Option";
      const slotClass = "option-content";

      const component = mount(UToggle, {
        props: {
          options,
          name,
        },
        slots: {
          option: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Option – provides correct bindings to slots", () => {
      const optionIndex = "0";
      const bindingOptions: UToggleOption[] = [
        { value: "option1", label: "Option 1", icon: "star" },
      ];

      const valueClass = "option-value";
      const labelClass = "option-label";
      const iconClass = "option-icon";
      const indexClass = "option-index";

      const component = mount(UToggle, {
        props: {
          options: bindingOptions,
          name,
        },
        slots: {
          option: `
            <template #option="{ option, label, iconName, index }">
              <span class="${valueClass}">{{ option.value }}</span>
              <span class="${labelClass}">{{ label }}</span>
              <span class="${iconClass}">{{ iconName }}</span>
              <span class="${indexClass}">{{ index }}</span>
            </template>
          `,
        },
      });

      expect(component.find(`.${valueClass}`).text()).toBe(bindingOptions[0].value);
      expect(component.find(`.${labelClass}`).text()).toBe(bindingOptions[0].label);
      expect(component.find(`.${iconClass}`).text()).toBe(bindingOptions[0].icon);
      expect(component.find(`.${indexClass}`).text()).toBe(optionIndex);
    });

    it("Right – renders content from right slot", () => {
      const slotText = "Right";
      const slotClass = "right-content";

      const component = mount(UToggle, {
        props: {
          options,
          name,
        },
        slots: {
          right: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });
  });

  describe("Events", () => {
    it("Model Value – emits update:modelValue event when option is clicked", async () => {
      const component = mount(UToggle, {
        props: {
          options,
          name,
        },
      });

      await component.findAllComponents(UButton)[0].trigger("click");

      const emittedValue = component.emitted("update:modelValue")?.[0][0];

      expect(emittedValue).toBe(options[0].value);
    });

    it("Option Click – calls option onClick callback when option is clicked", async () => {
      const onClick = vi.fn();
      const callbackOptions: UToggleOption[] = [{ value: "option1", label: "Option 1", onClick }];

      const component = mount(UToggle, {
        props: {
          options: callbackOptions,
          name,
        },
      });

      await component.findComponent(UButton).trigger("click");

      expect(onClick).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ value: "option1", label: "Option 1" }),
      );
    });
  });

  describe("Exposed refs", () => {
    it("Options – exposes optionsRef", () => {
      const component = mount(UToggle, {
        props: {
          name,
        },
      });

      expect(component.vm.optionsRef).toBeDefined();
    });
  });
});
