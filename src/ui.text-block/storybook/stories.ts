import {
  trimText,
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UText from "../../ui.text-block/UText.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UTextArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "align" | "variant" | "color" | "weight";
  class?: string;
}

export default {
  id: "4020",
  title: "Text & Content / Text",
  component: UText,
  args: {
    label: trimText(`
      Easily customize your UI with flexible components.
    `),
  },
  argTypes: {
    ...getArgTypes(UText.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UText.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UTextArgs> = (args: UTextArgs) => ({
  components: { UText, URow, UBadge },
  setup: () => ({ args, slots: getSlotNames(UText.__name) }),
  template: `
    <UText v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UText>
  `,
});

const EnumTemplate: StoryFn<UTextArgs> = (args: UTextArgs, { argTypes }) => ({
  components: { UText, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UText
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Align = EnumTemplate.bind({});
Align.args = { enum: "align", class: "w-full" };

export const Weight: StoryFn<UTextArgs> = (args: UTextArgs, { argTypes }) => ({
  components: { UText, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UText v-bind="args" weight="normal" />

      <UText v-bind="args" weight="medium" />

      <UText v-bind="args" weight="bold" />
    </UCol>
  `,
});

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Color = EnumTemplate.bind({});
Color.args = { enum: "color" };

export const Variant = EnumTemplate.bind({});
Variant.args = { enum: "variant" };

export const Line: StoryFn<UTextArgs> = (args: UTextArgs) => ({
  components: { UText, UCol },
  setup: () => ({ args }),
  template: `
    <UCol>
      <UText>
        <div class="rounded-medium border border-primary border-dashed w-fit">
          Text with default library line height.
        </div>
      </UText>

      <UText line>
        <div class="rounded-medium border border-primary border-dashed w-fit">
          Text with line height equal to its font size.
        </div>
      </UText>
    </UCol>
  `,
});
Line.args = {};

export const Wrap: StoryFn<UTextArgs> = (args: UTextArgs) => ({
  components: { UText, UCol },
  setup: () => ({ args }),
  template: `
    <UCol>
      <UText>
        <div class="rounded-medium border border-primary border-dashed w-32">
          Text with wrapping enabled (default behavior).
        </div>
      </UText>

      <UText :wrap="false">
        <div class="rounded-medium border border-primary border-dashed w-32">
          Text with wrapping disabled (text-nowrap).
        </div>
      </UText>
    </UCol>
  `,
});
Wrap.args = {};

export const List = DefaultTemplate.bind({});
List.args = {
  slotTemplate: `
    <template #default>
      <URow gap="2xl">
        <ul>
          <li>Ensure your password is strong</li>
          <li>Update your profile information</li>
          <li>Check your email for updates</li>
        </ul>
        <ol>
          <li>Create an account by signing up</li>
          <li>Verify your email address</li>
          <li>Log in to access your dashboard</li>
        </ol>
      </URow>
    </template>
  `,
};

export const FormattedText = DefaultTemplate.bind({});
FormattedText.args = {
  slotTemplate: `
    <p>
      <b>To proceed with your registration</b>, please enter your <u>email address</u> in the field below.
      <i>A verification link</i> will be sent to your inbox shortly.
    </p>
  `,
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <p>To proceed with your registration, please enter your
      <UBadge label="email address" color="success" variant="subtle" /> in the field below.
      A verification link will be sent to your inbox shortly.</p>
    </template>
  `,
};
