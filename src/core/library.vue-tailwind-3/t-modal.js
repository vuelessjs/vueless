import { defineComponent, h, Transition } from "vue";
import * as bodyScrollLock from "body-scroll-lock";

import Component from "./base/Component";

import vueTailwindService from "./services/vueTailwind.service";

const { awaiter } = vueTailwindService;

/* eslint-disable no-shadow */
let Key;

(function (Key) {
  Key[(Key["LEFT"] = 37)] = "LEFT";
  Key[(Key["UP"] = 38)] = "UP";
  Key[(Key["RIGHT"] = 39)] = "RIGHT";
  Key[(Key["DOWN"] = 40)] = "DOWN";
  Key[(Key["ENTER"] = 13)] = "ENTER";
  Key[(Key["ESC"] = 27)] = "ESC";
  Key[(Key["SPACE"] = 32)] = "SPACE";
  Key[(Key["BACKSPACE"] = 8)] = "BACKSPACE";
})(Key || (Key = {}));

let Key$1 = Key;

const TModal = {
  name: "TModal",
  mixins: [Component],
  emits: ["update:modelValue", "change", "before-open", "before-close", "opened", "closed"],
  props: {
    name: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
    noBody: {
      type: Boolean,
      default: false,
    },
    hideCloseButton: {
      type: Boolean,
      default: false,
    },
    disableBodyScroll: {
      type: Boolean,
      default: true,
    },
    bodyScrollLockOptions: {
      type: Object,
      default: () => ({}),
    },
    focusOnOpen: {
      type: Boolean,
      default: true,
    },
    fixedClasses: {
      type: Object,
      default() {
        return {
          overlay:
            "overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed",
          wrapper: "relative mx-auto",
          modal: "overflow-visible relative ",
          close: "flex items-center justify-center",
        };
      },
    },
    classes: {
      type: Object,
      default() {
        return {
          overlay: "z-40 bg-black bg-opacity-50",
          wrapper: "z-50 max-w-lg px-3 py-12",
          modal: "bg-white shadow rounded",
          body: "p-3",
          header: "border-b border-gray-100 p-3 rounded-t",
          footer: "bg-gray-100 p-3 rounded-b",
          close: `bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100
            ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50`,
          closeIcon: "fill-current h-4 w-4",
          overlayEnterClass: "opacity-0",
          overlayEnterActiveClass: "transition ease-out duration-100",
          overlayEnterToClass: "opacity-100",
          overlayLeaveFromClass: "opacity-100",
          overlayLeaveActiveClass: "transition ease-in duration-75",
          overlayLeaveToClass: "opacity-0",
          enterClass: "",
          enterActiveClass: "",
          enterToClass: "",
          leaveFromClass: "",
          leaveActiveClass: "",
          leaveToClass: "",
        };
      },
    },
  },
  data() {
    return {
      overlayShow: this.modelValue,
      modalShow: this.modelValue,
      params: undefined,
      preventAction: false,
    };
  },
  watch: {
    modelValue(value) {
      if (value) {
        this.show();
      } else {
        this.hide();
      }
    },
    overlayShow(shown) {
      return awaiter(this, void 0, void 0, function* () {
        this.$emit("update:modelValue", shown);
        this.$emit("change", shown);
        yield this.$nextTick();

        if (shown) {
          this.modalShow = true;
        } else {
          this.closed();
        }
      });
    },
    modalShow(shown) {
      return awaiter(this, void 0, void 0, function* () {
        yield this.$nextTick();

        if (!shown) {
          this.overlayShow = false;
        } else {
          this.opened();
        }
      });
    },
  },
  created() {
    if (this.name && this.$modal) {
      this.$modal.$on(`show-${this.name}`, (params = undefined) => {
        this.show(params);
      });
      this.$modal.$on(`hide-${this.name}`, () => {
        this.hide();
      });
    }
  },
  mounted() {
    if (this.overlayShow) {
      this.prepareDomForModal();
    }
  },
  beforeUnmount() {
    const overlay = this.getOverlay();

    if (this.disableBodyScroll && overlay) {
      overlay.focus();
      bodyScrollLock.enableBodyScroll(overlay);
    }
  },
  render() {
    const renderFun = this.render;

    return renderFun(h);
  },
  methods: {
    render(createElement) {
      return createElement(
        Transition,
        {
          enterFromClass: this.getElementCssClass("overlayEnterClass"),
          enterActiveClass: this.getElementCssClass("overlayEnterActiveClass"),
          enterToClass: this.getElementCssClass("overlayEnterToClass"),
          leaveFromClass: this.getElementCssClass("overlayLeaveFromClass"),
          leaveActiveClass: this.getElementCssClass("overlayLeaveActiveClass"),
          leaveToClass: this.getElementCssClass("overlayLeaveToClass"),
        },
        this.overlayShow
          ? () => [
              createElement(
                "div",
                {
                  ref: "overlay",
                  tabindex: 0,
                  class: this.getElementCssClass("overlay"),
                  onKeyup: this.keyupHandler,
                  onClick: this.clickHandler,
                },
                [this.renderWrapper(createElement)],
              ),
            ]
          : undefined,
      );
    },
    renderWrapper(createElement) {
      return createElement(
        "div",
        {
          ref: "wrapper",
          class: this.getElementCssClass("wrapper"),
        },
        [this.renderModal(createElement)],
      );
    },
    renderModal(createElement) {
      return createElement(
        Transition,
        {
          enterFromClass: this.getElementCssClass("enterFromClass"),
          enterActiveClass: this.getElementCssClass("enterActiveClass"),
          enterToClass: this.getElementCssClass("enterToClass"),
          leaveFromClass: this.getElementCssClass("leaveFromClass"),
          leaveActiveClass: this.getElementCssClass("leaveActiveClass"),
          leaveToClass: this.getElementCssClass("leaveToClass"),
        },
        this.modalShow
          ? () => [
              createElement(
                "div",
                {
                  ref: "modal",
                  class: this.getElementCssClass("modal"),
                },
                this.renderChilds(createElement),
              ),
            ]
          : undefined,
      );
    },
    renderChilds(createElement) {
      if (this.noBody) {
        return this.$slots.default();
      }

      const childs = [];

      if (!this.hideCloseButton) {
        childs.push(
          createElement(
            "button",
            {
              ref: "close",
              class: this.getElementCssClass("close"),
              type: "button",
              onClick: this.hide,
            },
            this.$slots.button() || [
              createElement(
                "svg",
                {
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  class: this.getElementCssClass("closeIcon"),
                },
                [
                  createElement("path", {
                    "clip-rule": "evenodd",
                    "fill-rule": "evenodd",
                    d: `M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
                        1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293
                        4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z`,
                  }),
                ],
              ),
            ],
          ),
        );
      }

      if (!!this.$slots.header || this.header !== undefined) {
        childs.push(
          createElement(
            "div",
            {
              ref: "header",
              class: this.getElementCssClass("header"),
            },
            this.$slots.header() || this.header,
          ),
        );
      }

      childs.push(
        createElement(
          "div",
          {
            ref: "body",
            class: this.getElementCssClass("body"),
          },
          this.$slots.default(),
        ),
      );

      if (!!this.$slots.footer || this.footer !== undefined) {
        childs.push(
          createElement(
            "div",
            {
              ref: "footer",
              class: this.getElementCssClass("footer"),
            },
            this.$slots.footer() || this.footer,
          ),
        );
      }

      return childs;
    },
    clickHandler(e) {
      if (e.target === this.$refs.overlay) {
        this.outsideClick();
      }
    },
    keyupHandler(e) {
      if (e.keyCode === Key$1.ESC && this.escToClose) {
        this.hide();
      }
    },
    beforeOpen() {
      this.$emit("before-open", { params: this.params, cancel: this.cancel });
    },
    opened() {
      this.$emit("opened", { params: this.params });
      this.prepareDomForModal();
    },
    beforeClose() {
      if (this.disableBodyScroll) {
        const overlay = this.getOverlay();

        if (overlay) {
          overlay.focus();
          bodyScrollLock.enableBodyScroll(overlay);
        }
      }

      this.$emit("before-close", { cancel: this.cancel });
    },
    closed() {
      this.$emit("closed");
    },
    prepareDomForModal() {
      const overlay = this.getOverlay();

      if (!overlay) {
        return;
      }

      if (this.disableBodyScroll) {
        bodyScrollLock.disableBodyScroll(overlay, this.bodyScrollLockOptions);
      }

      if (this.focusOnOpen) {
        overlay.focus();
      }
    },
    hide() {
      this.beforeClose();

      if (!this.preventAction) {
        this.modalShow = false;
      } else {
        this.preventAction = false;
      }
    },
    show(params = undefined) {
      this.params = params;
      this.beforeOpen();

      if (!this.preventAction) {
        this.overlayShow = true;
      } else {
        this.preventAction = false;
      }
    },
    cancel() {
      this.preventAction = true;
    },
    outsideClick() {
      if (this.clickToClose) {
        this.hide();
      }
    },
    getOverlay() {
      return this.$refs.overlay;
    },
  },
};

export default defineComponent(TModal);
