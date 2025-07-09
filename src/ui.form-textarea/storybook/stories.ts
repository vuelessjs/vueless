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
import UText from "../../ui.text-block/UText.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTextareaArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
  wrapperClass?: string;
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
    <UCol :class="args.wrapperClass">
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

export const Error: StoryFn<UTextareaArgs> = (args: UTextareaArgs) => ({
  components: { UTextarea, UIcon },
  setup: () => ({ args }),
  template: `
    <UTextarea
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
      :error="args.modelValue ? '' : 'This field is required. Please enter a value.'"
    />
  `,
});
Error.args = { modelValue: "" };

export const Readonly = DefaultTemplate.bind({});
Readonly.args = { readonly: true, modelValue: "Meeting scheduled for Monday at 10 AM." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = {
  enum: "labelAlign",
  description: "{enumValue}",
  wrapperClass: "gap-16",
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

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
  components: { UTextarea, URow, UIcon, UText },
  directives: { tooltip },
  setup: () => ({ args }),
  template: `
    <URow>
      <UTextarea v-bind="args" v-model="args.modelValue" :max-length="300">
        <template #left>
          <UText :label="args.modelValue?.length + '/300'" variant="lifted" />
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
