import { defineComponent, h } from "vue";
import TextInput from "./base/TextInput";

const TTextarea = {
  name: "TTextarea",
  mixins: [TextInput],
  props: {
    rows: {
      type: String,
      default: undefined,
    },
    cols: {
      type: String,
      default: undefined,
    },
    wrap: {
      type: String,
      default: "soft",
    },
    classes: {
      type: [String, Array, Object],
      default: `block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100
        ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500
        focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed`,
    },
  },
  render() {
    const renderFun = this.render;

    return renderFun(h);
  },
  methods: {
    getProps() {
      return {
        modelValue: this.localValue,
      };
    },

    getAttributes() {
      return {
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        readonly: this.readonly,
        autocomplete: this.autocomplete,
        autofocus: this.autofocus,
        required: this.required,
        placeholder: this.placeholder,
        pattern: this.pattern,
        multiple: this.multiple,
        minlength: this.minlength,
        maxlength: this.maxlength,
        wrap: this.wrap,
        rows: this.rows,
        cols: this.cols,
      };
    },

    render(createElement) {
      return createElement("textarea", {
        class: this.componentClass,
        ref: "input",
        ...this.getProps(),
        ...this.getAttributes(),

        onInput: this.onInput,
        onBlur: this.onBlur,
      });
    },

    onInput(e) {
      const target = e.target;

      this.$emit("update:modelValue", target.value);
    },

    onBlur() {
      this.$emit("blur");
    },
  },
};

export default defineComponent(TTextarea);
