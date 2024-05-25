import ULoaderRendering from "../ui.loader-rendering";
import UButton from "../ui.button";

import { useLoaderRendering } from "./composables/useLoaderRendering";

import { getArgTypes } from "../service.storybook";

export default {
  id: "9030",
  title: "Loaders and Skeletons / Loader rendering",
  component: ULoaderRendering,
  argTypes: {
    ...getArgTypes(ULoaderRendering.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoaderRendering },
  setup() {
    return { args };
  },
  template: `
    <div>
      <ULoaderRendering v-bind="args" class="!static !w-full" />
    </div>
  `,
});

const LoadingTemplate = (args) => ({
  components: { ULoaderRendering, UButton },
  setup() {
    const { setRenderingFinished, isRenderingPage, setRenderingStarted } = useLoaderRendering();

    return { args, setRenderingFinished, setRenderingStarted, isRenderingPage };
  },
  methods: {
    toggleLoading() {
      this.isRenderingPage ? this.setRenderingFinished() : this.setRenderingStarted();
    },
  },
  template: `
      <div class="flex justify-center items-center pb-4">
        <UButton label="Toggle loading" @click="toggleLoading"/>
      </div>
      <div>
        <ULoaderRendering v-bind="args" class="!static !w-full" />
      </div>
    `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const LoadingOff = LoadingTemplate.bind({});
LoadingOff.args = { loading: false };
