import ULoaderRendering from "../ui.loader-rendering";
import UButton from "../ui.button";
import UGroup from "../ui.container-group";

import { useLoaderRendering } from "./composables/useLoaderRendering";

import { getArgTypes } from "../service.storybook";

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
    return { args };
  },
  template: `
    <ULoaderRendering v-bind="args" class="w-full h-full" />
  `,
});

const LoadingTemplate = (args) => ({
  components: { ULoaderRendering, UButton, UGroup },
  setup() {
    const { loaderRenderingOn, loaderRenderingOff, isLoading } = useLoaderRendering();

    return { args, loaderRenderingOn, loaderRenderingOff, isLoading };
  },
  methods: {
    toggleLoading() {
      this.isLoading ? this.loaderRenderingOff() : this.loaderRenderingOn();
    },
  },
  template: `
    <UGroup align="center" class="pb-4">
      <UButton label="Toggle loading" size="sm" @click="toggleLoading"/>
    </UGroup>

    <ULoaderRendering v-bind="args" class="!static w-full h-96" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const LoadingOff = LoadingTemplate.bind({});
LoadingOff.args = { loading: false };
