import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import URadio from "../../ui.form-radio/URadio.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UText from "../../ui.text-block/UText.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface URadioArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign" | "color";
}

export default {
  id: "3140",
  title: "Form Inputs & Controls / Radio",
  component: URadio,
  args: {
    label: "Payment Method",
    value: "1",
    color: "primary",
  },
  argTypes: {
    ...getArgTypes(URadio.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(URadio.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<URadioArgs> = (args: URadioArgs) => ({
  components: { URadio, UBadge, UText, ULink, URow, UIcon },
  setup: () => ({ args, slots: getSlotNames(URadio.__name) }),
  template: `
    <URadio v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </URadio>
  `,
});

const EnumTemplate: StoryFn<URadioArgs> = (args: URadioArgs, { argTypes }) => ({
  components: { URadio, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow gap="xl">
      <URadio
        v-for="(option, index) in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        :value="index + 1"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { name: "Default" };

export const Description = DefaultTemplate.bind({});
Description.args = {
  name: "Description",
  label: "Subscription Plan",
  description: "Choose your preferred plan. You can change it anytime.",
};

export const Error: StoryFn<URadioArgs> = (args: URadioArgs) => ({
  components: { URadio },
  setup: () => ({ args }),
  template: `
    <URadio
      v-bind="args"
      name="Error"
      v-model="args.modelValue"
      :error="args.modelValue ? '' : 'This field is required. Please make a selection.'"
    />
  `,
});
Error.args = {
  modelValue: "",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true, name: "Disabled" };

export const Checked = DefaultTemplate.bind({});
Checked.args = { checked: true, name: "Checked" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { name: "LabelAlign", enum: "labelAlign", label: "{enumValue}", modelValue: 1 };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { name: "Sizes", enum: "size", label: "{enumValue}", modelValue: 1 };

export const Colors = EnumTemplate.bind({});
Colors.args = { name: "Colors", enum: "color", label: "{enumValue}", modelValue: 1 };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  name: "LabelSlot",
  value: "courier",
  color: "primary",
  slotTemplate: `
    <template #label>
      <URow gap="2xs" align="center">
        <UText>I agree to the <ULink label="Privacy Policy" /></UText>
        <UIcon name="contract" size="xs" />
      </URow>
    </template>
  `,
};

export const BottomSlot = DefaultTemplate.bind({});
BottomSlot.args = {
  name: "terms",
  label: "I agree to the Terms and Conditions",
  value: "terms",
  color: "primary",
  slotTemplate: `
    <template #bottom>
      <UBadge label="Required to proceed" color="warning" variant="outlined" size="sm" class="mt-2" />
    </template>
  `,
};
