import HtmlInput from "./HtmlInput";

const TextInput = {
  mixins: [HtmlInput],

  props: {
    modelValue: {
      type: [String, Number],
      default: undefined,
    },
    autocomplete: {
      type: String,
      default: undefined,
    },
    maxlength: {
      type: [String, Number],
      default: undefined,
    },
    minlength: {
      type: [String, Number],
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: undefined,
    },
    pattern: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: undefined,
    },
  },

  emits: ["update:modelValue", "blur", "change", "focus", "keyup", "keydown"],

  data() {
    return {
      localValue: this.modelValue,
      valueWhenFocus: null,
    };
  },

  watch: {
    localValue(localValue) {
      this.$emit("update:modelValue", localValue);
    },

    modelValue: {
      handler: function (value) {
        this.localValue = value;
      },
      immediate: true,
    },
  },

  methods: {
    blurHandler(e) {
      this.$emit("blur", e);

      if (this.localValue !== this.valueWhenFocus) {
        this.$emit("change", this.localValue);
      }
    },
    focusHandler(e) {
      this.$emit("focus", e);
      this.valueWhenFocus = this.localValue;
    },
    keyupHandler(e) {
      this.$emit("keyup", e);
    },
    keydownHandler(e) {
      this.$emit("keydown", e);
    },
    blur() {
      this.$el.blur();
    },
    click() {
      this.$el.click();
    },
    focus(options) {
      this.$el.focus(options);
    },
    select() {
      this.$el.select();
    },
    setSelectionRange(start, end, direction) {
      this.$el.setSelectionRange(start, end, direction);
    },
    setRangeText(replacement) {
      this.$el.setRangeText(replacement);
    },
  },
};

export default TextInput;
