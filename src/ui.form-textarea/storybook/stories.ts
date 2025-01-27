import { ref, computed } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTextareaArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
}

export default {
  id: "3070",
  title: "Form Inputs & Controls / Textarea",
  component: UTextarea,
  args: {
    label: "Your message",
    modelValue:
      "Hello! I'm interested in learning more about your services. Please get back to me at your earliest convenience.",
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
  setup() {
    const slots = getSlotNames(UTextarea.__name);
    const errorMessage = computed(() => (args.modelValue === "" ? args.error : ""));

    return { args, slots, errorMessage };
  },
  template: `
    <UTextarea
      v-bind="args"
      v-model="args.modelValue"
      :error="errorMessage"
      class="max-w-96"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UTextarea>
  `,
});

const EnumVariantTemplate: StoryFn<UTextareaArgs> = (args: UTextareaArgs, { argTypes }) => ({
  components: { UTextarea, UCol },
  setup() {
    let filteredOptions = argTypes?.[args.enum]?.options;

    if (args.enum === "labelAlign") {
      filteredOptions = argTypes?.[args.enum]?.options?.filter(
        (item) => item !== "right" && item !== "topWithDesc",
      );
    }

    return {
      args,
      filteredOptions,
    };
  },
  template: `
    <UCol>
      <div class="w-1/3" v-for="(option, index) in filteredOptions" :key="index">
        <UTextarea
          v-bind="args"
          :[args.enum]="option"
          :description="option"
          rows="3"
          class="max-w-96"
        />
      </div>
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

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
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
  components: { UTextarea, URow, UIcon, UAvatar },
  directives: { tooltip },
  setup() {
    const switchModel = ref(false);

    return { args, switchModel };
  },
  template: `
    <URow no-mobile>
      <UTextarea v-bind="args">
        <template #left>
          <UAvatar />
        </template>
      </UTextarea>

      <UTextarea v-bind="args">
        <template #right>
          <UIcon name="send" color="green" v-tooltip="'Send message'" />
        </template>
      </UTextarea>
    </URow>
  `,
});
