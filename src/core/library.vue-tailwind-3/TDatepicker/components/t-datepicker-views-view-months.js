import { h } from "vue";

import TDatepickerViewsViewMonthsMonth from "./t-datepicker-views-view-months-month";

const TDatepickerViewsViewMonths = {
  name: "TDatepickerViewsViewMonths",

  emits: ["input"],

  props: {
    value: {
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
    };
  },

  computed: {
    months() {
      return Array.from({ length: 12 }, (_x, i) => i).map((monthNumber) =>
        this.getMonth(monthNumber),
      );
    },
  },

  watch: {
    activeDate(activeDate) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },

  methods: {
    getMonth(monthNumber) {
      let newDate = new Date(this.localActiveDate.valueOf());

      newDate.setMonth(monthNumber);

      // Means the current day has less days so the extra month is
      // in the following month
      if (newDate.getDate() !== this.localActiveDate.getDate()) {
        // Assign the last day of previous month
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
      }

      return newDate;
    },
  },

  render() {
    return h(
      "div",
      {
        class: this.getElementCssClass("monthWrapper"),
      },
      this.months.map((month) =>
        h(
          TDatepickerViewsViewMonthsMonth,
          {
            month,
            value: this.value,
            activeDate: this.localActiveDate,
            getElementCssClass: this.getElementCssClass,
            showActiveDate: this.showActiveDate,
            formatNative: this.formatNative,
            onClick: () => this.$emit("input", month),
          },
          {
            ...this.$slots,
          },
        ),
      ),
    );
  },
};

export default TDatepickerViewsViewMonths;
