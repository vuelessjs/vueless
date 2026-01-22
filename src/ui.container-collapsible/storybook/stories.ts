import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UCollapsible from "../UCollapsible.vue";
import UButton from "../../ui.button/UButton.vue";
import UCard from "../../ui.container-card/UCard.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";
import UText from "../../ui.text-block/UText.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UCollapsibleArgs extends Props {
  slotTemplate?: string;
  enum: "yPosition" | "xPosition";
  class?: string;
  label?: string;
  rowClass?: string;
}

const defaultTemplate = `
  <template #default>
    <UButton label="John Doe" variant="outlined" size="sm" />
  </template>

  <template #content>
    <UCard class="min-w-[280px] !p-2.5">
      <URow align="center" gap="sm" class="mb-2">
        <UAvatar label="John Doe" size="md" />
        <UCol gap="none">
          <UText size="sm">John Doe</UText>
          <UText variant="lifted" size="xs">john.doe@example.com</UText>
        </UCol>
      </URow>
      <UDivider />
      <UCol gap="2xs" class="mt-2">
        <UButton
          label="Settings"
          variant="subtle"
          size="sm"
          left-icon="settings"
          color="neutral"
          block
          class="justify-start"
        />
        <UButton
          label="Help & Support"
          variant="subtle"
          size="sm"
          left-icon="help"
          color="info"
          block
          class="justify-start"
        />
        <UButton
          label="Sign Out"
          variant="subtle"
          size="sm"
          left-icon="logout"
          color="error"
          block
          class="justify-start"
        />
      </UCol>
    </UCard>
  </template>
`;

export default {
  id: "5270",
  title: "Containers / Collapsible",
  component: UCollapsible,
  args: {
    slotTemplate: defaultTemplate,
  },
  argTypes: {
    ...getArgTypes(UCollapsible.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCollapsible.__name),
      story: {
        height: "300px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UCollapsibleArgs> = (args: UCollapsibleArgs) => ({
  components: { UCollapsible, UButton, UCard, UIcon, UAvatar, UDivider, UText, UCol, URow },
  setup: () => ({ args, slots: getSlotNames(UCollapsible.__name) }),
  template: `
    <UCollapsible v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UCollapsible>
  `,
});

const EnumTemplate: StoryFn<UCollapsibleArgs> = (args: UCollapsibleArgs, { argTypes }) => ({
  components: { UCollapsible, UButton, UCard, UIcon, UAvatar, UDivider, UText, UCol, URow },
  setup: () => {
    const openStates = ref<Record<string, boolean>>({});

    return { args, argTypes, getArgs, openStates };
  },
  template: `
    <URow :class="args.rowClass">
      <UCollapsible
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        v-model:open="openStates[option]"
        :key="option"
      >
        <template #default>
          <UButton :label="option" variant="outlined" size="sm" />
        </template>

        <template #content>
          <UCard class="min-w-[280px] !p-2.5">
            <URow align="center" gap="sm" class="mb-2">
              <UAvatar label="John Doe" size="md" />
              <UCol gap="none">
                <UText size="sm">John Doe</UText>
                <UText variant="lifted" size="xs">john.doe@example.com</UText>
              </UCol>
            </URow>
            <UDivider />
            <UCol gap="2xs" class="mt-2">
              <UButton
                label="Settings"
                variant="subtle"
                size="sm"
                left-icon="settings"
                color="neutral"
                block
                class="justify-start"
              />
              <UButton
                label="Help & Support"
                variant="subtle"
                size="sm"
                left-icon="help"
                color="info"
                block
                class="justify-start"
              />
              <UButton
                label="Sign Out"
                variant="subtle"
                size="sm"
                left-icon="logout"
                color="error"
                block
                class="justify-start"
              />
            </UCol>
          </UCard>
        </template>
      </UCollapsible>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard, UDivider, UText, UIcon, UCol, URow },
  setup() {
    return { args };
  },
  template: `
    <UCollapsible disabled>
      <UButton label="John Doe" disabled variant="subtle" size="sm" />
    </UCollapsible>
  `,
});
Disabled.parameters = {
  docs: {
    story: {
      height: "120px",
    },
  },
};

export const XPosition = EnumTemplate.bind({});
XPosition.args = {
  enum: "xPosition",
  label: "{enumValue}",
  rowClass: "w-full justify-center gap-96",
};

export const YPosition = EnumTemplate.bind({});
YPosition.args = { enum: "yPosition", label: "{enumValue}" };
YPosition.parameters = {
  storyClasses: "h-[500px] flex items-center px-6 pt-8 pb-12",
};

export const NonAbsolute: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard, UCol, UDivider, UText },
  setup() {
    return { args };
  },
  template: `
    <UCol gap="md">
      <UCollapsible :absolute="false">
        <template #default="{ opened }">
          <UButton :label="opened ? 'Close' : 'Open'" />
        </template>
        <template #content>
          <UCard
            title="Non-Absolute Content"
            description="This content is not positioned absolutely, so it flows with the document."
          />
        </template>
      </UCollapsible>
      <div class="p-4 border border-gray-300 rounded">
        <p>This content appears below the collapsible and will be pushed down when it opens.</p>
      </div>
    </UCol>
  `,
});

export const NoCloseOnOutside = DefaultTemplate.bind({});
NoCloseOnOutside.args = { closeOnOutside: false };

export const CloseOnContent = DefaultTemplate.bind({});
CloseOnContent.args = { closeOnContent: true };
