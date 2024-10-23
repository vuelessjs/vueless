import { getArgTypes } from "../../../utils/utilStorybook.js";

import UAlert from "../../../ui.text-alert/UAlert.vue";
import UButton from "../../../ui.button/UButton.vue";
import UCalendar from "../../../ui.form-calendar/UCalendar.vue";
import clickOutside from "../vClickOutside.js";

/**
 * The `UDataList` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.data-list)
 */
export default {
  id: "7022",
  title: "Directives / Click Outside",
  component: UButton,
  args: {},
  argTypes: {
    ...getArgTypes(UButton.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UButton, UCalendar, UAlert },
  directives: { clickOutside },
  setup() {
    return { args };
  },
  data() {
    return {
      date: new Date(),
      isShownCalendar: false,
    };
  },
  computed: {
    buttonLabel() {
      return this.isShownCalendar ? "Close calendar" : "Open calendar";
    },
  },
  methods: {
    toggleCalendar() {
      this.isShownCalendar = !this.isShownCalendar;
    },

    closeCalendar() {
      this.isShownCalendar = false;
    },
  },
  template: `
    <UButton :label="buttonLabel" @click="toggleCalendar" v-click-outside="closeCalendar" />

    <UCalendar v-model="date" v-if="isShownCalendar" class="mt-2" />

    <UAlert class="mt-4" variant="secondary">
      <p>
        Click on calendar itself will trigger directive callback, use ignore option to prevent this behavior.
      </p>
    </UAlert>
  `,
});

const SettingsTemplate = (args) => ({
  components: { UButton, UCalendar, UAlert },
  directives: { clickOutside },
  setup() {
    return { args };
  },
  data() {
    return {
      date: new Date(),
      isShownCalendar: false,
      clickOutsideOptions: {},
    };
  },
  computed: {
    buttonLabel() {
      return this.isShownCalendar ? "Close calendar" : "Open calendar";
    },
  },
  mounted() {
    this.clickOutsideOptions = { ignore: [this.$refs.calendar] };
  },
  methods: {
    toggleCalendar() {
      this.isShownCalendar = !this.isShownCalendar;
    },

    closeCalendar() {
      this.isShownCalendar = false;
    },
  },
  template: `
    <UButton :label="buttonLabel" @click="toggleCalendar" v-click-outside="[closeCalendar, clickOutsideOptions]" />

    <div ref="calendar" class="w-fit">
      <UCalendar v-model="date" v-if="isShownCalendar" class="mt-2" />
    </div>

    <UAlert class="mt-4" variant="secondary">
      <p>
        Click on calendar will not trigger directive callback now.
      </p>
    </UAlert>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Settings = SettingsTemplate.bind({});
Settings.args = {};
