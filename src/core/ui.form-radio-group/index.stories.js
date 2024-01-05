import { getArgTypes } from "vueless/service.storybook";

import URadioGroup from "vueless/ui.form-radio-group";
import URadio from "vueless/ui.form-radio";

export default {
  title: "Form Inputs & Controls / Radio Group",
  component: URadioGroup,
  args: {
    label: "Label",
    value: "1",
    radios: [
      { name: "radio", label: "radio 1", description: "description", value: "1" },
      { name: "radio", label: "radio 2", description: "description", value: "2" },
      { name: "radio", label: "radio 3", description: "description", value: "3" },
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
