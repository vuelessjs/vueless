import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTextareaArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
}

export default {
  id: "3075",
  title: "Form Inputs & Controls / Textarea",
  component: UTextarea,
  args: {
    label: "Your message",
    modelValue:
      "Hi there! I'd like to learn more about your services. When you have a moment, could you share some details?",
  },
  argTypes: {
    ...getArgTypes(UTextarea.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UTextarea.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UTextareaArgs> = (args: UTextareaArgs) => ({
  components: { UTextarea, UIcon },
  setup: () => ({ args, slots: getSlotNames(UTextarea.__name) }),
  template: `
    <UTextarea
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UTextarea>
  `,
});

const EnumTemplate: StoryFn<UTextareaArgs> = (args: UTextareaArgs, { argTypes }) => ({
  components: { UTextarea, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UTextarea
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        rows="3"
        class="max-w-96"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { modelValue: "", placeholder: "Enter text here..." };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Provide additional details in this field." };

export const Error = DefaultTemplate.bind({});
Error.args = { modelValue: "", error: "This field is required. Please enter a value." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign", description: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", description: "{enumValue}" };

export const Resizable = DefaultTemplate.bind({});
Resizable.args = { resizable: true };

export const RowsNumber = DefaultTemplate.bind({});
RowsNumber.args = { rows: "6" };
RowsNumber.parameters = {
  docs: {
    description: {
      story: "You can set the number of visible rows via the `rows` prop.",
    },
  },
};

export const Readonly = DefaultTemplate.bind({});
Readonly.args = { readonly: true, modelValue: "Meeting scheduled for Monday at 10 AM." };

export const NoAutocomplete = DefaultTemplate.bind({});
NoAutocomplete.args = {
  noAutocomplete: true,
  modelValue: "",
  placeholder: "Try typing something here...",
};
NoAutocomplete.parameters = {
  docs: {
    description: {
      story: "Disable browser's autocomplete.",
    },
  },
};

export const Slots: StoryFn<UTextareaArgs> = (args) => ({
  components: { UTextarea, URow, UIcon },
  directives: { tooltip },
  setup: () => ({ args }),
  template: `
    <URow>
      <UTextarea v-bind="args" v-model="args.modelValue" :max-length="300">
        <template #left>
          <span class="text-sm text-lifted">{{ args.modelValue.length }}/300</span>
        </template>
      </UTextarea>

      <UTextarea v-bind="args">
        <template #right>
          <UIcon
            name="send"
            color="success"
            v-tooltip="'Send message'"
            interactive
          />
        </template>
      </UTextarea>
    </URow>
  `,
});
