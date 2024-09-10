import ULoaderRendering from "../ui.loader-rendering";
import UButton from "../ui.button/UButton.vue";
import UCol from "../ui.container-col";

import { useLoaderRendering } from "./composables/useLoaderRendering";

import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilstorybook";

/**
 * The `ULoaderRendering` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.loader-rendering)
 */
export default {
  id: "9030",
  title: "Loaders and Skeletons / Loader Rendering",
  component: ULoaderRendering,
  argTypes: {
    ...getArgTypes(ULoaderRendering.name),
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
  components: { ULoaderRendering },
  setup() {
    const slots = getSlotNames(ULoaderRendering.name);

    return { args, slots };
  },
  template: `
    <ULoaderRendering v-bind="args" class="w-full h-full">
      ${args.slotTemplate || getSlotsFragment()}
    </ULoaderRendering>
  `,
});

const LoadingTemplate = (args) => ({
  components: { ULoaderRendering, UButton, UCol },
  setup() {
    const { loaderRenderingOn, loaderRenderingOff, isLoading } = useLoaderRendering();

    function toggleLoading() {
      isLoading.value ? loaderRenderingOff() : loaderRenderingOn();
    }

    return { args, loaderRenderingOn, loaderRenderingOff, isLoading, toggleLoading };
  },
  template: `
    <UCol align="center" class="pb-4">
      <UButton label="Toggle loading" size="sm" @click="toggleLoading"/>
    </UCol>

    <ULoaderRendering v-bind="args" class="!static w-full h-96" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const LoadingOff = LoadingTemplate.bind({});
LoadingOff.args = { loading: false };
