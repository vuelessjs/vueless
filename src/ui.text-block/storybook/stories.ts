import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UText from "../../ui.text-block/UText.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTextArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "align";
}

export default {
  id: "4020",
  title: "Text & Content / Text",
  component: UText,
  argTypes: {
    ...getArgTypes(UText.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UText.__name),
    },
  },
  args: {},
} as Meta;

const defaultTemplate = `
  <p>
    <b>To proceed with your registration</b>, please enter your <u>email address</u> in the field below.
    <i>A verification link</i> will be sent to your inbox shortly.
  </p>
`;

const DefaultTemplate: StoryFn<UTextArgs> = (args: UTextArgs) => ({
  components: { UText, URow, UBadge },
  setup: () => ({ args, slots: getSlotNames(UText.__name) }),
  template: `
    <UText v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UText>
  `,
});

const EnumTemplate: StoryFn<UTextArgs> = (args: UTextArgs, { argTypes }) => ({
  components: { UText, UCol },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UText
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-tooltip="option"
        class="w-full"
      >
        ${args.slotTemplate || defaultTemplate}
      </UText>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Align = EnumTemplate.bind({});
Align.args = { enum: "align" };
Align.parameters = getEnumVariantDescription();

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Line = DefaultTemplate.bind({});
Line.args = {
  line: true,
};
Line.parameters = {
  docs: {
    description: {
      story: "Removes text line height (useful for 1-line text).",
    },
  },
};

export const Paragraphs = DefaultTemplate.bind({});
Paragraphs.args = {
  slotTemplate: `
    <template #default>
      <p>
        In a world where technology evolves at an unprecedented pace, staying
        updated with the latest advancements is crucial for success. Companies
        that adapt quickly to new trends often find themselves at the forefront
        of their industries, leading to increased innovation and productivity.
        However, it's not just about adopting new tools but also about integrating
        them seamlessly into existing workflows to maximize their potential.
      </p>

      <p>
        Employees must be encouraged to continuously learn and develop new skills,
        ensuring they can leverage these technological advancements effectively.
        This not only enhances their professional growth but also contributes to
        the overall success of the organization. By fostering a culture of
        continuous improvement, businesses can navigate the challenges of a
        rapidly changing landscape and emerge stronger and more competitive.
      </p>
    </template>
  `,
};

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

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <p>To proceed with your registration, please enter your
    <UBadge label="email address" v-bind="args" color="success" /> in the field below.
    A verification link will be sent to your inbox shortly.</p>
  `,
};
