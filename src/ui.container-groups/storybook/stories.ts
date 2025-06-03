import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UGroups from "../../ui.container-groups/UGroups.vue";
import UGroup from "../../ui.container-group/UGroup.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UGroupsArgs extends Props {
  slotTemplate?: string;
  enum: "gap";
}

export default {
  id: "5035",
  title: "Containers / Groups",
  component: UGroups,
  args: {},
  argTypes: {
    ...getArgTypes(UGroups.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UGroups.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UGroupsArgs> = (args: UGroupsArgs) => ({
  components: { UGroups, UGroup, UCol, UInput },
  setup: () => ({ args, slots: getSlotNames(UGroups.__name) }),
  template: `
    <UGroups v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UGroups>
  `,
});

const EnumTemplate: StoryFn<UGroupsArgs> = (args: UGroupsArgs, { argTypes }) => ({
  components: { UGroups, UGroup, UCol, UInput },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol align="stretch">
      <UGroups
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      >
        <UGroup :title="option" upperlined>
          <UCol>
            <UInput placeholder="Enter full name" label="Full Name" />
            <UInput placeholder="Enter email address" label="Email Address" />
          </UCol>
        </UGroup>
        <UGroup title="Additional Group" class="mt-4">
          <UCol>
            <UInput placeholder="Enter phone number" label="Phone Number" />
          </UCol>
        </UGroup>
      </UGroups>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  slotTemplate: `
    <UGroup :upperlined="n !== 1" :title="'User Group '+n" v-for="n in 3">
      <UCol>
        <UInput placeholder="Enter full name" label="Full Name" />
        <UInput placeholder="Enter email address" label="Email Address" />
      </UCol>
    </UGroup>
  `,
};

export const Gap = EnumTemplate.bind({});
Gap.args = { enum: "gap" };
