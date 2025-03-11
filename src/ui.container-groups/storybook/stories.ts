import { getArgTypes, getSlotNames, getDocsDescription } from "../../utils/storybook.ts";

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
  setup() {
    const slots = getSlotNames(UGroups.__name);

    return { args, slots };
  },
  template: `
    <UGroups v-bind="args">
      ${args.slotTemplate}
    </UGroups>
  `,
});

const EnumVariantTemplate: StoryFn<UGroupsArgs> = (args: UGroupsArgs, { argTypes }) => ({
  components: { UGroups, UGroup, UCol, UInput },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <div>
      <UGroups
        v-for="(option, index) in options"
        :key="option"
        :[args.enum]="option"
        class="mb-8"
      >
        <UGroup :title="option" :upperlined="index !== 0">
          <UCol>
            <UInput placeholder="Enter full name" label="Full Name" />
            <UInput placeholder="Enter email address" label="Email Address" />
          </UCol>
        </UGroup>
        <UGroup title="'Additional Group'">
          <UCol>
            <UInput placeholder="Enter phone number" label="Phone Number" />
          </UCol>
        </UGroup>
      </UGroups>
    </div>
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

export const Gap = EnumVariantTemplate.bind({});
Gap.args = { enum: "gap" };
