import { defineComponent, h } from "vue";
import range from "lodash.range";

import Component from "./base/Component";

const TPagination = {
  name: "TPagination",

  mixins: [Component],

  emits: ["change", "update:modelValue"],

  props: {
    modelValue: {
      type: Number,
      default: null,
    },
    tagName: {
      type: String,
      default: "ul",
    },
    elementTagName: {
      type: String,
      default: "li",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    perPage: {
      type: Number,
      default: 20,
      validator: (value) => value > 0,
    },
    totalItems: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0,
    },
    limit: {
      type: Number,
      default: 5,
      validator: (value) => value >= 0,
    },
    prevLabel: {
      type: String,
      default: "&lsaquo;",
    },
    nextLabel: {
      type: String,
      default: "&rsaquo;",
    },
    firstLabel: {
      type: String,
      default: "&laquo;",
    },
    lastLabel: {
      type: String,
      default: "&raquo;",
    },
    ellipsisLabel: {
      type: String,
      default: "&hellip;",
    },
    hideFirstLastControls: {
      type: Boolean,
      default: false,
    },
    hidePrevNextControls: {
      type: Boolean,
      default: false,
    },
    hideEllipsis: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Object,
      default() {
        return {
          wrapper: "table border-collapse text-center bg-white mx-auto shadow-sm",
          element: "w-8 h-8 border border-gray-200 table-cell hover:border-blue-100",
          activeElement: "w-8 h-8 border border-blue-500 table-cell hover:border-blue-600",
          disabledElement: "w-8 h-8 border border-gray-200 table-cell",
          ellipsisElement: "w-8 h-8 border border-gray-200 hidden md:table-cell",
          activeButton: `bg-blue-500 w-full h-full text-white hover:bg-blue-600 transition 
            duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none 
            focus:ring-opacity-50`,
          disabledButton:
            "opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out",
          button: `hover:bg-blue-100 w-full h-full transition duration-100 ease-in-out 
            focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50`,
          ellipsis: "",
        };
      },
    },
  },

  render() {
    const createComponentFunc = this.createComponent;

    return createComponentFunc(h);
  },

  data() {
    return {
      currentPage: this.modelValue,
    };
  },

  computed: {
    totalPages() {
      if (this.perPage <= 0) {
        return 0;
      }

      return Math.ceil(this.totalItems / this.perPage);
    },

    pageButtons() {
      const from1 = Number(this.currentPage) - Math.round(this.limit / 2) + 1;
      const from2 = this.totalPages + 1 - this.limit;
      const from = Math.max(Math.min(from1, from2), 1);

      const to = Math.min(from + this.limit - 1, this.totalPages);

      return range(from, to + 1).map((page) => {
        if (!this.hideEllipsis && page === from && from > 1) {
          return "less";
        }

        if (!this.hideEllipsis && page === to && to < this.totalPages) {
          return "more";
        }

        return String(page);
      });
    },

    prevIsDisabled() {
      return this.disabled || this.currentPage === null || this.currentPage <= 1;
    },

    nextIsDisabled() {
      return this.disabled || this.currentPage === null || this.currentPage >= this.totalPages;
    },
  },

  watch: {
    value(value) {
      this.currentPage = value;
    },
    currentPage(currentPage) {
      this.$emit("update:modelValue", currentPage);
      this.$emit("change", currentPage);
    },
  },

  methods: {
    createComponent(createElement) {
      const subElements = [];

      if (!this.hideFirstLastControls) {
        subElements.push(
          this.createControl(
            createElement,
            this.firstLabel,
            this.prevIsDisabled,
            false,
            this.goToFirstPage,
          ),
        );
      }

      if (!this.hidePrevNextControls) {
        subElements.push(
          this.createControl(
            createElement,
            this.prevLabel,
            this.prevIsDisabled,
            false,
            this.goToPrevPage,
          ),
        );
      }

      this.pageButtons.forEach((page) => {
        if (page === "less" || page === "more") {
          subElements.push(this.createControl(createElement, this.ellipsisLabel));
        } else {
          subElements.push(
            this.createControl(createElement, page, false, this.isPageActive(Number(page)), () =>
              this.selectPage(Number(page)),
            ),
          );
        }
      });

      if (!this.hidePrevNextControls) {
        subElements.push(
          this.createControl(
            createElement,
            this.nextLabel,
            this.nextIsDisabled,
            false,
            this.goToNextPage,
          ),
        );
      }

      if (!this.hideFirstLastControls) {
        subElements.push(
          this.createControl(
            createElement,
            this.lastLabel,
            this.nextIsDisabled,
            false,
            this.goToLastPage,
          ),
        );
      }

      return createElement(
        this.tagName,
        {
          class: this.getElementCssClass("wrapper"),
        },
        subElements,
      );
    },

    // eslint-disable-next-line max-len
    createControl(createElement, text, disabled = false, active = false, clickHandler) {
      let className = "";

      if (!clickHandler) {
        className = this.getElementCssClass("ellipsisElement");
      } else if (disabled) {
        className = this.getElementCssClass("disabledElement");
      } else if (active) {
        className = this.getElementCssClass("activeElement");
      } else {
        className = this.getElementCssClass("element");
      }

      return createElement(
        this.elementTagName,
        {
          class: className,
        },
        [this.createControlButton(createElement, text, disabled, active, clickHandler)],
      );
    },

    // eslint-disable-next-line max-len
    createControlButton(createElement, text, disabled = false, active = false, clickHandler) {
      if (!clickHandler) {
        return createElement("span", {
          class: this.getElementCssClass("ellipsis"),
          innerHTML: text,
        });
      }

      let className = "";
      const attrs = {};

      if (disabled) {
        className = this.getElementCssClass("disabledButton");
        attrs.disabled = true;
      } else if (active) {
        className = this.getElementCssClass("activeButton");
      } else {
        className = this.getElementCssClass("button");
      }

      return createElement("button", {
        class: className,
        onClick: clickHandler,
        ...attrs,
        disabled: disabled ? true : undefined,
        innerHTML: text,
      });
    },

    selectPage(page) {
      this.currentPage = page;
    },
    goToPrevPage() {
      this.currentPage = this.currentPage === null ? 1 : Math.max(this.currentPage - 1, 1);
    },
    goToNextPage() {
      this.currentPage =
        this.currentPage === null
          ? this.totalPages
          : Math.min(this.currentPage + 1, this.totalPages);
    },
    goToFirstPage() {
      this.currentPage = 1;
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
    },
    isPageActive(page) {
      return page === this.currentPage;
    },
  },
};

export default defineComponent(TPagination);
