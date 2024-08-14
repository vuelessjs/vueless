import ULoaderTop from "../ui.loader-top";
import UButton from "../ui.button";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";
import UBadge from "../ui.text-badge";

import { useLoaderTop } from "./composables/useLoaderTop";
import { loaderTopOff, loaderTopOn } from "./services/loaderTop.service";

import { getArgTypes } from "../service.storybook";

/**
 * The `ULoaderTop` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.loader-top)
 */
export default {
  id: "9020",
  title: "Loaders and Skeletons / Loader Top",
  component: ULoaderTop,
  argTypes: {
    ...getArgTypes(ULoaderTop.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoaderTop, UButton, URow },
  setup() {
    const { loaderTopOn, loaderTopOff } = useLoaderTop();

    return { args, loaderTopOn, loaderTopOff };
  },
  template: `
    <ULoaderTop color="blue" v-bind="args" resources="https://api.publicapis.org/entries"/>

    <URow gap="sm">
      <UButton label="On" size="sm" @click="loaderTopOn('https://api.publicapis.org/entries')" />
      <UButton label="Off" size="sm" @click="loaderTopOff('https://api.publicapis.org/entries')" />
    </URow>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { ULoaderTop, UButton, UCol, URow, UBadge },
  setup() {
    return {
      args,
      loaderTopOff,
      loaderTopOn,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <URow gap="sm" class="pb-4">
        <UButton label="On" size="sm" @click="loaderTopOn('https://api.publicapis.org/images')" />
        <UButton label="Off" size="sm" @click="loaderTopOff('https://api.publicapis.org/images')" />
      </URow>

      <URow
        align="center"
        v-for="(option, index) in options"
        :key="index"
      >
        <UBadge
          :label="option"
          :[args.enum]="option"
        />
        <ULoaderTop
          resources="https://api.publicapis.org/images"
          class="static"
          :[args.enum]="option"
          v-bind="args"
        />
      </URow>

    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
