import { getArgTypes, getSlotNames } from "../service.storybook";

import UText from "../ui.text-block";
import URow from "../ui.container-row";

export default {
  id: "4020",
  title: "Text & Content / Text",
  component: UText,
  argTypes: {
    ...getArgTypes(UText.name),
  },
  args: {
    slotTemplate: `
    <template #default>
      <p>
        <b>Lorem ipsum dolor sit amet</b><u>, consectetur adipiscing elit,
        </u><em> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</em>
        <a href="https://uk.wikipedia.org/wiki/Lorem_ipsum" target="_blank">Wikipedia</a>
      </p>
    </template>
  `,
  },
};

const DefaultTemplate = (args) => ({
  components: { UText },
  setup() {
    const slots = getSlotNames(UText.name);

    return { args, slots };
  },
  template: `
    <UText v-bind="args" >
      ${args.slotTemplate}
    </UText>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UText, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UText
        v-for="(size, index) in sizes"
        :size="size"
        v-bind="args"
        :key="index"
      >
        ${args.slotTemplate}
      </UText>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const paragraphs = DefaultTemplate.bind({});
paragraphs.args = {
  slotTemplate: `
    <template #default>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </template>
  `,
};

export const list = DefaultTemplate.bind({});
list.args = {
  slotTemplate: `
     <template #default>
       <URow>
         <ul>
           <li> Lorem ipsum dolor </li>
           <li> Lorem ipsum dolor </li>
           <li> Lorem ipsum dolor </li>
         </ul>

         <ol>
           <li> Lorem ipsum dolor </li>
           <li> Lorem ipsum dolor </li>
           <li> Lorem ipsum dolor </li>
         </ol>
       </URow>
     </template>
  `,
};
