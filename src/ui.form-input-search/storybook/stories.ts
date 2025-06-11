import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputSearch from "../../ui.form-input-search/UInputSearch.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UDropdownButton from "../../ui.dropdown-button/UDropdownButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputSearchArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
}

export default {
  id: "3070",
  title: "Form Inputs & Controls / Input Search",
  component: UInputSearch,
  argTypes: {
    ...getArgTypes(UInputSearch.__name),
  },
  args: {
    modelValue: "Which UI library is the best?",
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputSearch.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputSearchArgs> = (args: UInputSearchArgs) => ({
  components: { UInputSearch, UIcon },
  setup: () => ({ args, slots: getSlotNames(UInputSearch.__name) }),
  template: `
    <UInputSearch
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputSearch>
  `,
});

const EnumTemplate: StoryFn<UInputSearchArgs> = (args: UInputSearchArgs, { argTypes }) => ({
  components: { UInputSearch, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UInputSearch
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        class="max-w-96"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Search for product or primary" };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { modelValue: "", placeholder: "Type to search..." };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Search for additional details." };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "This field is required. Please enter a value.", modelValue: "" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", modelValue: "", placeholder: "{enumValue}" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign", modelValue: "", label: "{enumValue}" };

export const SearchButton = DefaultTemplate.bind({});
SearchButton.args = { searchButtonLabel: "Search" };
SearchButton.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "`searchButtonLabel` prop shows a button with a passed label instead of the default search icon. When clicked, it triggers the search event.",
    },
  },
};

export const MinLength = DefaultTemplate.bind({});
MinLength.args = { minLength: 4 };
MinLength.parameters = {
  docs: {
    description: {
      story:
        "Determines minimum character length for search. If not met, search event is not fired.",
    },
  },
};

export const IconProps: StoryFn<UInputSearchArgs> = (args) => ({
  components: { UInputSearch, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInputSearch
        left-icon="travel_explore"
        placeholder="Search for a travel destination"
      />
      <UInputSearch
        right-icon="person_search"
        placeholder="Search for a person"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UInputSearchArgs> = (args) => ({
  components: { UInputSearch, URow, UIcon, UDropdownButton },
  setup() {
    const aiVersions = [
      { label: "GPT-4o", id: "gpt-4o" },
      { label: "GPT-4o-mini", id: "gpt-4o-mini" },
      { label: "GPT-4", id: "gpt-4" },
    ];

    const aiVersion = ref(null);

    return { args, aiVersion, aiVersions };
  },
  template: `
    <URow class="gap-4" align="stretch">
      <UInputSearch
        placeholder="Ask something..."
        :config="{ searchInput: { leftSlot: 'pl-0' } }"
      >
        <template #left>
          <UDropdownButton
            v-model="aiVersion"
            :options="aiVersions"
            label="AI Version"
            size="sm"
            variant="ghost"
            class="rounded-r-none h-full"
            :config="{ wrapper: 'h-full', listbox: 'w-auto' }"
          />
        </template>
      </UInputSearch>

      <UInputSearch
        placeholder="Search by rental district..."
        :config="{
          searchInput: {
            inputLabel: {
              content: '!h-full',
            },
          },
        }"
      >
        <template #right>
          <URow align="center" gap="xs">
            <UIcon name="straighten" size="sm" />
            <span class="text-sm text-neutral-600">+2km</span>
          </URow>
        </template>
      </UInputSearch>
    </URow>
  `,
});
