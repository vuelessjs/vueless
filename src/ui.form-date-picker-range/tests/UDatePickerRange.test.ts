import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import UDatePickerRange from "../UDatePickerRange.vue";
import UInput from "../../ui.form-input/UInput.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UButton from "../../ui.button/UButton.vue";
import UDatePickerRangePeriodMenu from "../UDatePickerRangePeriodMenu.vue";
import { Period } from "../constants";

import type { RangeDate } from "../../ui.form-calendar/types";

describe("UDatePickerRange.vue", () => {
  describe("Props", () => {
    it("Model Value – sets initial range value correctly", () => {
      const modelValue: RangeDate = {
        from: "2023-12-01",
        to: "2023-12-31",
      };

      const component = mount(UDatePickerRange, {
        props: {
          modelValue,
          dateFormat: "Y-m-d",
        },
      });

      expect(component.props("modelValue")).toEqual(modelValue);
    });

    it("Model Value – emits update:modelValue when range changes", async () => {
      const modelValue: RangeDate = {
        from: null,
        to: null,
      };

      const component = mount(UDatePickerRange, {
        props: {
          modelValue,
          variant: "input",
        },
      });

      const input = component.findComponent(UInput).get("input");

      await input.trigger("focus");

      const days = component.findAll("[vl-key='day']");

      await days[0].trigger("click");
      await days[3].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    it("Variant – renders input variant correctly", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).exists()).toBe(true);
    });

    it("Variant – renders button variant correctly", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findAllComponents(UButton).length).toBeGreaterThan(0);
    });

    it("Label – passes label to UInput component when variant is input", () => {
      const label = "Date Range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          label,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("label")).toBe(label);
    });

    it("Placeholder – passes placeholder to UInput component", () => {
      const placeholder = "Select date range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          placeholder,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("placeholder")).toBe(placeholder);
    });

    it("Description – passes description to UInput component", () => {
      const description = "Select your preferred date range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          description,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("description")).toBe(description);
    });

    it("Error – passes error to UInput component", () => {
      const error = "Invalid date range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          error,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("error")).toBe(error);
    });

    it("Disabled – passes disabled state to UInput component", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          disabled: true,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("disabled")).toBe(true);
    });

    it("Disabled – applies disabled state to buttons when variant is button", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          disabled: true,
          modelValue: { from: null, to: null },
        },
      });

      const buttons = component.findAllComponents(UButton);

      buttons.forEach((button) => {
        expect(button.props("disabled")).toBe(true);
      });
    });

    it("Size – applies correct size to components", () => {
      const size = "lg";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          size,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("size")).toBe(size);
    });

    it("Size – applies correct size to buttons when variant is button", () => {
      const size = "sm";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          size,
          modelValue: { from: null, to: null },
        },
      });

      const buttons = component.findAllComponents(UButton);

      buttons.forEach((button) => {
        expect(button.props("size")).toBe(size);
      });
    });

    it("Label Align – passes labelAlign to UInput component", () => {
      const labelAlign = "left";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          labelAlign,
          label: "Date Range",
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("labelAlign")).toBe(labelAlign);
    });

    it("Left Icon – passes leftIcon to UInput component", () => {
      const leftIcon = "calendar";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          leftIcon,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("leftIcon")).toBe(leftIcon);
    });

    it("Right Icon – passes rightIcon to UInput component", () => {
      const rightIcon = "search";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          rightIcon,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("rightIcon")).toBe(rightIcon);
    });

    it("Date Format – uses correct date format", () => {
      const dateFormat = "d/m/Y";

      const component = mount(UDatePickerRange, {
        props: {
          dateFormat,
          modelValue: {
            from: "01/12/2023",
            to: "31/12/2023",
          },
        },
      });

      expect(component.props("dateFormat")).toBe(dateFormat);
    });

    it("User Date Format – applies user-friendly date format", () => {
      const userDateFormat = "F j, Y";

      const component = mount(UDatePickerRange, {
        props: {
          userDateFormat,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.props("userDateFormat")).toBe(userDateFormat);
    });

    it("Min Date – passes minDate to calendar and period menu", async () => {
      const minDate = "2023-01-01";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          minDate,
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      await input.trigger("focus");

      expect(component.props("minDate")).toBe(minDate);
    });

    it("Max Date – passes maxDate to calendar and period menu", async () => {
      const maxDate = "2024-12-31";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          maxDate,
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      await input.trigger("focus");

      expect(component.props("maxDate")).toBe(maxDate);
    });

    it("Custom Range Button – applies custom range button configuration", async () => {
      const customRangeButton = {
        range: { from: new Date("2023-01-01"), to: new Date("2023-01-31") },
        label: "January 2023",
        description: "All of January",
      };

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          customRangeButton,
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      const periodMenu = component.findComponent(UDatePickerRangePeriodMenu);

      expect(periodMenu.exists()).toBe(true);
      expect(periodMenu.props("customRangeButton")).toEqual(customRangeButton);
    });

    it("Id – sets id attribute", () => {
      const id = "date-picker-range-id";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          id,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("id")).toBe(id);
    });

    it("Data Test – applies correct data-test attributes", () => {
      const dataTest = "date-picker-range";

      const component = mount(UDatePickerRange, {
        props: {
          dataTest,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.find(`[data-test="${dataTest}"]`).exists()).toBe(true);
    });

    it("Data Test – applies data-test to input variant", () => {
      const dataTest = "date-picker-range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          dataTest,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.find(`[data-test="${dataTest}-input"]`).exists()).toBe(true);
    });

    it("Data Test – applies data-test to button variant", () => {
      const dataTest = "date-picker-range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          dataTest,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.find(`[data-test="${dataTest}-button"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-button-prev"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-button-next"]`).exists()).toBe(true);
    });

    it("Data Test – applies data-test to period menu buttons when menu is open", async () => {
      const dataTest = "date-picker-range";
      const menuPrefix = `${dataTest}-period-menu`;

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          dataTest,
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      const monthButton = component.find(`[data-test="${menuPrefix}-period-month"]`);
      const quarterButton = component.find(`[data-test="${menuPrefix}-period-quarter"]`);
      const yearButton = component.find(`[data-test="${menuPrefix}-period-year"]`);
      const ownRangeButton = component.find(`[data-test="${menuPrefix}-own-range"]`);

      expect(monthButton.exists()).toBe(true);
      expect(quarterButton.exists()).toBe(true);
      expect(yearButton.exists()).toBe(true);
      expect(ownRangeButton.exists()).toBe(true);

      await monthButton.trigger("click");

      const gridButtons = component.findAll(`[data-test^="${menuPrefix}-period-date-"]`);

      expect(gridButtons.length).toBeGreaterThan(0);
    });

    it("Data Test – period menu buttons have no data-test attribute when dataTest is not set", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      const periodMenu = component.findComponent(UDatePickerRangePeriodMenu);

      expect(periodMenu.exists()).toBe(true);
      expect(component.findAll('[data-test^="null-"]').length).toBe(0);

      const monthButton = component.findAll("button").find((button) => button.text() !== "");

      if (monthButton) {
        await monthButton.trigger("click");
      }

      expect(component.findAll('[data-test^="null-"]').length).toBe(0);
    });
  });

  describe("Periods", () => {
    const dataTest = "date-picker-range";
    const menuPrefix = `${dataTest}-period-menu`;
    const periodButtonNames: string[] = Object.values(Period).filter(
      (type) => type !== Period.OwnRange && type !== Period.Custom,
    );
    const fullWeek: RangeDate = {
      from: new Date(2023, 11, 4),
      to: new Date(2023, 11, 10, 23, 59, 59),
    };

    async function mountOpened(props: Record<string, unknown>) {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          dataTest,
          modelValue: { from: null, to: null },
          ...props,
        },
      });

      await component.findComponent(UInput).get("input").trigger("focus");

      return component;
    }

    function findPeriodButton(component: ReturnType<typeof mount>, name: string) {
      return component.find(`[data-test="${menuPrefix}-period-${name}"]`);
    }

    function findOwnRangeButton(component: ReturnType<typeof mount>) {
      return component.find(`[data-test="${menuPrefix}-own-range"]`);
    }

    function getRenderedPeriodNames(component: ReturnType<typeof mount>) {
      return component
        .findAll(`[data-test^="${menuPrefix}-period-"]`)
        .map((button) => button.attributes("data-test")!.replace(`${menuPrefix}-period-`, ""))
        .filter((name) => periodButtonNames.includes(name));
    }

    function isActive(button: ReturnType<ReturnType<typeof mount>["find"]>) {
      return button.attributes("vl-key") === "periodButtonActive";
    }

    it("Periods – renders all period buttons and own range button by default", async () => {
      const component = await mountOpened({});

      expect(getRenderedPeriodNames(component)).toEqual(periodButtonNames);
      expect(findOwnRangeButton(component).exists()).toBe(true);
    });

    it("Periods – renders only allowed period buttons without own range button", async () => {
      const component = await mountOpened({ periods: ["month", "year"] });

      expect(getRenderedPeriodNames(component)).toEqual(["month", "year"]);
      expect(findOwnRangeButton(component).exists()).toBe(false);
    });

    it.each(["ownRange", "month"])(
      "Periods – hides period switch when %s is the only period",
      async (period) => {
        const component = await mountOpened({ periods: [period] });

        expect(getRenderedPeriodNames(component)).toEqual([]);
        expect(findOwnRangeButton(component).exists()).toBe(false);
      },
    );

    it("Periods – reduces range inputs top margin when period switch is hidden", async () => {
      const component = await mountOpened({ periods: ["ownRange"] });
      const rangeInputWrapper = component.get("[vl-key='rangeInputWrapper']");

      expect(rangeInputWrapper.classes()).toContain("mt-2");
      expect(rangeInputWrapper.classes()).not.toContain("mt-4");
    });

    it("Periods – removes range switch top padding when period switch is hidden", async () => {
      const component = await mountOpened({ periods: ["month"] });

      expect(component.get("[vl-key='rangeSwitchWrapper']").classes()).toContain("pt-0");
    });

    it("Periods – keeps range inputs top margin when period switch is shown", async () => {
      const component = await mountOpened({});

      expect(component.get("[vl-key='rangeInputWrapper']").classes()).toContain("mt-4");
    });

    it("Periods – shows own range button when custom range is also available", async () => {
      const component = await mountOpened({
        periods: ["ownRange"],
        customRangeButton: {
          range: { from: new Date(2023, 5, 1), to: new Date(2023, 5, 15) },
          label: "First half of June",
        },
      });

      expect(findOwnRangeButton(component).exists()).toBe(true);
      expect(component.find(`[data-test="${menuPrefix}-custom-range"]`).exists()).toBe(true);
    });

    it("Periods – renders period buttons in canonical order", async () => {
      const component = await mountOpened({
        periods: ["year", "ownRange", "week", "quarter"],
      });

      expect(getRenderedPeriodNames(component)).toEqual(["week", "quarter", "year"]);
      expect(findOwnRangeButton(component).exists()).toBe(true);
    });

    it("Periods – falls back to own range when model matches a disallowed period", async () => {
      const component = await mountOpened({
        periods: ["month", "ownRange"],
        modelValue: fullWeek,
      });

      expect(findPeriodButton(component, "week").exists()).toBe(false);
      expect(isActive(findOwnRangeButton(component))).toBe(true);
      expect(isActive(findPeriodButton(component, "month"))).toBe(false);
    });

    it("Periods – falls back to the first allowed period when own range is not allowed", async () => {
      const component = await mountOpened({
        periods: ["year", "month"],
        modelValue: fullWeek,
      });

      expect(isActive(findPeriodButton(component, "month"))).toBe(true);
      expect(isActive(findPeriodButton(component, "year"))).toBe(false);
    });

    it("Periods – treats an empty array as all periods and warns", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const component = await mountOpened({ periods: [] });

      expect(getRenderedPeriodNames(component)).toEqual(periodButtonNames);
      expect(findOwnRangeButton(component).exists()).toBe(true);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('No valid "periods"'));

      warnSpy.mockRestore();
    });

    it.each([
      ["next", new Date(2023, 6, 1), new Date(2023, 6, 31)],
      ["prev", new Date(2023, 4, 1), new Date(2023, 4, 31)],
    ])(
      "Periods – shifts custom range by the resolved period (%s)",
      async (direction, expectedFrom, expectedTo) => {
        const component = mount(UDatePickerRange, {
          props: {
            variant: "button",
            dataTest,
            periods: ["month", "year"],
            modelValue: { from: null, to: null },
            customRangeButton: {
              range: { from: new Date(2023, 5, 1), to: new Date(2023, 5, 15) },
              label: "First half of June",
            },
            "onUpdate:modelValue": (value: RangeDate) => {
              component.setProps({ modelValue: value });
            },
          },
        });

        await component.get("[vl-key='rangeButtonSelect']").trigger("click");
        await findPeriodButton(component, "year").trigger("click");
        await component.get(`[data-test="${menuPrefix}-custom-range"]`).trigger("click");

        await component.get(`[data-test="${dataTest}-button-${direction}"]`).trigger("click");

        const { from, to } = component.props("modelValue") as {
          from: Date;
          to: Date;
        };

        expect(from.toDateString()).toBe(expectedFrom.toDateString());
        expect(to.toDateString()).toBe(expectedTo.toDateString());
      },
    );
  });

  describe("Menu", () => {
    it("Menu – opens when input is focused", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      expect(component.findComponent(UDatePickerRangePeriodMenu).exists()).toBe(true);
    });

    it("Menu – opens when button is clicked", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: { from: null, to: null },
        },
      });

      const button = component.find("[vl-key='rangeButtonSelect']");

      await button.trigger("click");

      expect(component.findComponent(UDatePickerRangePeriodMenu).exists()).toBe(true);
    });

    it("Menu – contains range inputs when period is ownRange", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      expect(component.find("[vl-key='rangeInputWrapper']").exists()).toBe(true);
    });

    it("Menu – contains calendar when period is ownRange", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      expect(component.find("[vl-key='datepickerCalendar']").exists()).toBe(true);
    });

    it("Menu – allows selecting the same day for from and to in range mode", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
          dateFormat: "Y-m-d",
          "onUpdate:modelValue": (value: RangeDate) => {
            component.setProps({ modelValue: value });
          },
        },
      });

      const input = component.findComponent(UInput).get("input");

      await input.trigger("focus");

      const days = component.findAll("[vl-key='day']");

      await days[10].trigger("click");
      await days[10].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();

      const emittedValues = component.emitted("update:modelValue")!;
      const lastEmittedValue = emittedValues[emittedValues.length - 1][0] as RangeDate;

      expect(lastEmittedValue.from).not.toBeNull();
      expect(lastEmittedValue.to).not.toBeNull();
      expect(lastEmittedValue.from).toBe(lastEmittedValue.to);
    });
  });

  describe("Range Navigation", () => {
    it("Range Navigation – prev button shifts range backward", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: {
            from: "2023-12-01",
            to: "2023-12-31",
          },
          dateFormat: "Y-m-d",
        },
      });

      const prevButton = component.findAll('[vl-key="rangeButtonShift"]');

      await prevButton[0].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    it("Range Navigation – next button shifts range forward", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: {
            from: "2023-12-01",
            to: "2023-12-31",
          },
          dateFormat: "Y-m-d",
        },
      });

      const nextButton = component.findAll('[vl-key="rangeButtonShift"]');

      await nextButton[1].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });
  });

  describe("Slots", () => {
    it("Left – renders custom content from left slot", () => {
      const slotContent = "Custom Left Content";
      const slotClass = "custom-left";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
        slots: {
          left: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    it("Left – exposes icon-name to slot when leftIcon prop is provided", () => {
      const leftIcon = "calendar";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          leftIcon,
          modelValue: { from: null, to: null },
        },
        slots: {
          left: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.text()).toContain(`Icon: ${leftIcon}`);
    });

    it("Right – renders custom content from right slot", () => {
      const slotContent = "Custom Right Content";
      const slotClass = "custom-right";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
        slots: {
          right: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    it("Right – exposes icon-name to slot when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          rightIcon,
          modelValue: { from: null, to: null },
        },
        slots: {
          right: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.text()).toContain(`Icon: ${rightIcon}`);
    });

    it("Description – renders custom content from description slot", () => {
      const customDescription = "Custom description content";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
          description: "Default description",
        },
        slots: {
          description: customDescription,
        },
      });

      const labelComponent = component.getComponent(UInput).getComponent(ULabel);
      const descriptionElement = labelComponent.find("[vl-child-key='description']");

      expect(descriptionElement.text()).toBe(customDescription);
    });

    it("Error – renders custom content from error slot", () => {
      const customError = "Custom error content";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
          error: "Default error message",
        },
        slots: {
          error: customError,
        },
      });

      const labelComponent = component.getComponent(UInput).getComponent(ULabel);
      const errorElement = labelComponent.find("[vl-child-key='error']");

      expect(errorElement.text()).toBe(customError);
    });
  });

  describe("Events", () => {
    it("ChangeRange – handles change-range event from calendar when dates are selected", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
          dateFormat: "Y-m-d",
          "onUpdate:modelValue": (value: RangeDate) => {
            component.setProps({ modelValue: value });
          },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      const days = component.findAll("[vl-key='day']");

      expect(days.length).toBeGreaterThan(0);

      await days[0].trigger("click");
      await days[3].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    it("ChangeRange – handles change-range event from calendar when both dates are selected", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
          dateFormat: "Y-m-d",
          "onUpdate:modelValue": (value: RangeDate) => {
            component.setProps({ modelValue: value });
          },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      const days = component.findAll("[vl-key='day']");

      await days[0].trigger("click");
      await days[3].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    it("ChangeRange – handles change-range event from calendar when same date is selected twice", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
          dateFormat: "Y-m-d",
          "onUpdate:modelValue": (value: RangeDate) => {
            component.setProps({ modelValue: value });
          },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      const days = component.findAll("[vl-key='day']");

      await days[10].trigger("click");
      await days[10].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();

      const emittedValues = component.emitted("update:modelValue")!;
      const lastEmittedValue = emittedValues[emittedValues.length - 1][0] as RangeDate;

      expect(lastEmittedValue.from).not.toBeNull();
      expect(lastEmittedValue.to).not.toBeNull();
      expect(lastEmittedValue.from).toBe(lastEmittedValue.to);
    });
  });

  describe("Exposed Properties", () => {
    it("Exposes wrapper element ref", () => {
      const component = mount(UDatePickerRange, {
        props: {
          modelValue: { from: null, to: null },
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });

    it("Exposes calendar element ref", () => {
      const component = mount(UDatePickerRange, {
        props: {
          modelValue: { from: null, to: null },
        },
      });

      expect(component.vm.calendarRef).toBeDefined();
    });
  });
});
