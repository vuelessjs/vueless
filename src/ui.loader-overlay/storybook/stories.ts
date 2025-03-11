import { ref, computed } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import ULoaderOverlay from "../ULoaderOverlay.vue";
import UButton from "../../ui.button/UButton.vue";
import USelect from "../../ui.form-select/USelect.vue";

import { useLoaderOverlay } from "../useLoaderOverlay.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface ULoaderOverlayArgs extends Props {
  slotTemplate?: string;
  enum: "color";
}

export default {
  id: "9030",
  title: "Loaders and Skeletons / Loader Overlay",
  component: ULoaderOverlay,
  argTypes: {
    ...getArgTypes(ULoaderOverlay.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(ULoaderOverlay.__name),
      story: {
        height: "420px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<ULoaderOverlayArgs> = (args: ULoaderOverlayArgs) => ({
  components: { ULoaderOverlay },
  setup() {
    const slots = getSlotNames(ULoaderOverlay.__name);

    return { args, slots };
  },
  template: `
    <ULoaderOverlay v-bind="args" :config="{ overlay: 'h-full w-full' }">
      ${args.slotTemplate || getSlotsFragment("")}
    </ULoaderOverlay>
  `,
});

const EnumVariantTemplate: StoryFn<ULoaderOverlayArgs> = (
  args: ULoaderOverlayArgs,
  { argTypes },
) => ({
  components: { ULoaderOverlay, USelect },
  setup() {
    const selectModel = ref(null);
    const options = computed(() =>
      argTypes?.[args.enum]?.options?.map((label, id) => ({ label, id })),
    );
    const selectedValue = computed(
      () => options.value?.find((option) => option.id === selectModel.value)?.label,
    );

    return {
      args,
      selectModel,
      selectedValue,
      options,
    };
  },
  template: `
    <USelect
      v-model="selectModel"
      :options="options"
      placeholder="Select loader color..."
      open-direction="bottom"
      class="max-w-60 absolute z-50"
    />

    <ULoaderOverlay
      v-bind="args"
      :[args.enum]="selectedValue"
      :config="{ overlay: 'h-full w-full z-10' }"
    />
  `,
});

const LoadingTemplate: StoryFn<ULoaderOverlayArgs> = (args: ULoaderOverlayArgs) => ({
  components: { ULoaderOverlay, UButton },
  setup() {
    const loaderOverlay = useLoaderOverlay();

    const loaderOverlayOn = loaderOverlay.loaderOverlayOn;
    const loaderOverlayOff = loaderOverlay.loaderOverlayOff;
    const isLoading = loaderOverlay.isLoading;

    function toggleLoading() {
      isLoading.value ? loaderOverlayOff() : loaderOverlayOn();
    }

    return { args, isLoading, toggleLoading };
  },
  template: `
    <UButton
      label="Toggle loading"
      size="sm"
      class="absolute z-50"
      @click="toggleLoading"
    />

    <ULoaderOverlay
      v-bind="args"
      :loading="isLoading"
      :config="{ overlay: 'h-full w-full z-10' }"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Loading = LoadingTemplate.bind({});
Loading.args = {};

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      <img src="https://media.tenor.com/9zmtHZ0tIjkAAAAi/nyancat-rainbow-cat.gif" alt="Cat" />
    </template>
  `,
};
