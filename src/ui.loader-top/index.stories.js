import ULoaderTop from "../ui.loader-top";
import UButton from "../ui.button";

import { useLoaderTop } from "./composables/useLoaderTop";
import { loaderTopOff, loaderTopOn } from "./services/loaderTop.service";

import { getArgTypes } from "../service.storybook";

export default {
  id: "9020",
  title: "Loaders and Skeletons / Loader top",
  component: ULoaderTop,
  argTypes: {
    ...getArgTypes(ULoaderTop.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoaderTop, UButton },
  setup() {
    const { setLoaderTopOn, setLoaderTopOff } = useLoaderTop();

    return { args, setLoaderTopOn, setLoaderTopOff };
  },
  template: `
    <div>
        <ULoaderTop color="blue" v-bind="args" resource-names="https://api.publicapis.org/entries"/>

        <div class="flex gap-2">
          <UButton label="On" @click="setLoaderOn('https://api.publicapis.org/entries')" />
          <UButton label="Off" @click="setLoaderOff('https://api.publicapis.org/entries')" />
        </div>
    </div>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { ULoaderTop, UButton },
  setup() {
    return {
      args,
      loaderTopOff,
      loaderTopOn,
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
      <UButton label="On" @click="loaderTopOn('https://api.publicapis.org/entries')" />
      <UButton label="Off" @click="loaderTopOff('https://api.publicapis.org/entries')" />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Color = ColorsTemplate.bind({});
Color.args = {};
