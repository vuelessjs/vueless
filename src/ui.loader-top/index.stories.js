import ULoaderTop from "../ui.loader-top";
import UButton from "../ui.button";

import { useLoaderTop } from "../ui.loader-top/composables/useLoaderTop";

import { getArgTypes } from "../service.storybook";

export default {
  id: "9024",
  title: "Loaders and Skeletons / Loader top",
  component: ULoaderTop,
  argTypes: {
    ...getArgTypes(ULoaderTop.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoaderTop, UButton },
  setup() {
    const { setLoadingOn, setLoadingOff } = useLoaderTop();

    return { args, setLoadingOn, setLoadingOff };
  },
  template: `
    <div>
        <ULoaderTop color="blue" v-bind="args" resource-names="https://api.publicapis.org/entries"/>

        <div class="flex gap-2">
          <UButton label="On" @click="setLoadingOn('https://api.publicapis.org/entries')" />
          <UButton label="Off" @click="setLoadingOff('https://api.publicapis.org/entries')" />
        </div>
    </div>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { ULoaderTop, UButton },
  setup() {
    const { setLoadingOn, setLoadingOff } = useLoaderTop();

    return {
      args,
      setLoadingOn,
      setLoadingOff,
      colors: argTypes.color.options,
    };
  },
  template: `
    <div class="flex gap-4 flex-col">
      <ULoaderTop
        class="static"
        v-for="(color, index) in colors"
        :color="color"
        v-bind="args"
        :key="index"
      />
    </div>
    <div class="flex gap-2 pt-4">
      <UButton label="On" @click="setLoadingOn('https://api.publicapis.org/entries')" />
      <UButton label="Off" @click="setLoadingOff('https://api.publicapis.org/entries')" />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Color = ColorsTemplate.bind({});
Color.args = {};
