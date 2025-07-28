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

import type { Meta, StoryFn } from "@storybook/vue3-vite";
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
  setup: () => ({ args, slots: getSlotNames(ULoaderOverlay.__name) }),
  template: `
    <ULoaderOverlay v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </ULoaderOverlay>
  `,
});

const EnumTemplate: StoryFn<ULoaderOverlayArgs> = (args: ULoaderOverlayArgs, { argTypes }) => ({
  components: { ULoaderOverlay, USelect },
  setup() {
    const selectModel = ref(null);

    const options = computed(() => {
      return argTypes?.[args.enum]?.options?.map((label, id) => ({ label, id }));
    });

    const selectedValue = computed(() => {
      return options.value?.find((option) => option.id === selectModel.value)?.label;
    });

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
      class="max-w-60 absolute z-[99999]"
    />

    <ULoaderOverlay :color="selectedValue" />
  `,
});

const LoadingTemplate: StoryFn<ULoaderOverlayArgs> = (args: ULoaderOverlayArgs) => ({
  components: { ULoaderOverlay, UButton },
  setup() {
    const isLoading = ref(true);

    function loaderOverlayOn() {
      isLoading.value = true;
    }

    function loaderOverlayOff() {
      isLoading.value = false;
    }

    return { args, isLoading, loaderOverlayOn, loaderOverlayOff };
  },
  template: `
    <UButton
      size="sm"
      label="Toggle loading"
      class="absolute z-[99999]"
      @click="isLoading ? loaderOverlayOff() : loaderOverlayOn()"
    />

    <ULoaderOverlay
      v-bind="args"
      :loading="isLoading"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Loading = LoadingTemplate.bind({});
Loading.args = {};

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <img src="https://media.tenor.com/9zmtHZ0tIjkAAAAi/nyancat-rainbow-cat.gif" alt="Cat" />
    </template>
  `,
};
