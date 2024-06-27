import { getArgTypes } from "../service.storybook";

import URadioGroup from "../ui.form-radio-group";
import URadio from "../ui.form-radio";

/**
 * The `URadioGroup` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-radio-group)
 */
export default {
  id: "3160",
  title: "Form Inputs & Controls / Radio Group",
  component: URadioGroup,
  args: {
    label: "Label",
    value: "1",
    radios: [
      { name: "radio", label: "Radio 1", value: "1" },
      { name: "radio", label: "Radio 2", value: "2" },
      { name: "radio", label: "Radio 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(URadioGroup.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { URadioGroup, URadio },
  setup() {
    return { args };
  },
  template: `
    <URadioGroup v-bind="args" v-model="args.value">
      <template v-for="(radio,index) in args.radios" :key="index">
        <URadio
          v-bind="radio"
        >
        </URadio>
      </template>
    </URadioGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
