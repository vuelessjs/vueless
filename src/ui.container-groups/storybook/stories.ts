import { ref } from "vue";

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
import UInputPassword from "../../ui.form-input-password/UInputPassword.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
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
  components: { UGroups, UGroup, UCol, UInput, UInputPassword, UAlert },
  setup: () => ({
    args,
    slots: getSlotNames(UGroups.__name),
    email: ref(""),
    password: ref(""),
    phone: ref(""),
  }),
  template: `
    <UGroups v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UGroups>
  `,
});

const EnumTemplate: StoryFn<UGroupsArgs> = (args: UGroupsArgs, { argTypes }) => ({
  components: { UGroups, UGroup, UCol, UInput, UInputPassword, UAlert },
  setup: () => ({ args, argTypes, getArgs, email: ref(""), password: ref(""), phone: ref("") }),
  template: `
    <UCol align="stretch">
      <UGroups
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="border border-primary border-dashed rounded-medium p-4"
      >
        <UGroup :title="option">
          <UCol>
            <UAlert description="Please check your email for verification." color="info" />
            <UInput v-model="email" label="Email" placeholder="john@email.com" type="email" />
            <UInputPassword v-model="password" label="Password" placeholder="********" />
          </UCol>
        </UGroup>
        <UGroup title="Additional Group" class="mt-4">
          <UCol>
            <UInput v-model="phone" placeholder="Enter phone number" label="Phone Number" />
          </UCol>
        </UGroup>
      </UGroups>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  slotTemplate: `
    <UGroup title="User Group 1">
      <UCol>
        <UAlert description="Please check your email for verification." color="info" />
        <UInput v-model="email" label="Email" placeholder="john@email.com" type="email" />
        <UInputPassword v-model="password" label="Password" placeholder="********" />
      </UCol>
    </UGroup>

    <UGroup upperlined title="User Group 2">
      <UCol>
        <UAlert description="Password length must be at least 8 symbols." color="warning" />
        <UInput v-model="email" label="Email" placeholder="john@email.com" type="email" />
        <UInputPassword v-model="password" label="Password" placeholder="********" />
      </UCol>
    </UGroup>

    <UGroup upperlined title="User Group 3">
      <UCol>
        <UAlert description="All fields are required." color="error" />
        <UInput v-model="email" label="Email" placeholder="john@email.com" type="email" />
        <UInputPassword v-model="password" label="Password" placeholder="********" />
      </UCol>
    </UGroup>
  `,
};

export const Gap = EnumTemplate.bind({});
Gap.args = { enum: "gap" };
