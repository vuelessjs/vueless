import { defineComponent, h } from "vue";
import isEqual from "lodash.isequal";

import HtmlInput from "./base/HtmlInput";

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

const checkIfTagShouldBeChecked = (model, checked, value) =>
  model === undefined ? !!checked : isEqual(model, value);

const TRadio = {
  name: "TRadio",
  mixins: [HtmlInput],
  emits: ["focus", "blur", "input", "change", "update:modelValue"],
  props: {
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: "on",
    },
    checked: {
      type: [Boolean, String],
      default: false,
    },
    modelValue: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: undefined,
    },
    wrapped: {
      type: Boolean,
      default: false,
    },
    wrapperTag: {
      type: String,
      default: "label",
    },
    inputWrapperTag: {
      type: String,
      default: "span",
    },
    labelTag: {
      type: String,
      default: "span",
    },
    label: {
      type: [String, Number],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: `text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500
        focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50
        disabled:cursor-not-allowed`,
    },
  },
  data() {
    // const defaultValue = (this.model === undefined ? null : this.model);
    return {
      localValue: this.checked ? this.value : null,
    };
  },
  render() {
    const renderFun = this.render;
    // eslint-disable-next-line max-len
    const createWrappedFunc = this.renderWrapped;

    if (this.wrapped) {
      return createWrappedFunc(h);
    }

    return renderFun(h);
  },
  watch: {
    modelValue(value) {
      if (isEqual(value, this.localValue)) {
        return;
      }

      this.localValue = value;
    },
    checked(checked) {
      const localValue = checked ? this.value : null;

      if (!isEqual(localValue, this.localValue)) {
        this.localValue = localValue;
      }
    },
    localValue(localValue) {
      if (isEqual(this.modelValue, localValue)) {
        return;
      }

      this.$emit("input", localValue);
      this.$emit("change", localValue);
      this.$emit("update:modelValue", localValue);
    },
    isChecked(isChecked) {
      const input = this.$refs.input;

      if (input && input.checked !== isChecked) {
        input.checked = isChecked;
      }
    },
  },
  computed: {
    isChecked() {
      return checkIfTagShouldBeChecked(this.modelValue, this.checked, this.value);
    },
  },
  methods: {
    renderWrapped(createElement) {
      const childElements = [];
      const input = this.render(createElement);
      const inputWrapperClass = this.getElementCssClass("inputWrapper");
      const checkedInputWrapperClass = this.getElementCssClass(
        "inputWrapperChecked",
        this.getElementCssClass("inputWrapper"),
      );

      childElements.push(
        createElement(
          this.inputWrapperTag,
          {
            ref: "inputWrapper",
            class: this.isChecked ? checkedInputWrapperClass : inputWrapperClass,
          },
          () => input,
        ),
      );
      const labelClass = this.getElementCssClass("label");
      const checkedLabelClass = this.getElementCssClass(
        "labelChecked",
        this.getElementCssClass("label"),
      );
      let label;

      if (this.$slots.default !== undefined) {
        label = this.$slots.default({
          isChecked: this.isChecked,
          value: this.localValue,
          label: this.label,
        });
      } else {
        label = typeof this.label === "number" ? String(this.label) : this.label;
      }

      childElements.push(
        createElement(
          this.labelTag,
          {
            ref: "label",
            class: this.isChecked ? checkedLabelClass : labelClass,
          },
          label,
        ),
      );
      const wrapperClass = this.getElementCssClass("wrapper");
      const checkedWrapperClass = this.getElementCssClass(
        "wrapperChecked",
        this.getElementCssClass("wrapper"),
      );

      return createElement(
        this.wrapperTag,
        {
          ref: "wrapper",
          class: this.isChecked ? checkedWrapperClass : wrapperClass,
          for: this.id,
          tabindex: this.tabindex,
          autofocus: this.autofocus,
          onKeydown: (e) => {
            if ([Key$1.DOWN, Key$1.RIGHT].includes(e.keyCode)) {
              this.selectNextRadio(e);
            } else if ([Key$1.UP, Key$1.LEFT].includes(e.keyCode)) {
              this.selectPrevRadio(e);
            } else if (e.keyCode === Key$1.SPACE) {
              this.wrapperSpaceHandler(e);
            }
          },
        },
        childElements,
      );
    },
    render(createElement) {
      return createElement("input", {
        class: this.wrapped ? this.getElementCssClass("input") : this.componentClass,
        ref: "input",
        value: this.value,
        id: this.id,
        type: "radio",
        checked: checkIfTagShouldBeChecked(this.modelValue, this.checked, this.value),
        name: this.name,
        disabled: this.disabled,
        readonly: this.readonly,
        required: this.required,
        autofocus: !this.wrapped ? this.autofocus : undefined,
        tabindex: this.wrapped && this.tabindex !== undefined ? -1 : this.tabindex,
        onBlur: this.blurHandler,
        onFocus: this.focusHandler,
        onInput: this.inputHandler,
      });
    },
    inputHandler(e) {
      return awaiter(this, void 0, void 0, function* () {
        yield 0; // TODO: Fixed but i'm not sure if it correct
        const target = e.target;

        // Only update the local value when the element is checked
        if (target.checked) {
          this.localValue = this.value;
          this.sendInputEventToTheNotCheckedInputs();
        }
      });
    },
    /**
     * We need to trigger the input event in all the inputs that are not checked
     * so we can update the `elementChecked` local property that is used to
     * change the classes of the wrapper div according to the state
     */
    sendInputEventToTheNotCheckedInputs() {
      const notCheckedEls = document.querySelectorAll(`input[name=${this.name}]:not(:checked)`);

      notCheckedEls.forEach((el) => {
        el.dispatchEvent(new Event("input"));
      });
    },
    selectPrevRadio(e) {
      e.preventDefault();
      const currentEl = this.$refs.input;
      const els = Array.from(document.querySelectorAll(`input[name=${this.name}]`));
      const currentElementIndex = els.findIndex((radioInput) => radioInput === this.$refs.input);
      const prevElement = els[currentElementIndex - 1] || els[els.length - 1];

      if (prevElement !== currentEl && prevElement) {
        const wrapper = prevElement.parentNode ? prevElement.parentNode.parentNode : undefined;

        if (wrapper && wrapper.tabIndex >= 0) {
          wrapper.focus();
        } else {
          prevElement.focus();
        }
      }
    },
    selectNextRadio(e) {
      e.preventDefault();
      const currentEl = this.$refs.input;
      const els = Array.from(document.querySelectorAll(`input[name=${this.name}]`));
      const currentElementIndex = els.findIndex((radioInput) => radioInput === this.$refs.input);
      const nextElement = els[currentElementIndex + 1] || els[0];

      if (nextElement !== currentEl && nextElement) {
        const wrapper = nextElement.parentNode ? nextElement.parentNode.parentNode : undefined;

        if (wrapper && wrapper.tabIndex >= 0) {
          wrapper.focus();
        } else {
          nextElement.focus();
        }
      }
    },
    wrapperSpaceHandler(e) {
      e.preventDefault();
      this.localValue = this.value;
    },
    blurHandler(e) {
      this.$emit("blur", e);
    },
    focusHandler(e) {
      this.$emit("focus", e);
    },
    blur() {
      this.$refs.input.blur();
    },
    click() {
      this.$refs.input.click();
    },
    focus(options) {
      this.$refs.input.focus(options);
    },
  },
};

export default defineComponent(TRadio);
