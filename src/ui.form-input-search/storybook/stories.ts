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
import UText from "../../ui.text-block/UText.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputSearchArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
  wrapperClass?: string;
}

export default {
  id: "3070",
  title: "Form Inputs & Controls / Input Search",
  component: UInputSearch,
  argTypes: {
    ...getArgTypes(UInputSearch.__name),
  },
  args: {
    modelValue: "Wireless headphones",
    label: "Search for products, brands, or categories",
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
    <UCol :class="args.wrapperClass">
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

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { modelValue: "", placeholder: "Type to search..." };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Find exactly what you're looking for with a quick search." };

export const Error: StoryFn<UInputSearchArgs> = (args: UInputSearchArgs) => ({
  components: { UInputSearch },
  setup: () => ({ args, modelValue: ref("") }),
  template: `
    <UInputSearch
      v-bind="args"
      v-model="modelValue"
      class="!max-w-96"
      :error="modelValue ? '' : 'This field is required. Please enter a value.'"
    />
  `,
});

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", modelValue: "", placeholder: "{enumValue}" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = {
  enum: "labelAlign",
  modelValue: "",
  label: "{enumValue}",
  description: "Search for additional details.",
  wrapperClass: "gap-16",
};

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
  components: { UInputSearch, UCol, URow, UIcon, UDropdownButton, UText },
  setup() {
    const aiVersions = [
      { label: "GPT-4o", id: "gpt-4o" },
      { label: "GPT-4o-mini", id: "gpt-4o-mini" },
      { label: "GPT-4", id: "gpt-4" },
    ];

    return { args, aiVersions };
  },
  template: `
    <UCol>
      <UInputSearch placeholder="Search by rental district...">
        <template #right>
          <URow align="center" gap="xs">
            <UIcon name="straighten" size="sm" />
            <UText label="+2km" variant="muted" />
          </URow>
        </template>
      </UInputSearch>

      <UInputSearch
        placeholder="Ask something..."
        :config="{ searchInput: { leftSlot: 'pl-0' } }"
      >
        <template #left>
          <UDropdownButton
            v-model="args.aiVersion"
            :options="aiVersions"
            label="AI Version"
            size="sm"
            variant="soft"
            class="rounded-r-none"
          />
        </template>
      </UInputSearch>
    </UCol>
  `,
});
Slots.parameters = {
  docs: {
    story: {
      height: "270px",
    },
  },
};
