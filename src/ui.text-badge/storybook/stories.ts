import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UNumber from "../../ui.text-number/UNumber.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UBadgeArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "color";
  outerEnum: "variant";
}

export default {
  id: "4095",
  title: "Text & Content / Badge",
  component: UBadge,
  args: {
    label: "Badge",
  },
  argTypes: {
    ...getArgTypes(UBadge.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UBadge.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UBadgeArgs> = (args: UBadgeArgs) => ({
  components: { UBadge, UIcon },
  setup: () => ({ args, slots: getSlotNames(UBadge.__name) }),
  template: `
    <UBadge v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UBadge>
  `,
});

const EnumTemplate: StoryFn<UBadgeArgs> = (args: UBadgeArgs, { argTypes }) => ({
  components: { UBadge, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UBadge
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

const MultiEnumTemplate: StoryFn<UBadgeArgs> = (args: UBadgeArgs, { argTypes }) => ({
  components: { UBadge, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <URow v-for="outerOption in argTypes?.[args.outerEnum]?.options" :key="outerOption">
        <UBadge
          v-for="option in argTypes?.[args.enum]?.options"
          v-bind="getArgs(args, option, outerOption)"
          :key="option"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Round = DefaultTemplate.bind({});
Round.args = { round: true };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", label: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", label: "{enumValue}" };

export const Colors = MultiEnumTemplate.bind({});
Colors.args = { outerEnum: "variant", enum: "color", label: "{enumValue}" };

export const IconProps: StoryFn<UBadgeArgs> = (args) => ({
  components: { UBadge, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UBadge
        v-bind="args"
        left-icon="mail"
        label="Message"
      />
      <UBadge
        v-bind="args"
        icon="info"
        label="Info"
      />
      <UBadge
        v-bind="args"
        right-icon="chat"
        label="Chat"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UBadgeArgs> = (args) => ({
  components: { UBadge, UIcon, URow, UNumber },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UBadge label="Add to favorite">
        <template #left>
          <UIcon
            name="heart_plus"
            size="2xs"
            color="inherit"
          />
        </template>
      </UBadge>

      <UBadge label="shopping_cart">
        <template #default="{ label }">
          <UNumber
            value="20.25"
            size="sm"
            currency="$"
            color="inherit"
          />
          <UIcon
            :name="label"
            size="2xs"
            color="inherit"
          />
        </template>
      </UBadge>

      <UBadge label="Delete">
        <template #right>
          <UIcon
            name="delete"
            size="2xs"
            color="inherit"
          />
        </template>
      </UBadge>
    </URow>
  `,
});
