import {
  trimText,
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UText from "../../ui.text-block/UText.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTextArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "align" | "variant" | "color";
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
        class="w-full"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Align = EnumTemplate.bind({});
Align.args = { enum: "align" };

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
