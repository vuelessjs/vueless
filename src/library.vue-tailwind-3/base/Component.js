import get from "lodash.get";

function mergeClasses(classesA, classesB) {
  let a = classesA;
  let b = classesB;

  // Convert an array of string classes to a single string
  if (
    Array.isArray(classesA) &&
    classesA.every((className) => typeof className === "string" || !!className)
  ) {
    a = classesA.filter((className) => !!className).join(" ");
  }

  // Convert an array of string classes to a single string
  if (
    Array.isArray(classesB) &&
    classesB.every((className) => typeof className === "string" || !!className)
  ) {
    b = classesB.filter((className) => !!className).join(" ");
  }

  if (typeof a === "string" && typeof b === "string") {
    return `${a} ${b}`;
  }

  if (typeof a === "string" && Array.isArray(b)) {
    return [a].concat(b);
  }

  if (typeof b === "string" && Array.isArray(a)) {
    return a.concat([b]);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }

  return [a, b];
}

const Component = {
  props: {
    classes: {
      type: [String, Array, Object],
      default: undefined,
    },
    fixedClasses: {
      type: [String, Array, Object],
      default: undefined,
    },
    variants: {
      type: Object,
      default: undefined,
    },
    variant: {
      type: [String, Object],
      default: undefined,
    },
  },

  computed: {
    componentClass() {
      return this.getElementCssClass();
    },
    activeVariant() {
      if (!this.variant) {
        return undefined;
      }

      if (typeof this.variant === "object") {
        const truthyVariant = Object.keys(this.variant).find((variant) => !!this.variant[variant]);

        return truthyVariant || undefined;
      }

      return this.variant;
    },
  },

  methods: {
    getElementCssClass(elementName, defaultClasses = "") {
      let classes;

      if (elementName) {
        if (this.activeVariant) {
          const elementVariant = get(this.variants, `${this.activeVariant}.${elementName}`);

          // If the variant exists but not for the element fallback to the default
          if (
            elementVariant === undefined &&
            get(this.variants, this.activeVariant) !== undefined
          ) {
            classes = get(this.classes, elementName, defaultClasses);
          } else {
            classes = elementVariant === undefined ? defaultClasses : elementVariant;
          }
        } else {
          classes = get(this.classes, elementName, defaultClasses);
        }

        const fixedClasses = get(this.fixedClasses, elementName);

        if (fixedClasses) {
          return mergeClasses(fixedClasses, classes);
        }

        return classes;
      }

      if (this.activeVariant) {
        classes = get(this.variants, this.activeVariant, defaultClasses);
      } else {
        classes = this.classes === undefined ? defaultClasses : this.classes;
      }

      if (this.fixedClasses) {
        return mergeClasses(this.fixedClasses, classes);
      }

      return classes;
    },
  },
};

export default Component;
