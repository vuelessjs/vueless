import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import ULoaderOverlay from "../ULoaderOverlay.vue";
import UButton from "../../ui.button/UButton.vue";
import UCol from "../../ui.container-col/UCol.vue";

import { useLoaderOverlay } from "../useLoaderOverlay.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { ULoaderOverlayProps } from "../types.ts";

interface ULoaderOverlayArgs extends ULoaderOverlayProps {
  slotTemplate?: string;
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
      story: {
        height: "420px",
      },
    },
    ...getDocsDescription(ULoaderOverlay.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<ULoaderOverlayArgs> = (args: ULoaderOverlayArgs) => ({
  components: { ULoaderOverlay },
  setup() {
    const slots = getSlotNames(ULoaderOverlay.__name);

    return { args, slots };
  },
  template: `
    <ULoaderOverlay v-bind="args" class="w-full h-full">
      ${args.slotTemplate || getSlotsFragment("")}
    </ULoaderOverlay>
  `,
});

const LoadingTemplate: StoryFn<ULoaderOverlayArgs> = (args: ULoaderOverlayArgs) => ({
  components: { ULoaderOverlay, UButton, UCol },
  setup() {
    const loaderOverlay = useLoaderOverlay();

    const loaderOverlayOn = loaderOverlay?.loaderOverlayOn || (() => {});
    const loaderOverlayOff = loaderOverlay?.loaderOverlayOff || (() => {});
    const isLoading = loaderOverlay?.isLoading || { value: false };

    function toggleLoading() {
      if (isLoading.value) {
        loaderOverlayOff();
      } else {
        loaderOverlayOn();
      }
    }

    return { args, loaderOverlayOn, loaderOverlayOff, isLoading, toggleLoading };
  },
  template: `
    <UCol align="center" class="pb-4">
      <UButton label="Toggle loading" size="sm" @click="toggleLoading"/>
    </UCol>

    <ULoaderOverlay  v-bind="args" class="!static w-full h-96" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const LoadingToggling = LoadingTemplate.bind({});
LoadingToggling.args = {};
