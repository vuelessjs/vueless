import { ref } from "vue";
import { getArgs, getArgTypes, getSlotNames, getDocsDescription } from "../../utils/storybook.ts";

import ULoaderProgress from "../ULoaderProgress.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import { useLoaderProgress } from "../useLoaderProgress.ts";
import { loaderProgressOff, loaderProgressOn } from "../utilLoaderProgress.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface ULoaderProgressArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size";
}

export default {
  id: "9020",
  title: "Loaders and Skeletons / Loader Progress",
  component: ULoaderProgress,
  argTypes: {
    ...getArgTypes(ULoaderProgress.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(ULoaderProgress.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<ULoaderProgressArgs> = (args: ULoaderProgressArgs) => ({
  components: { ULoaderProgress, UButton, URow },
  setup() {
    const loaderProgress = useLoaderProgress();

    if (!loaderProgress) {
      throw new Error("LoaderProgress is not provided. Ensure it is properly injected.");
    }

    const { loaderProgressOn, loaderProgressOff } = loaderProgress;
    const slots = getSlotNames(ULoaderProgress.__name);

    return { args, slots, loaderProgressOn, loaderProgressOff };
  },
  template: `
    <ULoaderProgress v-bind="args" resources="https://api.publicapis.org/entries"/>

    <URow gap="sm">
      <UButton label="On" size="sm" @click="loaderProgressOn('https://api.publicapis.org/entries')" />
      <UButton label="Off" size="sm" @click="loaderProgressOff('https://api.publicapis.org/entries')" />
    </URow>
  `,
});

const EnumTemplate: StoryFn<ULoaderProgressArgs> = (args: ULoaderProgressArgs, { argTypes }) => ({
  components: { ULoaderProgress, UButton, UCol, URow },
  setup() {
    return {
      args,
      argTypes,
      getArgs,
      loaderProgressOff,
      loaderProgressOn,
    };
  },
  template: `
    <UCol>
      <URow gap="sm" class="pb-4">
        <UButton label="On" size="sm" @click="loaderProgressOn('https://api.publicapis.org/images')" />
        <UButton label="Off" size="sm" @click="loaderProgressOff('https://api.publicapis.org/images')" />
      </URow>

      <ULoaderProgress
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        v-bind="getArgs(args, option)"
        resources="https://api.publicapis.org/images"
        class="static"
      />
    </UCol>
  `,
});

const LoadingTemplate: StoryFn<ULoaderProgressArgs> = (args: ULoaderProgressArgs) => ({
  components: { ULoaderProgress, UButton, URow },
  setup() {
    function toggleLoader() {
      isLoading.value = !isLoading.value;
    }

    const isLoading = ref(false);

    return { args, isLoading, toggleLoader };
  },
  template: `
    <URow align="center">
      <UButton @click="toggleLoader" size="sm">Toggle Loader</UButton>
      <ULoaderProgress v-bind="args" :loading="isLoading" />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const Loading = LoadingTemplate.bind({});
Loading.args = {};
