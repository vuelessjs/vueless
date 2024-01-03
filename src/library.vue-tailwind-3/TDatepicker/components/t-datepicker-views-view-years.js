import { h } from "vue";

import TDatepickerViewsViewYearsYear from "./t-datepicker-views-view-years-year";
import { getYearsRange } from "./t-datepicker-navigator";

const TDatepickerViewsViewYears = {
  name: "TDatepickerViewsViewYears",

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
    yearsPerView: {
      type: Number,
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
    years() {
      const [initialYear] = getYearsRange(this.localActiveDate, this.yearsPerView);

      return Array.from({ length: this.yearsPerView }, (_x, i) => i).map((year) =>
        this.getYear(initialYear + year),
      );
    },
  },

  watch: {
    activeDate(activeDate) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },

  methods: {
    getYear(year) {
      let newDate = new Date(this.localActiveDate.valueOf());

      newDate.setFullYear(year);

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
        class: this.getElementCssClass("yearWrapper"),
      },
      this.years.map((year) =>
        h(
          TDatepickerViewsViewYearsYear,
          {
            year,
            activeDate: this.localActiveDate,
            value: this.value,
            getElementCssClass: this.getElementCssClass,
            showActiveDate: this.showActiveDate,
            formatNative: this.formatNative,
            onClick: () => this.$emit("input", year),
          },
          {
            ...this.$slots,
          },
        ),
      ),
    );
  },
};

export default TDatepickerViewsViewYears;
