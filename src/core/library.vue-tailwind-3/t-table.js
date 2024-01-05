import { defineComponent, h } from "vue";
import pick from "lodash.pick";

import Component from "./base/Component";

const TTable = {
  name: "TTable",
  mixins: [Component],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    footerData: {
      type: Array,
      default() {
        return [];
      },
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    responsive: {
      type: Boolean,
      default: false,
    },
    responsiveBreakpoint: {
      type: Number,
      default: 768,
    },
    classes: {
      type: Object,
      default: () => ({
        table: "min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border",
        thead: "",
        theadTr: "",
        theadTh: "px-3 py-2 font-semibold text-left bg-gray-100 border-b",
        tbody: "bg-white divide-y divide-gray-100",
        tr: "",
        td: "px-3 py-2 whitespace-no-wrap",
        tfoot: "",
        tfootTr: "",
        tfootTd: "",
      }),
    },
  },

  data() {
    return {
      ready: !this.responsive,
      windowWidth: null,
    };
  },

  computed: {
    renderResponsive() {
      const { windowWidth } = this;

      return this.responsive && windowWidth && windowWidth < this.responsiveBreakpoint;
    },

    normalizedHeaders() {
      return this.headers.map((header) => {
        if (typeof header === "string") {
          return {
            text: header,
          };
        }

        return header;
      });
    },

    normalizedFooterData() {
      return this.footerData.map((footer) => {
        if (typeof footer === "string") {
          return {
            text: footer,
          };
        }

        return footer;
      });
    },

    headersValues() {
      return this.headers.filter((h) => h.value).map((h) => h.value);
    },

    showHeader() {
      return !this.hideHeader;
    },
  },

  mounted() {
    // If responsive we will need to calculate the windowWidth
    if (this.responsive) {
      this.windowWidth = window.innerWidth;
      // If responsive we want to show the table until we know the window size
      this.ready = true;
      window.addEventListener("resize", this.resizeListener, { passive: true });
    }
  },

  beforeUnmount() {
    if (this.responsive) {
      window.removeEventListener("resize", this.resizeListener);
    }
  },

  render() {
    const renderFun = this.renderTable;

    return renderFun(h);
  },

  methods: {
    resizeListener() {
      this.windowWidth = window.innerWidth;
    },
    renderTable(createElement) {
      if (!this.ready) {
        return createElement();
      }

      const childElements = [];

      // The responsive version doesnt have header
      if (!this.renderResponsive) {
        childElements.push(this.renderThead(createElement));
      }

      childElements.push(this.renderTbody(createElement));

      if (this.showFooter || this.$slots.tfoot) {
        childElements.push(this.renderTfoot(createElement));
      }

      return createElement(
        "table",
        {
          ref: "table",
          class: this.getElementCssClass("table"),
        },
        childElements,
      );
    },
    renderThead(createElement) {
      const trClass = this.getElementCssClass("theadTr");
      const thClass = this.getElementCssClass("theadTh");
      const theadClass = this.getElementCssClass("thead");

      if (this.$slots.thead) {
        const thead = this.$slots.thead({
          theadClass,
          trClass,
          thClass,
          data: this.normalizedHeaders,
        });

        if (thead) {
          return thead;
        }
      }

      if (!this.showHeader) {
        return createElement();
      }

      const ths = this.normalizedHeaders.map((header) =>
        createElement(
          "th",
          {
            id: header.id,
            class: header.className ? [thClass, header.className] : thClass,
          },
          header.text,
        ),
      );

      return createElement(
        "thead",
        {
          class: theadClass,
        },
        [
          createElement(
            "tr",
            {
              class: trClass,
            },
            ths,
          ),
        ],
      );
    },

    renderTfoot(createElement) {
      const trClass = this.getElementCssClass("tfootTr");
      const tdClass = this.getElementCssClass("tfootTd");
      const tfootClass = this.getElementCssClass("tfoot");

      if (this.$slots.tfoot) {
        const tfoot = this.$slots.tfoot({
          tfootClass,
          trClass,
          tdClass,
          data: this.normalizedFooterData,
          headers: this.normalizedHeaders,
          renderResponsive: this.renderResponsive,
        });

        if (tfoot) {
          return tfoot;
        }
      }

      const tds = this.normalizedFooterData.map((footer) =>
        createElement(
          "td",
          {
            id: footer.id,
            class: footer.className ? [tdClass, footer.className] : tdClass,
          },
          footer.text,
        ),
      );

      return createElement(
        "tfoot",
        {
          class: tfootClass,
        },
        [
          createElement(
            "tr",
            {
              class: trClass,
            },
            tds,
          ),
        ],
      );
    },

    renderTbody(createElement) {
      if (this.$slots.tbody) {
        const tbody = this.$slots.tbody({
          tbodyClass: this.getElementCssClass("tbody"),
          trClass: this.getElementCssClass("tr"),
          tdClass: this.getElementCssClass("td"),
          data: this.data,
          headers: this.normalizedHeaders,
          renderResponsive: this.renderResponsive,
        });

        if (tbody) {
          return tbody;
        }
      }

      return createElement(
        "tbody",
        {
          class: this.getElementCssClass("tbody"),
        },
        this.renderRows(createElement),
      );
    },

    renderRows(createElement) {
      return this.data.map((row, rowIndex) => {
        if (this.$slots.row) {
          const tableRow = this.$slots.row({
            rowIndex,
            row,
            trClass: this.getElementCssClass("tr"),
            tdClass: this.getElementCssClass("td"),
          });

          if (tableRow) {
            return tableRow;
          }
        }

        return createElement(
          "tr",
          {
            class: this.getElementCssClass("tr"),
          },
          this.renderCols(createElement, row, rowIndex),
        );
      });
    },

    renderCols(createElement, row, rowIndex) {
      const columns = this.getRowColumns(row);

      if (typeof columns === "object") {
        return Object.keys(columns).map((columnIndex) => {
          const text = columns[columnIndex];

          return this.renderCol(createElement, text, rowIndex, columnIndex);
        });
      }

      return columns.map((text, columnIndex) =>
        this.renderCol(createElement, text, rowIndex, columnIndex),
      );
    },

    renderCol(createElement, text, rowIndex, columnIndex) {
      if (this.$slots.column) {
        const tableColumn = this.$slots.column({
          rowIndex,
          columnIndex,
          text,
          tdClass: this.getElementCssClass("td"),
        });

        if (tableColumn) {
          return tableColumn;
        }
      }

      return createElement(
        "td",
        {
          class: this.getElementCssClass("td"),
        },
        text,
      );
    },

    getRowColumns(row) {
      if (!this.headersValues.length) {
        return row;
      }

      if (typeof row === "object") {
        return pick(row, this.headersValues);
      }

      return {};
    },
  },
};

export default defineComponent(TTable);
