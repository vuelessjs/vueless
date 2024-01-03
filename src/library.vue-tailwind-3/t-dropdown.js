import { defineComponent, h, Transition } from "vue";
import Component from "./base/Component";

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

const TDropdown = {
  name: "TDropdown",
  mixins: [Component],
  emits: ["update:show", "shown", "hidden", "focus", "blur", "keydown"],
  props: {
    text: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    tagName: {
      type: String,
      default: "div",
    },
    dropdownWrapperTagName: {
      type: String,
      default: "div",
    },
    dropdownTagName: {
      type: String,
      default: "div",
    },
    toggleOnFocus: {
      type: Boolean,
      default: false,
    },
    toggleOnClick: {
      type: Boolean,
      default: true,
    },
    toggleOnHover: {
      type: Boolean,
      default: false,
    },
    hideOnLeaveTimeout: {
      type: Number,
      default: 250,
    },
    show: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Object,
      default() {
        return {
          button: `block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent
            rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
            focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed`,
          wrapper: "inline-flex flex-col",
          dropdownWrapper: "relative z-10",
          dropdown: "origin-top-left absolute left-0 w-56 rounded shadow bg-white mt-1",
          enterFromClass: "opacity-0 scale-95",
          enterActiveClass: "transition transform ease-out duration-100",
          enterToClass: "opacity-100 scale-100",
          leaveFromClass: "opacity-100 scale-100",
          leaveActiveClass: "transition transform ease-in duration-75",
          leaveToClass: "opacity-0 scale-95",
        };
      },
    },
  },
  data() {
    return {
      localShow: this.show,
      hasFocus: false,
      hideOnLeaveTimeoutHolder: null,
    };
  },
  render() {
    const renderFun = this.render;

    return renderFun(h);
  },
  watch: {
    show(show) {
      this.localShow = show;
    },
    localShow(localShow) {
      this.$emit("update:show", localShow);

      if (localShow) {
        this.$emit("shown");
      } else {
        this.$emit("hidden");
      }
    },
  },
  methods: {
    render(createElement) {
      const defaultSlot = this.$slots.default()
        ? this.$slots.default({
            hide: this.doHide,
            show: this.doShow,
            toggle: this.doToggle,
            onBlur: this.blurHandler,
          })
        : null;
      const triggerSlot = this.$slots.trigger
        ? this.$slots.trigger({
            isShown: this.localShow,
            hide: this.doHide,
            hideIfFocusOutside: this.hideIfFocusOutside,
            show: this.doShow,
            toggle: this.doToggle,
            onMousedown: this.mousedownHandler,
            onFocus: this.focusHandler,
            onBlur: this.blurHandler,
            onKeydown: this.keydownHandler,
            disabled: this.disabled,
          })
        : createElement(
            "button",
            {
              ref: "button",
              type: "button",
              disabled: this.disabled,
              class: this.getElementCssClass("button"),
              onKeydown: this.keydownHandler,
              onMousedown: this.mousedownHandler,
              onFocus: this.focusHandler,
              onBlur: this.blurHandler,
            },
            () => this.$slots.button() || this.text,
          );
      const subElements = [
        triggerSlot,
        createElement(
          Transition,
          {
            enterFromClass: this.getElementCssClass("enterFromClass"),
            enterActiveClass: this.getElementCssClass("enterActiveClass"),
            enterToClass: this.getElementCssClass("enterToClass"),
            leaveFromClass: this.getElementCssClass("leaveFromClass"),
            leaveActiveClass: this.getElementCssClass("leaveActiveClass"),
            leaveToClass: this.getElementCssClass("leaveToClass"),
          },
          this.localShow
            ? () => [
                createElement(
                  this.dropdownWrapperTagName,
                  {
                    ref: "dropdownWrapper",
                    class: this.getElementCssClass("dropdownWrapper"),
                    tabindex: -1,
                    onFocus: this.focusHandler,
                    onBlur: this.blurHandler,
                  },
                  [
                    createElement(
                      this.dropdownTagName,
                      {
                        ref: "dropdown",
                        class: this.getElementCssClass("dropdown"),
                      },
                      defaultSlot,
                    ),
                  ],
                ),
              ]
            : undefined,
        ),
      ];

      return createElement(
        this.tagName,
        {
          ref: "wrapper",
          class: this.getElementCssClass("wrapper"),
          onMouseover: this.mouseoverHandler,
          onMouseleave: this.mouseleaveHandler,
        },
        subElements,
      );
    },
    blurEventTargetIsChild(e) {
      const blurredElement = e.relatedTarget;

      if (blurredElement) {
        const wrapper = this.$refs.wrapper;

        return wrapper.contains(blurredElement);
      }

      return false;
    },
    focusEventTargetIsChild(e) {
      const focusedElement = e.target;

      if (focusedElement) {
        const wrapper = this.$refs.wrapper;

        return wrapper.contains(focusedElement);
      }

      return false;
    },
    escapeHandler() {
      this.doHide();
    },
    mousedownHandler() {
      if (this.toggleOnClick) {
        this.doToggle();
      }
    },
    focusHandler(e) {
      if (!this.hasFocus && this.focusEventTargetIsChild(e)) {
        this.hasFocus = true;
        this.$emit("focus", e);
      }

      if (this.toggleOnFocus) {
        this.doShow();
      }
    },
    blurHandler(e) {
      if (this.hasFocus && !this.blurEventTargetIsChild(e)) {
        this.hasFocus = false;
        this.$emit("blur", e);
      }

      if (this.toggleOnFocus || this.toggleOnClick) {
        this.hideIfFocusOutside(e);
      }
    },
    keydownHandler(e) {
      if ([Key$1.ENTER, Key$1.SPACE].includes(e.keyCode)) {
        this.mousedownHandler();
      } else if (e.keyCode === Key$1.ESC) {
        this.escapeHandler();
      }

      this.$emit("keydown", e);
    },
    mouseleaveHandler() {
      if (!this.toggleOnHover) {
        return;
      }

      if (!this.hideOnLeaveTimeout) {
        this.doHide();

        return;
      }

      this.hideOnLeaveTimeoutHolder = setTimeout(() => {
        this.doHide();
        this.hideOnLeaveTimeoutHolder = null;
      }, this.hideOnLeaveTimeout);
    },
    mouseoverHandler() {
      if (!this.toggleOnHover) {
        return;
      }

      if (this.hideOnLeaveTimeout && this.hideOnLeaveTimeoutHolder) {
        clearTimeout(this.hideOnLeaveTimeoutHolder);
        this.hideOnLeaveTimeoutHolder = null;
      }

      this.doShow();
    },
    doHide() {
      this.localShow = false;
    },
    hideIfFocusOutside(e) {
      if (!(e instanceof Event)) {
        throw new Error(
          "the method hideIfFocusOutside expects an instance of `Event` as parameter",
        );
      }

      if (!this.blurEventTargetIsChild(e)) {
        this.doHide();
      }
    },
    doShow() {
      this.localShow = true;
    },
    doToggle() {
      if (this.localShow) {
        this.doHide();
      } else {
        this.doShow();
      }
    },
    blur() {
      const el = this.$refs.button;

      el.blur();
    },
    focus(options) {
      const el = this.$refs.button;

      el.focus(options);
    },
  },
};

export default defineComponent(TDropdown);
