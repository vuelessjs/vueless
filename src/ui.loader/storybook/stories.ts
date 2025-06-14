import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import ULoader from "../../ui.loader/ULoader.vue";
import URow from "../../ui.container-row/URow.vue";
import UButton from "../../ui.button/UButton.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface ULoaderArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
}

export default {
  id: "9010",
  title: "Loaders and Skeletons / Loader",
  component: ULoader,
  args: {
    loading: true,
  },
  argTypes: {
    ...getArgTypes(ULoader.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(ULoader.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<ULoaderArgs> = (args: ULoaderArgs) => ({
  components: { ULoader },
  setup: () => ({ args, slots: getSlotNames(ULoader.__name) }),
  template: `
    <ULoader v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </ULoader>
  `,
});

const EnumTemplate: StoryFn<ULoaderArgs> = (args: ULoaderArgs, { argTypes }) => ({
  components: { ULoader, URow },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow wrap>
      <ULoader
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-tooltip="option"
      />
    </URow>
  `,
});

const LoadingTemplate: StoryFn<ULoaderArgs> = (args: ULoaderArgs) => ({
  components: { ULoader, UButton, URow },
  setup() {
    function toggleLoader() {
      isLoading.value = !isLoading.value;
    }

    const isLoading = ref(true);

    return { args, isLoading, toggleLoader };
  },
  template: `
    <URow align="center">
      <UButton @click="toggleLoader" size="sm">Toggle Loader</UButton>
      <ULoader v-bind="args" :loading="isLoading" />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };
Colors.parameters = getEnumVariantDescription();

export const Loading = LoadingTemplate.bind({});
Loading.args = {};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  size: "lg",
  slotTemplate: `
    <template #default>
      <img src="https://media.tenor.com/9zmtHZ0tIjkAAAAi/nyancat-rainbow-cat.gif" alt="Cat" />
    </template>
  `,
};
