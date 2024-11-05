import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import ULoaderOverlay from "../ULoaderOverlay.vue";
import UButton from "../../ui.button/UButton.vue";
import UCol from "../../ui.container-col/UCol.vue";

import { useLoaderOverlay } from "../useLoaderOverlay.js";

/**
 * The `ULoaderOverlay` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.loader-overlay)
 */
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
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoaderOverlay },
  setup() {
    const slots = getSlotNames(ULoaderOverlay.__name);

    return { args, slots };
  },
  template: `
    <ULoaderOverlay v-bind="args" class="w-full h-full">
      ${args.slotTemplate || getSlotsFragment()}
    </ULoaderOverlay>
  `,
});

const LoadingTemplate = (args) => ({
  components: { ULoaderOverlay, UButton, UCol },
  setup() {
    const { loaderOverlayOn, loaderOverlayOff, isLoading } = useLoaderOverlay();

    function toggleLoading() {
      isLoading.value ? loaderOverlayOff() : loaderOverlayOn();
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
