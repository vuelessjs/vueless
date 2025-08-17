import { ref } from "vue";

import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UCard from "../../ui.container-card/UCard.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UText from "../../ui.text-block/UText.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import USwitch from "../../ui.form-switch/USwitch.vue";
import ULink from "../../ui.button-link/ULink.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UCardArgs extends Props {
  slotTemplate?: string;
  enum: "variant";
  class?: string;
}

export default {
  id: "5060",
  title: "Containers / Card",
  component: UCard,
  args: {
    title: "Cookie Preferences",
  },
  argTypes: {
    ...getArgTypes(UCard.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCard.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UCol
    justify="between"
    class="h-full"
  >
    <URow
      v-for="(cookie, index) in cookieSettings"
      :key="cookie.label"
      justify="between"
      align="center"
      block
    >
      <UCol gap="2xs">
        <UHeader
          :label="cookie.label"
          class="text-sm"
        />
        <UText
          :label="cookie.description"
          size="sm"
          variant="lifted"
        />
      </UCol>

      <USwitch v-model="cookieValues[index]" />
    </URow>
  </UCol>
`;

const cookieSettings = ref([
  {
    label: "Strictly Necessary",
    description: "Essential cookies required for core website functionality.",
  },
  {
    label: "Functional Cookies",
    description: "Enable personalized features and enhance usability.",
  },
  {
    label: "Performance Cookies",
    description: "Help us analyze and optimize website performance.",
  },
]);

const cookieValues = ref([true, false, false]);

const DefaultTemplate: StoryFn<UCardArgs> = (args: UCardArgs) => ({
  components: { UCard, UCol, UButton, UIcon, UHeader, URow, USwitch, UText, ULink },
  setup: () => ({ args, slots: getSlotNames(UCard.__name), cookieSettings, cookieValues }),
  template: `
    <UCard v-bind="args" class="max-w-96">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UCard>
  `,
});

const EnumTemplate: StoryFn<UCardArgs> = (args: UCardArgs, { argTypes }) => ({
  components: { UCard, UCol, UButton, UIcon, UHeader, URow, USwitch, UText },
  setup: () => ({ args, argTypes, getArgs, cookieSettings, cookieValues }),
  template: `
    <URow wrap justify="center" class="p-4 bg-primary/5">
      <UCard
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="max-w-96"
      >
        ${defaultTemplate}
      </UCard>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "Customize your cookie settings to enhance your browsing experience.",
};

export const Variant = EnumTemplate.bind({});
Variant.args = { enum: "variant", title: "{enumValue}" };

export const BeforeTitleSlot = DefaultTemplate.bind({});
BeforeTitleSlot.args = {
  slotTemplate: `
    <template #before-title>
      <UIcon name="cookie" color="success" size="sm" />
    </template>
    ${defaultTemplate}
  `,
};

export const TitleSlot = DefaultTemplate.bind({});
TitleSlot.args = {
  slotTemplate: `
    <template #title="{ title }">
      <UHeader :label="title" color="primary" />
    </template>
    ${defaultTemplate}
  `,
};

export const AfterTitleSlot = DefaultTemplate.bind({});
AfterTitleSlot.args = {
  slotTemplate: `
    <template #after-title>
      <UIcon name="cookie" color="success" size="sm" />
    </template>
    ${defaultTemplate}
  `,
};

export const ActionsSlot = DefaultTemplate.bind({});
ActionsSlot.args = {
  class: "!max-w-[500px]",
  slotTemplate: `
    <template #actions>
      <URow align="center" class="max-w-fit">
        <ULink label="Learn more" />
        <UButton size="sm" label="Manage" variant="subtle" />
      </URow>
    </template>
    ${defaultTemplate}
  `,
};

export const FooterLeftSlot = DefaultTemplate.bind({});
FooterLeftSlot.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton size="sm" label="Cancel" variant="outlined" />
    </template>
  `,
};

export const FooterRightSlot = DefaultTemplate.bind({});
FooterRightSlot.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton size="sm" label="Save" />
    </template>
  `,
};
