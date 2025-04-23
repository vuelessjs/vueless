import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import { ref } from "vue";

import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UButtonArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "color";
  outerEnum: "variant";
}

export default {
  id: "1010",
  title: "Buttons & Links / Button",
  component: UButton,
  argTypes: { ...getArgTypes(UButton.__name) },
  parameters: {
    docs: {
      ...getDocsDescription(UButton.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UButtonArgs> = (args: UButtonArgs) => ({
  components: { UButton, UIcon },
  setup: () => ({ args, slots: getSlotNames(UButton.__name) }),
  template: `
    <UButton v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UButton>
  `,
});

const EnumTemplate: StoryFn<UButtonArgs> = (args: UButtonArgs, { argTypes }) => ({
  components: { UButton, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UButton
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

const MultiEnumTemplate: StoryFn<UButtonArgs> = (args: UButtonArgs, { argTypes }) => ({
  components: { UButton, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <URow v-for="outerOption in argTypes?.[args.outerEnum]?.options" :key="outerOption">
        <UButton
          v-for="option in argTypes?.[args.enum]?.options"
          v-bind="getArgs(args, option, outerOption)"
          :key="option"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { label: "Button" };

export const Variant = EnumTemplate.bind({});
Variant.args = { enum: "variant", label: "{enumValue}" };

export const Round = EnumTemplate.bind({});
Round.args = { enum: "variant", label: "{enumValue}", round: true };

export const Disabled = EnumTemplate.bind({});
Disabled.args = { enum: "variant", label: "{enumValue}", disabled: true };

export const Color = MultiEnumTemplate.bind({});
Color.args = { outerEnum: "variant", enum: "color", label: "{enumValue}" };

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const Icons: StoryFn<UButtonArgs> = (args) => ({
  components: { UButton, URow },
  setup: () => ({ args }),
  template: `
    <URow>
      <UButton v-bind="args" label="Download" left-icon="download" />
      <UButton v-bind="args" icon="favorite" />
      <UButton v-bind="args" label="Menu" right-icon="menu" />
    </URow>
  `,
});

export const Square = DefaultTemplate.bind({});
Square.args = { icon: "filter_list", square: true };

export const Block = DefaultTemplate.bind({});
Block.args = { label: "Fullwidth Button", block: true };

export const Loading: StoryFn<UButtonArgs> = (args) => ({
  components: { UButton, URow },
  setup: () => ({
    args,
    loading: ref(false),
  }),
  template: `
    <URow>
      <UButton label="Submit" :loading="loading" @click="loading = !loading" />
      <UButton
        variant="outlined"
        :label="loading ? 'Stop loader' : 'Start loader'"
        :left-icon="loading ? 'stop_circle' : 'play_arrow'"
        @click="loading = !loading"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UButtonArgs> = (args) => ({
  components: { UButton, UIcon, URow, UAvatar, UBadge },
  setup: () => ({ args }),
  template: `
    <URow>
      <UButton v-bind="args" label="Profile">
        <template #left>
          <UAvatar src="https://i.pravatar.cc/150?img=57" size="2xs" rounded="full" />
        </template>
      </UButton>

      <UButton v-bind="args" square>
        <UIcon size="sm" color="inherit" name="progress_activity" class="animate-spin" />
      </UButton>

      <UButton v-bind="args" label="Filters">
        <template #right>
          <UBadge label="2" size="sm" color="grayscale" variant="solid" round />
        </template>
      </UButton>
    </URow>
  `,
});
