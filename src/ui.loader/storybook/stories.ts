import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import ULoader from "../../ui.loader/ULoader.vue";
import URow from "../../ui.container-row/URow.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface ULoaderArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color" | "variant";
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
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow wrap>
      <ULoader
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
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

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

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
